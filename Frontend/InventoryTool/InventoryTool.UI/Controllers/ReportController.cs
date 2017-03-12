using InventoryTool.Model;
using InventoryTool.UI;
using InventoryTool.UI.Proxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using InventoryTool.UI.Helper;

namespace InventoryTool.UI.Controllers
{
    public class ReportController : Controller
    {
        public ActionResult ReportIndex()
        {
            List<vw_MinimumBalance> MinimumBalanceReport = ReportProxy.Instance.GetMinBalanceReport(ConfigExtension.GetWebApiUri,
                "api/Report/GetMinBalanceReport");
            return View("ReportIndex", MinimumBalanceReport);
        }
    }
}