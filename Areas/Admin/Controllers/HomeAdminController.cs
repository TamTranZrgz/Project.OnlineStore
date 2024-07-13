using Microsoft.AspNetCore.Mvc;

namespace Project.OnlineStore.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("/admin")]
    public class HomeAdminController : Controller
    {
        [Route("")]
        public IActionResult AdminIndex()
        {
            return View();
        }
    }
}
