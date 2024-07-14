using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.OnlineStore.Areas.Admin.Data;
using Project.OnlineStore.Areas.Admin.Models.Categories;

namespace Project.OnlineStore.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("/admin/category")]
    public class CategoryController : Controller
    {
        private readonly StoreDbContext _context;

        public CategoryController(StoreDbContext context)
        {
            _context = context;
        }

        [Route("")]
        public IActionResult CategoryIndex()
        {
            return View();
        }

        // Get all categories
        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetList()
        {
            try
            {
                var items = await _context.Categories.ToListAsync();
                return Ok(items);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Get category by id
        [HttpGet]
        [Route("byid")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var item = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == id);
                if (item == null) return NotFound();
                return Ok(item);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Create new category
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(Category category)
        {
            try
            {
                category.CategoryId = Guid.NewGuid();
                category.CreatedAt = DateTime.Now;
                _context.Categories.Add(category);
                await _context.SaveChangesAsync();
                return Ok(category);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Update category
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Update(Category category)
        {
            try
            {
                _context.Categories.Update(category);
                await _context.SaveChangesAsync();
                return Ok(category);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Delete category by id
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var item = await _context.Categories.FindAsync(id);
                if (item == null) return NotFound();
                _context.Categories.Remove(item);
                await _context.SaveChangesAsync();
                return StatusCode(202);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
