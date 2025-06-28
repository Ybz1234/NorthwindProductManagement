using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NorthwindProductManagement.DomainEntities
{
    public class CustomerCustomerDemo
    {
        [Key, Column(Order = 0)] public string CustomerID { get; set; } = string.Empty;
        [Key, Column(Order = 1)] public string CustomerTypeID { get; set; } = string.Empty;

        [ForeignKey("CustomerID")] public virtual Customer Customer { get; set; } = null!;
        [ForeignKey("CustomerTypeID")] public virtual CustomerDemographic CustomerDemographic { get; set; } = null!;
    }
}