using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entity;
using API.Extensions;
using Iyzipay;
using Iyzipay.Model;
using Iyzipay.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        public OrdersController(DataContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            return await _context.Orders
                        .Include(i => i.OrderItems)
                        .OrderToDTO()
                        .Where(i => i.CustomerId == User.Identity!.Name)
                        .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO?>> GetOrder(int id)
        {
            return await _context.Orders
                        .Include(i => i.OrderItems)
                        .OrderToDTO()
                        .Where(i => i.CustomerId == User.Identity!.Name && i.Id == id)
                        .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDTO orderDTO)
        {
            var cart = await _context.Carts
                        .Include(i => i.CartItems)
                        .ThenInclude(i => i.Product)
                        .Where(i => i.CustomerId == User.Identity!.Name)
                        .FirstOrDefaultAsync();

            if (cart == null) return BadRequest(new ProblemDetails { Title = "Problem getting cart" });

            var items = new List<Entity.OrderItem>();

            foreach (var item in cart.CartItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);

                var orderItem = new Entity.OrderItem
                {
                    ProductId = product!.Id,
                    ProductName = product.Name!,
                    ProductImage = product.ImageUrl!,
                    Price = product.Price,
                    Quantity = item.Quantity
                };

                items.Add(orderItem);
                product.Stock -= item.Quantity;
            }

            var subTotal = items.Sum(i => i.Price * i.Quantity);
            var deliveryFee = 0;

            var order = new Order
            {
                OrderItems = items,
                CustomerId = User.Identity!.Name,
                FirstName = orderDTO.FirstName,
                LastName = orderDTO.LastName,
                Phone = orderDTO.Phone,
                City = orderDTO.City,
                AddresLine = orderDTO.AddresLine,
                SubTotal = subTotal,
                DeliveryFree = deliveryFee
            };

            var paymentResult = await ProcessPayment(orderDTO, cart);

            if (paymentResult.Status == "failure")
            {
                return BadRequest(new ProblemDetails { Title = paymentResult.ErrorMessage });
            }

            order.ConversationId = paymentResult.ConversationId;
            order.BasketId = paymentResult.BasketId;

            _context.Orders.Add(order);
            _context.Carts.Remove(cart);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
                return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order.Id);

            return BadRequest(new ProblemDetails { Title = "Problem getting order" });
        }

        private async Task<Payment> ProcessPayment(CreateOrderDTO model, Cart cart)
{
    Options options = new Options
    {
        ApiKey = _config["PaymentAPI:APIKey"],
        SecretKey = _config["PaymentAPI:SecretKey"],
        BaseUrl = "https://sandbox-api.iyzipay.com"
    };

    CreatePaymentRequest request = new CreatePaymentRequest
    {
        Locale = Locale.EN.ToString(), 
        ConversationId = Guid.NewGuid().ToString(),
        Price = cart.CalculateTotal().ToString("F2", System.Globalization.CultureInfo.InvariantCulture),
        PaidPrice = cart.CalculateTotal().ToString("F2", System.Globalization.CultureInfo.InvariantCulture),
        Currency = Currency.EUR.ToString(), // 🔥 EURO
        Installment = 1,
        BasketId = cart.CartId.ToString(),
        PaymentChannel = PaymentChannel.WEB.ToString(),
        PaymentGroup = PaymentGroup.PRODUCT.ToString()
    };

    PaymentCard paymentCard = new PaymentCard
    {
        CardHolderName = model.CardName,
        CardNumber = model.CardNumber,
        ExpireMonth = model.CardExpireMonth,
        ExpireYear = model.CardExpireYear,
        Cvc = model.CardCvc,
        RegisterCard = 0
    };
    request.PaymentCard = paymentCard;

    Buyer buyer = new Buyer
    {
        Id = "BY789",
        Name = model.FirstName,
        Surname = model.LastName,
        GsmNumber = model.Phone,
        Email = "email@email.com",
        IdentityNumber = "74300864791",
        LastLoginDate = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"),
        RegistrationDate = DateTime.UtcNow.AddYears(-1).ToString("yyyy-MM-dd HH:mm:ss"),
        RegistrationAddress = model.AddresLine,
        Ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "85.34.78.112",
        City = model.City,
        Country = "Switzerland",
        ZipCode = "3000"
    };
    request.Buyer = buyer;

    Address shippingAddress = new Address
    {
        ContactName = $"{model.FirstName} {model.LastName}",
        City = model.City,
        Country = "Switzerland",
        Description = model.AddresLine,
        ZipCode = "8000"
    };

    request.ShippingAddress = shippingAddress;
    request.BillingAddress = shippingAddress;

    List<BasketItem> basketItems = new List<BasketItem>();

    foreach (var item in cart.CartItems)
    {
        BasketItem basketItem = new BasketItem
        {
            Id = item.ProductId.ToString(),
            Name = item.Product.Name,
            Category1 = "Accessories",
            ItemType = BasketItemType.PHYSICAL.ToString(),
            Price = ((double)item.Product.Price * item.Quantity).ToString("F2", System.Globalization.CultureInfo.InvariantCulture)
        };
        basketItems.Add(basketItem);
    }

    request.BasketItems = basketItems;

    return await Payment.Create(request, options);
}

    }
}
