using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NorthwindProductManagement.DomainEntities
{
    public class Order
    {
        [Key] public int OrderID { get; set; }
        [StringLength(5)] public string CustomerID { get; set; }
        public int EmployeeID { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime RequiredDate { get; set; }
        public DateTime ShippedDate { get; set; }
        public int ShipVia { get; set; }
        [Column(TypeName = "money")] public decimal Freight { get; set; }
        [MaxLength(40)] public string ShipName { get; set; }
        [MaxLength(60)] public string ShipAddress { get; set; }
        [MaxLength(15)] public string ShipCity { get; set; }
        [MaxLength(15)] public string ShipRegion { get; set; }
        [MaxLength(10)] public string ShipPostalCode { get; set; }
        [MaxLength(15)] public string ShipCountry { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual Shipper Shipper { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}