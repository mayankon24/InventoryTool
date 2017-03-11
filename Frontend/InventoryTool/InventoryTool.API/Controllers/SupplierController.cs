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
                entity.UpdateSupplier(Supplier.Supplier_Id, Supplier.Supplier_Code, Supplier.Supplier_Name, Supplier.Contact_No,
                    Supplier.Email, Supplier.Address1, Supplier.Address2, Supplier.City, Supplier.State, Supplier.PinCode,
                    Supplier.TinNo, Supplier.VatNo, Supplier.Note, Supplier.LastModifiedBy, return_Status);
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
                    Supplier_Code = s.Supplier_Code,
                    Supplier_Id = s.Supplier_Id,
                    Supplier_Name = s.Supplier_Name,
                    Address1 = s.Address1,
                    Address2 = s.Address2,
                    City = s.City,
                    Contact_No = s.Contact_No,
                    Email = s.Email,
                    Note = s.Note,
                    PinCode = s.PinCode,
                    State = s.State,
                    TinNo = s.TinNo,
                    VatNo = s.VatNo
                }).ToList();
                return RetVal;
            }

        }
    }
}