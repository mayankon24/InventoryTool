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
    [RoutePrefix("api/Common")]
    public class CommonController : ApiController
    {

        [Route("GetUserPermission/{User_Name?}")]
        [HttpGet]
        public List<GetUserPermission_Result> GetUserPermission(string User_Name)
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetUserPermission(User_Name).ToList().Select(s => new GetUserPermission_Result
                {
                    Window_Id = s.Window_Id,
                    Role_Id = s.Role_Id,
                    CanView = s.CanView,
                    CanAdd = s.CanAdd,
                    CanUpdate = s.CanUpdate,
                    CanDelete = s.CanDelete,
                    CanPrint = s.CanPrint,
                    CanDownload = s.CanDownload,
                    CanUpload = s.CanUpload                   

                }).ToList();
                return RetVal;
            }

        }

        [Route("GetImage/{Image_Id?}")]
        [HttpGet]
        public List<GetImage_Result> GetImage(int Image_Id)
        {
            using (InventoryToolDBEntities entity = new InventoryToolDBEntities())
            {
                var RetVal = entity.GetImage(Image_Id).ToList().Select(s => new GetImage_Result
                {
                   Image_Data = s.Image_Data,
                   Image_Id = s.Image_Id

                }).ToList();
                return RetVal;
            }

        }

    }
}