namespace NorthwindProductManagement.Queries.DTOs
{
    public class ProductDetailsDto
    {
        public string ProductName { get; set; }
        public string Category { get; set; }
        public string Supplier { get; set; }
        public decimal UnitPrice { get; set; }
        public short Units { get; set; }
    }
}