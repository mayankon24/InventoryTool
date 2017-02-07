#region

using System.Configuration;

#endregion

namespace InventoryTool.UI.Util
{
    internal class Constants
    {
        public static string ClientId = ConfigurationManager.AppSettings["ida:ClientId"];
    }
}