using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InventoryTool.Model;
using InventoryTool.UI.Proxy;
namespace InventoryTool.UI.Helper
{
    public class RoleHelper
    {
        /// <summary>
        /// This function Get the UserRolePermission from database and Set the in Session["UserPermission"]
        /// </summary>
        /// <param name="User_Name"></param>
        /// <param name="forceRefresh"></param>
        /// <returns></returns>
        public static List<GetUserPermission_Result> GetUserPermission(string User_Name, bool forceRefresh = false)
        {
            if (HttpContext.Current.Session["UserPermission"] == null || forceRefresh)
            {
                List<GetUserPermission_Result> RetVal = CommonProxy.Instance.GetUserPermission(ConfigExtension.GetWebApiUri,
                "api/Common/GetUserPermission" + "?User_Name=" + User_Name);

                HttpContext.Current.Session["UserPermission"] = RetVal;
            }

            return (List<GetUserPermission_Result>)HttpContext.Current.Session["UserPermission"];
        }

        /// <summary>
        /// This function validate the UserRole based on PermissionOfRole and ModuleName
        /// </summary>
        /// <param name="ModuleName"></param>
        /// <param name="PermissionOf"></param>
        /// <returns></returns>
        public static bool IsValidRoleAction(Window ModuleName, PermissionOfRoles PermissionOf)
        {
            
            List<GetUserPermission_Result> lstdata = GetUserPermission(UserHelper.GetCurrentUserName());
            var toReturnBool = false;
            if (lstdata != null && lstdata.Count > 0)
            {
                foreach (var items in lstdata)
                {
                    Window window_id = (Window)Enum.Parse(typeof(Window), ModuleName.ToString());
                    if (items.Window_Id == (int)window_id)
                    {
                        if (items.CanView == true)
                        {
                            switch (PermissionOf)
                            {
                                case PermissionOfRoles.CanView:
                                    toReturnBool = Convert.ToBoolean(items.CanView);
                                    break;
                                case PermissionOfRoles.CanAdd:
                                    toReturnBool = Convert.ToBoolean(items.CanAdd);
                                    break;
                                case PermissionOfRoles.CanUpdate:
                                    toReturnBool = Convert.ToBoolean(items.CanUpdate);
                                    break;
                                case PermissionOfRoles.CanDelete:
                                    toReturnBool = Convert.ToBoolean(items.CanDelete);
                                    break;
                                case PermissionOfRoles.CanPrint:
                                    toReturnBool = Convert.ToBoolean(items.CanPrint);
                                    break;
                                case PermissionOfRoles.CanDownload:
                                    toReturnBool = Convert.ToBoolean(items.CanDownload);
                                    break;
                                case PermissionOfRoles.CanUpload:
                                    toReturnBool = Convert.ToBoolean(items.CanUpload);
                                    break;
                            }
                        }
                        break;
                    }
                }

                return toReturnBool;
            }
            else
            {
                return false;
            }
        }

        public static int GetUserRoleId()
        {
            List<GetUserPermission_Result> lstdata = GetUserPermission(UserHelper.GetCurrentUserName());

            int? roleId = lstdata.Select(r => r.Role_Id).First() ?? 0;

            return (int)roleId;
        }

    }
}