using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(InventoryTool.UI1.Startup))]
namespace InventoryTool.UI1
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
