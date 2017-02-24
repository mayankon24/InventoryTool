using InventoryTool.Model;
using InventoryTool.UI.Helper;
using InventoryTool.UI.Proxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InventoryTool.UI.Controllers
{
    public class PartStockController : Controller
    {
        // GET: PartStock
        public ActionResult PartStockIndex()
        {
            VMPartStock _VMPartStock = new VMPartStock();

            _VMPartStock.PartList = PartProxy.Instance.GetAllPart(ConfigExtension.GetWebApiUri, "api/Part/AllPart");
            _VMPartStock.PartTypeList = LookupProxy.Instance.GetAllPartType(ConfigExtension.GetWebApiUri, "api/Lookup/PartType");
            return View("PartStockIndex", _VMPartStock);           
        }
    }
}