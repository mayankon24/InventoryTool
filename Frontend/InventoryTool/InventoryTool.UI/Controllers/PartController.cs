﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using InventoryTool.Model;
using InventoryTool.UI.Helper;
using InventoryTool.UI.Proxy;
using InventoryTool.UI;
using System.IO;

namespace InventoryTool.UI.Controllers
{
    [Authorize]
    public class PartController : Controller
    {
        //[MustHavePermission(Window.Part, PermissionOfRoles.CanView)]
        public ActionResult PartIndex()
        {
            VMPart _VMPart = new VMPart();

            _VMPart.PartList = PartProxy.Instance.GetAllPart(ConfigExtension.GetWebApiUri, "api/Part/AllPart");
            _VMPart.MaterialList = LookupProxy.Instance.GetAllMaterial(ConfigExtension.GetWebApiUri, "api/Lookup/Material");
            _VMPart.CriticalityList = LookupProxy.Instance.GetAllCriticality(ConfigExtension.GetWebApiUri, "api/Lookup/Criticality");
            _VMPart.OutsourceTypeList = LookupProxy.Instance.GetAllOutsourceType(ConfigExtension.GetWebApiUri, "api/Lookup/OutsourceType");
            _VMPart.PartTypeList = LookupProxy.Instance.GetAllPartType(ConfigExtension.GetWebApiUri, "api/Lookup/PartType");
            _VMPart.ColorList = LookupProxy.Instance.GetAllColor(ConfigExtension.GetWebApiUri, "api/Lookup/Color");
            _VMPart.CategoryList = LookupProxy.Instance.GetAllCategory(ConfigExtension.GetWebApiUri, "api/Lookup/Category");
            _VMPart.UnitList = LookupProxy.Instance.GetAllUnit(ConfigExtension.GetWebApiUri, "api/Lookup/Unit");
            return View("PartIndex", _VMPart);
        }
        //[MustHavePermission(Window.Part, PermissionOfRoles.CanAdd)]
        public ActionResult AddUpdatePart(M_Part Part)
        {
            UserResultModel resultdata = new UserResultModel();
            if (Part != null)
            {
                Part.LastModifiedBy = UserHelper.GetCurrentUserName();
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
                resultdata.message = ex.Message;

            }
            return Json(resultdata, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeletePart(int Part_Id)
        {
            UserResultModel resultdata = new UserResultModel();
            M_Part Part = new M_Part
            {
                Part_Id = Part_Id,
                LastModifiedBy = UserHelper.GetCurrentUserName()
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
            List<GetAllPart_Result> Part = PartProxy.Instance.GetAllPart(ConfigExtension.GetWebApiUri, "api/Part/AllPart");
            return PartialView("_PartList", Part);
        }

        public ActionResult GetPartImagePartial(int Part_Id, int Image_Id)
        {
            List<GetImage_Result> RetVal = CommonProxy.Instance.GetImage(ConfigExtension.GetWebApiUri,
                "api/Common/GetImage" + "?Image_Id=" + Image_Id);

            VMImage PartImage = new VMImage();
            PartImage.Parent_Id = Part_Id;
            if (RetVal != null && RetVal.Count() > 0)
            {
                PartImage.Image.Image_Data = RetVal[0].Image_Data;
                PartImage.Image.Image_Id = RetVal[0].Image_Id;
            }
            

            return PartialView("_PartImage", PartImage);
        }

        [HttpPost]
        public ActionResult UploadImage(int Part_Id)
        {
            UserResultModel resultdata = new UserResultModel();
            if (Request.Files[0].ContentLength > 1 * 1024 * 1024)
            {
                resultdata.operationstatuscode = (int)operation_status.Error;//Size is greter then limit.
                resultdata.messagedata = "Please select a PNG image smaller than 1MB";
                return Json(resultdata, JsonRequestBehavior.AllowGet);
            }          

            VMImage PartImage = new VMImage();
            PartImage.Parent_Id = Part_Id;
            PartImage.Image.LastModifiedBy = UserHelper.GetCurrentUserName();
           
            using (var binaryReader = new BinaryReader(Request.Files[0].InputStream))
            {
                PartImage.Image.Image_Data = binaryReader.ReadBytes(Request.Files["ImageData"].ContentLength);
            }
                        
            try
            {
                int OperationStatus = PartProxy.Instance.UpdatePartImage(ConfigExtension.GetWebApiUri,
                    "api/Part/UpdatePartImage", PartImage);

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
        public ActionResult GetPartByPartId(int Part_Id)
        {
            List<GetAllPart_Result> Part = PartProxy.Instance.GetAllPart(ConfigExtension.GetWebApiUri, "api/Part/AllPart");           

            var result = Part.FirstOrDefault(s => s.Part_Id == Part_Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetPartByPartType(int Part_Type_Id)
        {
            List<GetAllPart_Result> Part = PartProxy.Instance.GetAllPart(ConfigExtension.GetWebApiUri, "api/Part/AllPart");

            var result = Part.FirstOrDefault(s => s.Part_Type_Id == Part_Type_Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }

}