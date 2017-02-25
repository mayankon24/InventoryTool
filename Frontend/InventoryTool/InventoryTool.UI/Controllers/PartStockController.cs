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
            _VMPartStock.MaterialList = LookupProxy.Instance.GetAllMaterial(ConfigExtension.GetWebApiUri, "api/Lookup/Material");
            _VMPartStock.CriticalityList = LookupProxy.Instance.GetAllCriticality(ConfigExtension.GetWebApiUri, "api/Lookup/Criticality");
            _VMPartStock.OutsourceTypeList = LookupProxy.Instance.GetAllOutsourceType(ConfigExtension.GetWebApiUri, "api/Lookup/OutsourceType");
            _VMPartStock.PartTypeList = LookupProxy.Instance.GetAllPartType(ConfigExtension.GetWebApiUri, "api/Lookup/PartType");
            _VMPartStock.ColorList = LookupProxy.Instance.GetAllColor(ConfigExtension.GetWebApiUri, "api/Lookup/Color");
            _VMPartStock.CategoryList = LookupProxy.Instance.GetAllCategory(ConfigExtension.GetWebApiUri, "api/Lookup/Category");
            _VMPartStock.UnitList = LookupProxy.Instance.GetAllUnit(ConfigExtension.GetWebApiUri, "api/Lookup/Unit");
           
            return View("PartStockIndex", _VMPartStock);           
        }

        public ActionResult GetPartByFilter(int? Part_Type_Id
                                             , int? Outsource_Type_Id, string Part_Code, string Part_Name, int? Unit_Id, int? Category_Id,
                                             int? Color_Id, int? Material_Id, int? Criticality_Id
                                             )
        {
                List<GetPartByFilter_Result> partFilterList = PartStockProxy.Instance.GetPartByFilter(ConfigExtension.GetWebApiUri,
                "api/PartStock/PartByFilter" + "?part_Type_Id=" + Part_Type_Id
                + "&Outsource_Type_Id=" + Outsource_Type_Id +
                "&Part_Name=" + Part_Name +
                "&Unit_Id=" + Unit_Id +
                "&Category_Id=" + Category_Id +
                "&Color_Id=" + Color_Id +
                "&Material_Id=" + Material_Id +
                "&Criticality_Id=" + Criticality_Id
                );
            return PartialView("_FilterList", partFilterList);            
        }

    }
}