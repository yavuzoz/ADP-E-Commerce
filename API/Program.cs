using API.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using API.Middlewares;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            var config = builder.Configuration; // Fix: Assign builder.Configuration to 'config'

            builder.Services.AddDbContext<DataContext>(options =>
            {
                var connectionString = config.GetConnectionString("DefaultConnection");
                var serverVersion = ServerVersion.AutoDetect(connectionString); // MariaDB or MySQL
                options.UseMySql(connectionString, serverVersion);
            });

            builder.Services.AddCors();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseMiddleware<ExceptionHandling>();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors(opt =>
            {
                opt.AllowAnyHeader();
                opt.AllowAnyMethod();
                opt.WithOrigins("http://localhost:3000");
            });

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
