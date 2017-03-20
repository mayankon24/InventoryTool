using System;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using InventoryTool.UI;
using InventoryTool.UI.Helper;

namespace InventoryTool.UI
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

//#if !DEBUG
        protected void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs
            Exception ex = Server.GetLastError();
            Application["TheException"] = ex; //store the error for later
            Server.ClearError(); //clear the error so we can continue onwards
            Response.Redirect("/Account/Error"); //direct user to error page
        }
//#endif
        
    }
}
