using API.Entity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Product> Products => Set<Product>();

    }
}
