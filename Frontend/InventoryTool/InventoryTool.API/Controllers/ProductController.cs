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
    [RoutePrefix("api/Product")]
    public class ProductController : ApiController
    {
        [Route("UpdateProduct")]
        [HttpPost]
        public IHttpActionResult UpdateProduct(M_Product product)
        {
            var return_Status = new ObjectParameter("return_Status", typeof(int));
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                entity.UpdateProduct(product.Product_Id, product.Product_Code, product.Product_Name, product.Manufacturing_Days, product.Description, product.LastModifiedBy, return_Status);
                return Ok(return_Status.Value);


            }
        }


        [Route("DeleteProduct/{Product_Id:int?}/{LastModifiedBy?}")]
        [HttpPost]
        public int DeleteProduct(int Product_Id, string LastModifiedBy)
        {
            var return_Status = new ObjectParameter("return_Status", typeof(int));
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                entity.DeleteProduct(Product_Id, LastModifiedBy, return_Status);
                return Convert.ToInt32(return_Status.Value);
            }
        }

        [Route("AllProduct")]
        [HttpGet]
        public List<GetAllProduct_Result> GetAllProduct()
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetAllProduct().ToList().Select(s => new GetAllProduct_Result
                {
                    Description = s.Description,
                    Manufacturing_Days = s.Manufacturing_Days,
                    Product_Code = s.Product_Code,
                    Product_Id = s.Product_Id,
                    Product_Name = s.Product_Name
                }).ToList();
                return RetVal;
            }

        }
    }
}