using Microsoft.AspNetCore.Mvc;

namespace Project.OnlineStore.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("/admin/product")]
    public class ProductController : Controller
    {
        [Route("")]
        public IActionResult ProductIndex()
        {
            return View();
        }
    }
}
