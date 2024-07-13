using Microsoft.AspNetCore.Mvc;

namespace Project.OnlineStore.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("/admin/category")]
    public class CategoryController : Controller
    {
        [Route("")]
        public IActionResult CategoryIndex()
        {
            return View();
        }
    }
}
