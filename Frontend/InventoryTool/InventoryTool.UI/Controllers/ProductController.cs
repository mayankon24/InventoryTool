using InventoryTool.Model;
using InventoryTool.UI;
using InventoryTool.UI.Proxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using InventoryTool.UI.Helper;

namespace InventoryTool.UI.Controllers
{
    [Authorize]
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult ProductIndex()
        {
            List<GetAllProduct_Result> product = ProductProxy.Instance.GetAllProduct(ConfigExtension.GetWebApiUri,
                "api/Product/AllProduct");
            return View("ProductIndex", product);
        }
        public ActionResult AddUpdateProduct(M_Product product)
        {
            UserResultModel resultdata = new UserResultModel();
            if (product != null)
            {
                product.LastModifiedBy = UserHelper.GetCurrentUserName();
            }

            try
            {
                int OperationStatus = ProductProxy.Instance.AddUpdateProduct(ConfigExtension.GetWebApiUri,
                    "api/Product/UpdateProduct", product);

                if (OperationStatus == (int)operation_status.Insert)
                {
                    resultdata.operationstatuscode = (int)operation_status.Insert;//message when inserted.
                    resultdata.messagedata = UserMessage.ResourceManager.GetString("msgInsert");

                }
                else if (OperationStatus == (int)operation_status.Update)
                {
                    resultdata.operationstatuscode = (int)operation_status.Update;//message when Update.
                    resultdata.messagedata = UserMessage.ResourceManager.GetString("msgUpdate");
                }
                else if (OperationStatus == (int)operation_status.Duplicate_Record)
                {
                    resultdata.operationstatuscode = (int)operation_status.Duplicate_Record;//message when duplicate record.
                    resultdata.messagedata = UserMessage.ResourceManager.GetString("msgDuplicate");
                }
                else if (OperationStatus == (int)operation_status.Update_Prevent)
                {
                    resultdata.operationstatuscode = (int)operation_status.Duplicate_Record;//message when duplicate record.
                    resultdata.messagedata = UserMessage.ResourceManager.GetString("msgUpdatePrevent");
                }
                else
                {
                    resultdata.operationstatuscode = (int)operation_status.Error;//message when duplicate record.
                    resultdata.messagedata = UserMessage.ResourceManager.GetString("msgError");
                }


            }
            catch (Exception ex)
            {
                resultdata.operationstatuscode = (int)operation_status.Error;//message when duplicate record.
                resultdata.messagedata = UserMessage.ResourceManager.GetString("msgError");
                resultdata.message = ex.Message;

            }
            return Json(resultdata, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeleteProduct(int Product_Id)
        {
            UserResultModel resultdata = new UserResultModel();
            M_Product product = new M_Product
            {
                Product_Id = Product_Id,
                LastModifiedBy = UserHelper.GetCurrentUserName()
            };
            int OperationStatus = ProductProxy.Instance.DeleteProduct(ConfigExtension.GetWebApiUri,
                "api/Product/DeleteProduct/" + product.Product_Id + "?LastModifiedBy=" + product.LastModifiedBy, product);
            if (OperationStatus == (int)operation_status.Delete)
            {
                resultdata.operationstatuscode = (int)operation_status.Delete;//message when Delete record.
                resultdata.messagedata = UserMessage.ResourceManager.GetString("msgDelete");
            }
            else if (OperationStatus == (int)operation_status.Delete_Prevent)
            {
                resultdata.operationstatuscode = (int)operation_status.Delete;//message when Delete record.
                resultdata.messagedata = UserMessage.ResourceManager.GetString("msgDeletePrevent");
            }
            else
            {
                resultdata.operationstatuscode = (int)operation_status.Error;//message when Error record.
                resultdata.messagedata = UserMessage.ResourceManager.GetString("msgError");
            }
            return Json(resultdata, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetProductPartial()
        {
            List<GetAllProduct_Result> product = ProductProxy.Instance.GetAllProduct(ConfigExtension.GetWebApiUri,
                "api/Product/AllProduct");
            return PartialView("_ProductList", product);
        }

        public ActionResult GetProductByProductId(int Product_Id)
        {
            List<GetAllProduct_Result> product = ProductProxy.Instance.GetAllProduct(ConfigExtension.GetWebApiUri,
                "api/Product/AllProduct");
            var result = product.FirstOrDefault(s => s.Product_Id == Product_Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}