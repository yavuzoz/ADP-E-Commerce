using API.Entity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();

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
                    Price = 70000,
                    IsActive = true,
                    Stock = 100
                },
                new Product
                {
                    Id = 2,
                    Name = "Apple Watch Series 2",
                    Description = "Smartwatch by Apple",
                    ImageUrl = "2.jpg",
                    Price = 80000,
                    IsActive = true,
                    Stock = 100
                },
                new Product
                {
                    Id = 3,
                    Name = "Apple Watch Series 3",
                    Description = "Smartwatch by Apple",
                    ImageUrl = "3.jpg",
                    Price = 90000,
                    IsActive = false,
                    Stock = 100
                },
                new Product
                {
                    Id = 4,
                    Name = "Xiaomi Redmi Watch 1",
                    Description = "Smartwatch by Xiaomi",
                    ImageUrl = "4.jpg",
                    Price = 100000,
                    IsActive = true,
                    Stock = 100
                },
                new Product
                {
                    Id = 5,
                    Name = "Xiaomi Redmi Watch 2",
                    Description = "Smartwatch by Xiaomi",
                    ImageUrl = "5.jpg",
                    Price = 100000,
                    IsActive = true,
                    Stock = 100
                },
                new Product
                {
                    Id = 6,
                    Name = "Xiaomi Redmi Watch 3",
                    Description = "Smartwatch by Xiaomi",
                    ImageUrl = "6.jpg",
                    Price = 100000,
                    IsActive = true,
                    Stock = 100
                },
                new Product
                {
                    Id = 7,
                    Name = "Xiaomi Redmi Watch 4",
                    Description = "Smartwatch by Xiaomi",
                    ImageUrl = "7.jpg",
                    Price = 100000,
                    IsActive = true,
                    Stock = 100
                }
            });
        }
    }
}
