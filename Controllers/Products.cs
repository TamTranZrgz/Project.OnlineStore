using Microsoft.AspNetCore.Mvc;

namespace Project.OnlineStore.Controllers
{
    [Route("/shop")]
    public class Products : Controller
    {
        [Route("")]
        public IActionResult ProductsIndex()
        {
            return View();
        }
    }
}
