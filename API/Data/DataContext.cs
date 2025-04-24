using API.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, string>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Cart> Carts => Set<Cart>();
        public DbSet<Order> Orders => Set<Order>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(new List<Product>
            {
                new Product
                {
                    Id = 1,
                    Name = "Apple Watch Series 1",
                    Description = "Smartwatch by Apple",
                    ImageUrl = "1.jpg",
                    Price = 299.00m,
                    IsActive = true,
                    Stock = 100
                },
                new Product
                {
                    Id = 2,
                    Name = "Apple Watch Series 2",
                    Description = "Smartwatch by Apple",
                    ImageUrl = "1.jpg",
                    Price = 349.00m,
                    IsActive = true,
                    Stock = 100
                },
                new Product
                {
                    Id = 3,
                    Name = "Apple Watch Series 3",
                    Description = "Smartwatch by Apple",
                    ImageUrl = "1.jpg",
                    Price = 399.00m,
                    IsActive = false,
                    Stock = 100
                },
                new Product
                {
                    Id = 4,
                    Name = "Xiaomi Redmi Watch 1",
                    Description = "Smartwatch by Xiaomi",
                    ImageUrl = "1.jpg",
                    Price = 149.00m,
                    IsActive = true,
                    Stock = 100
                },
                new Product
                {
                    Id = 5,
                    Name = "Xiaomi Redmi Watch 2",
                    Description = "Smartwatch by Xiaomi",
                    ImageUrl = "1.jpg",
                    Price = 179.00m,
                    IsActive = true,
                    Stock = 100
                },
                new Product
                {
                    Id = 6,
                    Name = "Xiaomi Redmi Watch 3",
                    Description = "Smartwatch by Xiaomi",
                    ImageUrl = "1.jpg",
                    Price = 199.00m,
                    IsActive = true,
                    Stock = 100
                },
                new Product
                {
                    Id = 7,
                    Name = "Xiaomi Redmi Watch 4",
                    Description = "Smartwatch by Xiaomi",
                    ImageUrl = "1.jpg",
                    Price = 229.00m,
                    IsActive = true,
                    Stock = 100
                }
            });
        }
    }
}
