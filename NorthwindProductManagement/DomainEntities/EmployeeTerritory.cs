using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NorthwindProductManagement.DomainEntities
{
    public class EmployeeTerritory
    {
        [Key, Column(Order = 0)] public int EmployeeID { get; set; }
        [Key, Column(Order = 1)] public string TerritoryID { get; set; } = string.Empty;

        [ForeignKey("EmployeeID")] public virtual Employee Employee { get; set; } = null!;
        [ForeignKey("TerritoryID")] public virtual Territory Territory { get; set; } = null!;
    }
}