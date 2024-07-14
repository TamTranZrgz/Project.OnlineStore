using Microsoft.EntityFrameworkCore;
using Project.OnlineStore.Areas.Admin.Models.Categories;
using Project.OnlineStore.Areas.Admin.Models.Products;

namespace Project.OnlineStore.Areas.Admin.Data
{
    public class StoreDbContext: DbContext
    {
        public StoreDbContext(DbContextOptions<StoreDbContext> options)
        : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
