using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Http;
using InventoryTool.Model;
using InventoryTool.Provider;

namespace InventoryTool.API.Controllers
{
    [RoutePrefix("api/PartStock")]
    public class PartStockController : ApiController
    {
        [Route("UpdatePartStock")]
        [HttpPost]
        public IHttpActionResult UpdatePartStock(VMAddPartStock AddPartStock)
        {
            var return_Status = new ObjectParameter("return_Status", typeof(int));
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                entity.UpdatePartStock(AddPartStock.PartQuantity[0].Part_Id, AddPartStock.Store_Id, AddPartStock.Date, AddPartStock.PartQuantity[0].Quantity, 0
                                     , AddPartStock.Description, AddPartStock.LastModifiedBy
                                     , return_Status);
                return Ok(return_Status.Value);
            }
        }

        [Route("PartByFilter/{part_Type_Id:int?}/{outsource_Type_Id:int?}/{part_Code?}/{part_Name?}/{unit_Id:int?}/{category_Id:int?}/{color_Id:int?}/{material_Id:int?}/{criticality_Id:int?}")]
        [HttpGet]
        public List<GetPartByFilter_Result> GetPartByFilter(int? part_Type_Id, int? outsource_Type_Id, string part_Code, string part_Name, int? unit_Id, int? category_Id, int? color_Id, int? material_Id, int? criticality_Id)
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetPartByFilter(part_Type_Id, outsource_Type_Id, part_Code, part_Name, unit_Id, category_Id, color_Id, material_Id, criticality_Id).ToList().Select(s => new GetPartByFilter_Result
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
                    Balance_Quantity = s.Balance_Quantity
                }).ToList();
                return RetVal;
            }

        }
    }
}