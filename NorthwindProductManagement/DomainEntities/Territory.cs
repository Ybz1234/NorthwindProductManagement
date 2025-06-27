using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NorthwindProductManagement.DomainEntities
{
    public class Territory
    {
        [Key] public string TerritoryID { get; set; } = string.Empty;
        [Required, MaxLength(50)] public string TerritoryDescription { get; set; } = string.Empty;
        public int RegionID { get; set; }

        [ForeignKey("RegionID")] public virtual Region Region { get; set; } = null!;
        public virtual ICollection<EmployeeTerritory> EmployeeTerritories { get; set; } = new List<EmployeeTerritory>();
    }
}