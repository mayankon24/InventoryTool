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
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult CustomerIndex()
        {
            List<GetAllCustomer_Result> Customer = CustomerProxy.Instance.GetAllCustomer(ConfigExtension.GetWebApiUri,
                "api/Customer/AllCustomer");
            return View("CustomerIndex", Customer);
        }
        public ActionResult AddUpdateCustomer(M_Customer Customer)
        {
            UserResultModel resultdata = new UserResultModel();
            if (Customer != null)
            {
                Customer.LastModifiedBy = UserHelper.GetCurrentUserName();
            }

            try
            {
                int OperationStatus = CustomerProxy.Instance.AddUpdateCustomer(ConfigExtension.GetWebApiUri,
                    "api/Customer/AddUpdateCustomer", Customer);

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

        public ActionResult DeleteCustomer(int Customer_Id)
        {
            UserResultModel resultdata = new UserResultModel();
            M_Customer Customer = new M_Customer
            {
                Customer_Id = Customer_Id,
                LastModifiedBy = UserHelper.GetCurrentUserName()
            };
            int OperationStatus = CustomerProxy.Instance.DeleteCustomer(ConfigExtension.GetWebApiUri,
                "api/Customer/DeleteCustomer/" + Customer.Customer_Id + "?LastModifiedBy=" + Customer.LastModifiedBy, Customer);
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

        public ActionResult GetCustomerPartial()
        {
            List<GetAllCustomer_Result> Customer = CustomerProxy.Instance.GetAllCustomer(ConfigExtension.GetWebApiUri,
                "api/Customer/AllCustomer");
            return PartialView("_CustomerList", Customer);
        }

        public ActionResult GetCustomerByCustomerId(int Customer_Id)
        {
            List<GetAllCustomer_Result> Customer = CustomerProxy.Instance.GetAllCustomer(ConfigExtension.GetWebApiUri,
                "api/Customer/AllCustomer");
            var result = Customer.FirstOrDefault(s => s.Customer_Id == Customer_Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}