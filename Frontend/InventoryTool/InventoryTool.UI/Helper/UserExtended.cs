using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Web;

namespace InventoryTool.UI.Helper
{
    public static class UserExtended
    {
        public static string GetFullName(this IPrincipal user)
        {
            var prinicpal = (ClaimsPrincipal)Thread.CurrentPrincipal;
            //var name = prinicpal.Claims.Where(c => c.Type == ClaimTypes.Name).Select(c => c.Value).SingleOrDefault();
            /*
             Note : Here ClaimTypes value give as static "name" because it's not avaliable in ClaimTypes Property/
             */
            var FullName = prinicpal.Claims.Where(c => c.Type == "name").Select(c => c.Value).SingleOrDefault();
            return FullName;

        }

        public static string GetCurrentUserAlias()
        {
            if (HttpContext.Current.Session["CurrentUserAlias"] == null)
            {
                var prinicpal = (ClaimsPrincipal)Thread.CurrentPrincipal;

                HttpContext.Current.Session["CurrentUserAlias"] = ((ClaimsIdentity)prinicpal.Identity).Name;
            }
            return HttpContext.Current.Session["CurrentUserAlias"].ToString();
        }
    }
}