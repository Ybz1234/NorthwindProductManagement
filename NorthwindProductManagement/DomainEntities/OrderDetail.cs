using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NorthwindProductManagement.DomainEntities
{
    public class OrderDetail
    {
        [Key, Column(Order = 0)] public int OrderID { get; set; }
        [Key, Column(Order = 1)] public int ProductID { get; set; }
        [Column(TypeName = "money")] public decimal UnitPrice { get; set; }
        public short Quantity { get; set; }
        public float Discount { get; set; }
        public virtual Order Order { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;
    }
}