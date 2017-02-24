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
        public IHttpActionResult UpdatePartStock(TX_Part_Stock PartStock)
        {
            var return_Status = new ObjectParameter("return_Status", typeof(int));
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                entity.UpdatePartStock(PartStock.Part_Id, PartStock.Store_Id, PartStock.Date, PartStock.In_Quantity, PartStock.Out_Quantity
                                     , PartStock.Description, PartStock.LastModifiedBy
                                     , return_Status);
                return Ok(return_Status.Value);
            }
        }
    }
}