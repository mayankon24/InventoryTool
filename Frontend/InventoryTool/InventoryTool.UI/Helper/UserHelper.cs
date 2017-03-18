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
            //var name = prinicpal.Claims.Where(c => c.Type == ClaimTypes.Name).Select(c => c.Value).SingleOrDefault();
            /*
             Note : Here ClaimTypes value give as static "name" because it's not avaliable in ClaimTypes Property/
             */
            var FullName = prinicpal.Claims.Where(c => c.Type == "name").Select(c => c.Value).SingleOrDefault();
            FullName = "mayank";
            return FullName;

        }

        public static string GetCurrentUserName()
        {
            if (HttpContext.Current.Session["CurrentUserName"] == null)
            {
                var prinicpal = (ClaimsPrincipal)Thread.CurrentPrincipal;

                HttpContext.Current.Session["CurrentUserName"] = ((ClaimsIdentity)prinicpal.Identity).Name;

                HttpContext.Current.Session["CurrentUserName"] = "mayank_aggarwal";

            }
            return HttpContext.Current.Session["CurrentUserName"].ToString();
        }
    }
}