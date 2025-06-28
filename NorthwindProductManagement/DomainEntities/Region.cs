using System.ComponentModel.DataAnnotations;

namespace NorthwindProductManagement.DomainEntities
{
    public class Region
    {
        [Key] public int RegionID { get; set; }
        [Required, MaxLength(50)] public string RegionDescription { get; set; } = string.Empty;
        public virtual ICollection<Territory> Territories { get; set; } = new List<Territory>();
    }
}