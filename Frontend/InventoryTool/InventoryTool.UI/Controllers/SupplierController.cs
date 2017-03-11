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
    public class SupplierController : Controller
    {
        // GET: Supplier
        public ActionResult SupplierIndex()
        {
            List<GetAllSupplier_Result> Supplier = SupplierProxy.Instance.GetAllSupplier(ConfigExtension.GetWebApiUri,
                "api/Supplier/AllSupplier");
            return View("SupplierIndex", Supplier);
        }
        public ActionResult AddUpdateSupplier(M_Supplier Supplier)
        {
            UserResultModel resultdata = new UserResultModel();
            if (Supplier != null)
            {
                Supplier.LastModifiedBy = UserExtended.GetCurrentUserAlias();
            }

            try
            {
                int OperationStatus = SupplierProxy.Instance.AddUpdateSupplier(ConfigExtension.GetWebApiUri,
                    "api/Supplier/AddUpdateSupplier", Supplier);

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

        public ActionResult DeleteSupplier(int Supplier_Id)
        {
            UserResultModel resultdata = new UserResultModel();
            M_Supplier Supplier = new M_Supplier
            {
                Supplier_Id = Supplier_Id,
                LastModifiedBy = UserExtended.GetCurrentUserAlias()
            };
            int OperationStatus = SupplierProxy.Instance.DeleteSupplier(ConfigExtension.GetWebApiUri,
                "api/Supplier/DeleteSupplier/" + Supplier.Supplier_Id + "?LastModifiedBy=" + Supplier.LastModifiedBy, Supplier);
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

        public ActionResult GetSupplierPartial()
        {
            List<GetAllSupplier_Result> Supplier = SupplierProxy.Instance.GetAllSupplier(ConfigExtension.GetWebApiUri,
                "api/Supplier/AllSupplier");
            return PartialView("_SupplierList", Supplier);
        }

        public ActionResult GetSupplierBySupplierId(int Supplier_Id)
        {
            List<GetAllSupplier_Result> Supplier = SupplierProxy.Instance.GetAllSupplier(ConfigExtension.GetWebApiUri,
                "api/Supplier/AllSupplier");
            var result = Supplier.FirstOrDefault(s => s.Supplier_Id == Supplier_Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}