using System.ComponentModel.DataAnnotations;

namespace NorthwindProductManagement.DomainEntities
{
    public class Shipper
    {
        [Key] public int ShipperID { get; set; }
        [Required, MaxLength(40)] public string CompanyName { get; set; } = string.Empty;
        [MaxLength(24)] public string Phone { get; set; }
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}