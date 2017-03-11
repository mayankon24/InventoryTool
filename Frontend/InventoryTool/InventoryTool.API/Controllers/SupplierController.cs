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
    [RoutePrefix("api/Supplier")]
    public class SupplierController : ApiController
    {
        [Route("AddUpdateSupplier")]
        [HttpPost]
        public int AddUpdateSupplier(M_Supplier Supplier)
        {
            var return_Status = new ObjectParameter("return_Status", typeof(int));
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                entity.UpdateSupplier(Supplier.Supplier_Id, Supplier.Supplier_Code, Supplier.Supplier_Name, Supplier.Manufacturing_Days, Supplier.Description, Supplier.LastModifiedBy, return_Status);
                return Convert.ToInt32(return_Status.Value);
            }
        }


        [Route("DeleteSupplier/{Supplier_Id:int?}/{LastModifiedBy?}")]
        [HttpPost]
        public int DeleteSupplier(int Supplier_Id, string LastModifiedBy)
        {
            var return_Status = new ObjectParameter("return_Status", typeof(int));
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                entity.DeleteSupplier(Supplier_Id, LastModifiedBy, return_Status);
                return Convert.ToInt32(return_Status.Value);
            }
        }

        [Route("AllSupplier")]
        [HttpGet]
        public List<GetAllSupplier_Result> GetAllSupplier()
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetAllSupplier().ToList().Select(s => new GetAllSupplier_Result
                {
                    Description = s.Description,
                    Manufacturing_Days = s.Manufacturing_Days,
                    Supplier_Code = s.Supplier_Code,
                    Supplier_Id = s.Supplier_Id,
                    Supplier_Name = s.Supplier_Name
                }).ToList();
                return RetVal;
            }

        }
    }
}