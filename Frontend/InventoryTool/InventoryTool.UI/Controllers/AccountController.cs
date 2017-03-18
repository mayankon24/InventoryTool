using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InventoryTool.UI.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult Error()
        {
            return View("Error");
        }

        public ActionResult UnAuthorize()
        {
            return View("UnAuthorize");
        }
    }
}