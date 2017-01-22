using System;
using System.Data.Entity.Core.Objects;
using System.Web.Http;
using InventoryTool.Model;
using System.Data.Objects;

namespace InventoryTool.API.Controllers
{
    public class ProductController : ApiController
    {
        [Route("UpdateProduct")]
        [HttpPost]
        public IHttpActionResult UpdateProduct(M_Product product)
        {
            var return_Status = new System.Data.Objects.ObjectParameter("return_Status", typeof(int));
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
            var return_Status = new System.Data.Objects.ObjectParameter("return_Status", typeof(int));
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                entity.DeleteProduct(Product_Id, LastModifiedBy, return_Status);
                return Convert.ToInt32(return_Status.Value);
            }
        }
    }
}