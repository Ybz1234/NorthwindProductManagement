using System.ComponentModel.DataAnnotations;

namespace NorthwindProductManagement.DomainEntities
{
    public class CustomerDemographic
    {
        [Key] public string CustomerTypeID { get; set; } = string.Empty;
        public string CustomerDesc { get; set; }
        public virtual ICollection<CustomerCustomerDemo> CustomerCustomerDemos { get; set; } = new List<CustomerCustomerDemo>();
    }
}