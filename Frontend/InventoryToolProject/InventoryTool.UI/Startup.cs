using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(InventoryTool.UI.Startup))]
namespace InventoryTool.UI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
