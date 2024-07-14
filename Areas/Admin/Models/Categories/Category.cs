using System.ComponentModel.DataAnnotations;

namespace Project.OnlineStore.Areas.Admin.Models.Categories
{
    public class Category
    {
        [Key]
        public Guid CategoryId { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
