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
    [RoutePrefix("api/Lookup")]
    public class LookupController : ApiController
    {

        [Route("Category")]
        [HttpGet]
        public List<GetAllCategory_Result> GetAllCategory()
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetAllCategory().ToList().Select(s => new GetAllCategory_Result
                {
                    Category_Id = s.Category_Id,
                    Category_Name = s.Category_Name
                }).ToList();
                return RetVal;
            }
        }


        [Route("Color")]
        [HttpGet]
        public List<GetAllColor_Result> GetAllColor()
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetAllColor().ToList().Select(s => new GetAllColor_Result
                {
                    Color_Id = s.Color_Id,
                    Color_Name = s.Color_Name
                }).ToList();
                return RetVal;
            }
        }


        [Route("Material")]
        [HttpGet]
        public List<GetAllMaterial_Result> GetAllMaterial()
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetAllMaterial().ToList().Select(s => new GetAllMaterial_Result
                {
                    Material_Id = s.Material_Id,
                    Material_Name = s.Material_Name
                }).ToList();
                return RetVal;
            }
        }


        [Route("OutsourceType")]
        [HttpGet]
        public List<GetAllOutsourceType_Result> GetAllOutsourceType()
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetAllOutsourceType().ToList().Select(s => new GetAllOutsourceType_Result
                {
                   Outsource_Type = s.Outsource_Type,
                   Outsource_Type_Id = s.Outsource_Type_Id
                }).ToList();
                return RetVal;
            }
        }


        [Route("PartType")]
        [HttpGet]
        public List<GetAllPartType_Result> GetAllPartType()
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetAllPartType().ToList().Select(s => new GetAllPartType_Result
                {
                    Part_Type = s.Part_Type,
                    Part_Type_Id = s.Part_Type_Id
                }).ToList();
                return RetVal;
            }
        }

        [Route("Unit")]
        [HttpGet]
        public List<GetAllUnit_Result> GetAllUnit()
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetAllUnit().ToList().Select(s => new GetAllUnit_Result
                {
                    Unit_Id = s.Unit_Id,
                    Unit_Name = s.Unit_Name                    
                }).ToList();
                return RetVal;
            }
        }
    }
}