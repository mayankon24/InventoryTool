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
    [RoutePrefix("api/Part")]
    public class PartController : ApiController
    {
        [Route("UpdatePart")]
        [HttpPost]
        public IHttpActionResult UpdatePart(M_Part Part)
        {
            var return_Status = new ObjectParameter("return_Status", typeof(int));
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                entity.UpdatePart(Part.Part_Id, Part.Part_Type_Id, Part.Outsource_Type_Id, Part.Part_Code, Part.Part_Name, Part.Unit_Id,
                    Part.Category_Id, Part.Color_Id, Part.Material_Id,Part.Criticality_Id, Part.Min_Quantity, Part.LastModifiedBy, return_Status);
                return Ok(return_Status.Value);
            }
        }
        
        [Route("DeletePart/{Part_Id:int?}/{LastModifiedBy?}")]
        [HttpPost]
        public int DeletePart(int Part_Id, string LastModifiedBy)
        {
            var return_Status = new ObjectParameter("return_Status", typeof(int));
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                entity.DeletePart(Part_Id, LastModifiedBy, return_Status);
                return Convert.ToInt32(return_Status.Value);
            }
        }

        [Route("AllPart")]
        [HttpGet]
        public List<GetAllPart_Result> GetAllPart()
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetAllPart().ToList().Select(s => new GetAllPart_Result
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
                    Min_Quantity = s.Min_Quantity

                }).ToList();
                return RetVal;
            }

        }
    }
}