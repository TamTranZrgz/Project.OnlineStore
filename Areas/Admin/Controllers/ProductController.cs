using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging.Signing;
using Project.OnlineStore.Areas.Admin.Data;
using Project.OnlineStore.Areas.Admin.Models.Categories;
using Project.OnlineStore.Areas.Admin.Models.Products;
using Project.OnlineStore.Services;

namespace Project.OnlineStore.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("/admin/product")]
    public class ProductController : Controller
    {
        private readonly StoreDbContext _context;

        public ProductController(StoreDbContext context)
        {
            _context = context;
        }

        [Route("")]
        public IActionResult ProductIndex()
        {
            return View();
        }

        // Get all product
        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetList()
        {
            try
            {
                var items = await _context.Products.Include(x => x.Categories).OrderBy(x => x.CreatedAt).ToListAsync();
                return Ok(items);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Get product by id
        [HttpGet]
        [Route("byid")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var item = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == id);
                if (item == null) return NotFound();
                return Ok(item);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Create new product
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(Product product, IFormFile file, Guid categoryId)
        {
            try
            {
                if (file != null)
                {
                    product.Image = FilesManagement.UploadImage(file);
                }
                product.ProductId = Guid.NewGuid();
                product.CreatedAt = DateTime.Now;
                product.Categories = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == categoryId);
                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();
                return Ok(product);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Update product
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Update(Product product, IFormFile file, Guid categoryId)
        {
            try
            {
                var item = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == product.ProductId);
                if (item == null) return NotFound();
                if (file != null)
                {
                    item.Image = FilesManagement.UploadImage(file);
                }
                item.Categories = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == categoryId);
                item.Name = product.Name;
                item.Price = product.Price;
                item.Description = product.Description;
                item.IsAvailable = product.IsAvailable;

                _context.Products.Update(item);
                await _context.SaveChangesAsync();
                return Ok(item);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // Delete product by id
        //[HttpDelete]
        //[Route("delete")]
        //public async Task<IActionResult> Delete(Guid id)
        //{
        //    try
        //    {
        //        foreach (var id in ids)
        //        {
        //            var item = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == id);
        //            if (item == null) return NotFound();
        //            if (!string.IsNullOrEmpty(item.Image))
        //            {
        //                FilesManagement.RemoveImage(item.Image);
        //            }
        //            _context.Products.Remove(item);
        //        }
        //        await _context.SaveChangesAsync();
        //        return Ok();
        //    }
        //    catch (Exception e)
        //    {
        //        return StatusCode(500, e.Message);
        //    }
        //}
    }
}
