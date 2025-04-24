using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class NewData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Price",
                value: 299.00m);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "1.jpg", 349.00m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "1.jpg", 399.00m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "1.jpg", 149.00m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "1.jpg", 179.00m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "1.jpg", 199.00m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "1.jpg", 229.00m });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Price",
                value: 70000m);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "2.jpg", 80000m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "3.jpg", 90000m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "4.jpg", 100000m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "5.jpg", 100000m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "6.jpg", 100000m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "7.jpg", 100000m });
        }
    }
}
