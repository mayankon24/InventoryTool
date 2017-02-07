using System.Configuration;

namespace InventoryTool.UI.Helper
{
    public class ConfigExtension
    {
        public static string GetWebApiUri => ConfigurationManager.AppSettings["ApiUri"];
    }
}