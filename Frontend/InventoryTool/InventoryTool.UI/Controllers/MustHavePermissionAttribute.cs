using System.Web.Mvc;
using InventoryTool.UI.Helper;
/*
 Added By : Amrit Upadhyay
 Description: This class handle the Authoraztion process.
  if Authorazation failed then redirect to No Access Permission View
 */
namespace InventoryTool.UI.Controllers
{
    public class MustHavePermissionAttribute : ActionFilterAttribute
    {
        private readonly PermissionOfRoles  _PermissionOfRoles;
        private readonly Window _ModuleName;
        private bool _isValidPermission;
        public string LoginUrl { get; set; }
        readonly PermissionOfRoles[] PermissionOfList;
        /// <summary>
        /// </summary>
        /// <param name="ModuleName"></param>
        /// <param name="PermissionOf"></param>
        public MustHavePermissionAttribute(Window ModuleName, PermissionOfRoles PermissionOf)
        {
            _ModuleName = ModuleName;
            _PermissionOfRoles = PermissionOf;
        }

        /// <summary>
        /// This can assign PermissionOfRoles as Array. 
        /// </summary>
        /// <param name="ModuleName"></param>
        /// <param name="PermissionOf"></param>
        public MustHavePermissionAttribute(Window ModuleName, PermissionOfRoles[] PermissionOf)
        {
            _ModuleName = ModuleName;
            PermissionOfList = PermissionOf;
        }

        /// <summary>
        /// This action fire before any Action Executing and check the User Role Permission.
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            _isValidPermission = false;
            if (_PermissionOfRoles > 0)
            {
                _isValidPermission = RoleHelper.IsValidRoleAction(_ModuleName, _PermissionOfRoles);
            }
            if (PermissionOfList != null && PermissionOfList.Length > 0)
            {
                foreach (PermissionOfRoles permissiondata in PermissionOfList)
                {
                    _isValidPermission = _isValidPermission | RoleHelper.IsValidRoleAction(_ModuleName, permissiondata);
                }
            }

            if (!_isValidPermission)
            {
                string redirectOnSuccess = "";
                LoginUrl = "/Account/UnAuthorize";
                if (filterContext.HttpContext.Request.Url != null)
                    redirectOnSuccess = filterContext.HttpContext.Request.Url.AbsolutePath + filterContext.HttpContext.Request.Url.Query;
                //send them off to the login page
                string redirectUrl = $"?ReturnUrl={redirectOnSuccess}";
                string loginUrl;
                if (!string.IsNullOrEmpty(LoginUrl))
                {
                    loginUrl = LoginUrl;
                }
                else
                {
                    loginUrl = filterContext.HttpContext.Request.IsAjaxRequest() ? $"/Account/UnAuthorize"
                        : "/Account/UnAuthorize";
                }
                filterContext.HttpContext.Response.Redirect(loginUrl + redirectUrl, true);
            }
            base.OnActionExecuting(filterContext);
        }
    }
}