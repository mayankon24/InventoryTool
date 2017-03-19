using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Web;

namespace InventoryTool.UI.Helper
{
    public static class UserHelper
    {
        public static string GetFullName(this IPrincipal user)
        {
            var prinicpal = (ClaimsPrincipal)Thread.CurrentPrincipal;
            var FullName = prinicpal.Claims.Where(c => c.Type == "name").Select(c => c.Value).SingleOrDefault();
            return FullName;
        }

        public static string GetCurrentUserName()
        {
            if (HttpContext.Current.Session["CurrentUserName"] == null)
            {
                var prinicpal = (ClaimsPrincipal)Thread.CurrentPrincipal;

                HttpContext.Current.Session["CurrentUserName"] = ((ClaimsIdentity)prinicpal.Identity).Name;             
            }
            return HttpContext.Current.Session["CurrentUserName"].ToString();
        }
    }
}