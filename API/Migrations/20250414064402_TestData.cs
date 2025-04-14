using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class TestData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "IsActive", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 1, "Smartwatch by Apple", "1.jpg", true, "Apple Watch Series 1", 70000m, 100 },
                    { 2, "Smartwatch by Apple", "2.jpg", true, "Apple Watch Series 2", 80000m, 100 },
                    { 3, "Smartwatch by Apple", "3.jpg", false, "Apple Watch Series 3", 90000m, 100 },
                    { 4, "Smartwatch by Xiaomi", "4.jpg", true, "Xiaomi Redmi Watch 1", 100000m, 100 },
                    { 5, "Smartwatch by Xiaomi", "5.jpg", true, "Xiaomi Redmi Watch 2", 100000m, 100 },
                    { 6, "Smartwatch by Xiaomi", "6.jpg", true, "Xiaomi Redmi Watch 3", 100000m, 100 },
                    { 7, "Smartwatch by Xiaomi", "7.jpg", true, "Xiaomi Redmi Watch 4", 100000m, 100 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);
        }
    }
}
