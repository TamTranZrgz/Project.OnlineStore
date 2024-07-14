using Project.OnlineStore.Areas.Admin.Models.Categories;
using System.ComponentModel.DataAnnotations;

namespace Project.OnlineStore.Areas.Admin.Models.Products
{
    public class Product
    {
        [Key]
        public Guid ProductId { get; set; }
        public string Name { get; set; } = null!;
        public string? AliasName { get; set; }
        public string? Description { get; set; }
        public int Price { get; set; }
        public string? Image { get; set; }
        public DateTime? ProductionDate { get; set; }
        public int? ViewNumber { get; set; }
        public int? Inventory { get; set; }
        public bool? IsAvailable { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid CategoryId { get; set; }
        public Category? Categories { get; set; }
    }
}
