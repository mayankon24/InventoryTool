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
        public ActionResult MinBalanceReport()
        {
            List<vw_MinimumBalance> MinimumBalanceReport = ReportProxy.Instance.GetMinBalanceReport(ConfigExtension.GetWebApiUri,
                "api/Report/GetMinBalanceReport");
            return View("_MinBalanceReport", MinimumBalanceReport);
        }

        public ActionResult StockPartDetailReport(int Part_Id = 2009)
        {
            List<GetStockPartDetailReport_Result> StockPartDetailReport = ReportProxy.Instance.GetStockPartDetailReport(ConfigExtension.GetWebApiUri,
                "api/Report/GetStockPartDetailReport?Part_Id=" + Part_Id.ToString());
            return View("_StockPartDetailReport", StockPartDetailReport);
        }
        
    }
}