using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web.Http;
using InventoryTool.Model;
using InventoryTool.Provider;

namespace InventoryTool.API.Controllers
{

    /// <summary>
    /// This controller is handle all the operation related to Landing page.
    /// </summary>
    [RoutePrefix("api/Report")]
    public class ReportController : ApiController
    {
        [Route("GetMinBalanceReport")]
        [HttpGet]
        public List<vw_MinimumBalance> GetMinBalanceReport()
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {              
                var RetVal = entity.vw_MinimumBalance.ToList().Select(s => new vw_MinimumBalance
                {
                    Category_Id = s.Category_Id,
                    Part_Type_Id = s.Part_Type_Id,
                    Part_Name = s.Part_Name,
                    Part_Id = s.Part_Id,
                    Part_Code = s.Part_Code,
                    Outsource_Type_Id = s.Outsource_Type_Id,
                    Color_Id = s.Color_Id,
                    Material_Id = s.Material_Id,
                    Category_Name = s.Category_Name,
                    Color_Name = s.Color_Name,
                    Material_Name = s.Material_Name,
                    Unit_Id = s.Unit_Id,
                    Outsource_Type = s.Outsource_Type,
                    Part_Type = s.Part_Type,
                    Unit_Name = s.Unit_Name,
                    Criticality_Id = s.Criticality_Id,
                    Criticality_Name = s.Criticality_Name,
                    Balance_Quantity = s.Balance_Quantity,
                    Min_Quantity = s.Min_Quantity

                }).ToList();
                return RetVal;
            }
        }

        
        [Route("GetStockPartDetailReport/{Part_Id:int?}")]
        [HttpGet]
        public List<GetStockPartDetailReport_Result> GetStockPartDetailReport(int? Part_Id)
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
               var RetVal = entity.GetStockPartDetailReport(Part_Id).ToList().Select(s => new GetStockPartDetailReport_Result
                {
                    Part_Name = s.Part_Name,
                    Part_Id = s.Part_Id,
                    Action_Guid = s.Action_Guid,
                    Date = s.Date,
                    Description = s.Description,
                    In_Quantity = s.In_Quantity,
                    Out_Quantity = s.Out_Quantity,
                    Part_Stock_Id = s.Part_Stock_Id,
                    StoreTransferType_Id = s.StoreTransferType_Id,
                    StoreTransferType_Name = s.StoreTransferType_Name,
                    Store_Id = s.Store_Id,
                    Store_Name = s.Store_Name
                }).ToList();
                return RetVal;
            }
        }
    }
}