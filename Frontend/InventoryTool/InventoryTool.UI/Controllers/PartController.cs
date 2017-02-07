using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using InventoryTool.Model;
using InventoryTool.UI.Helper;
using InventoryTool.UI.Proxy;
using InventoryTool.UI;

namespace InventoryTool.UI.Controllers
{
    public class PartController : Controller
    {
        
        public ActionResult PartIndex()
        {
            List<GetAllPart_Result> part = PartProxy.Instance.GetAllPart(ConfigExtension.GetWebApiUri,
                "api/Part/AllPart");
            return View("PartIndex", part);
        }
        public ActionResult AddUpdatePart(M_Part Part)
        {
            UserResultModel resultdata = new UserResultModel();
            if (Part != null)
            {
                Part.LastModifiedBy = UserExtended.GetCurrentUserAlias();
            }

            try
            {
                int OperationStatus = PartProxy.Instance.AddUpdatePart(ConfigExtension.GetWebApiUri,
                    "api/Part/UpdatePart", Part);

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
                resultdata.message = string.Format(ex.Message);

            }
            return Json(resultdata, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeletePart(int Part_Id)
        {
            UserResultModel resultdata = new UserResultModel();
            M_Part Part = new M_Part
            {
                Part_Id = Part_Id,
                LastModifiedBy = UserExtended.GetCurrentUserAlias()
            };
            int OperationStatus = PartProxy.Instance.DeletePart(ConfigExtension.GetWebApiUri,
                "api/Part/DeletePart/" + Part.Part_Id + "?LastModifiedBy=" + Part.LastModifiedBy, Part);
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

        public ActionResult GetPartPartial()
        {
            List<GetAllPart_Result> Part = PartProxy.Instance.GetAllPart(ConfigExtension.GetWebApiUri,
                "api/Part/AllClass");
            return PartialView("_PartList", Part);
        }
    }
}