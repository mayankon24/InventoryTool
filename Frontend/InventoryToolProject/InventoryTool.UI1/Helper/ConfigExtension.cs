using System.Configuration;

namespace InventoryTool.UI1.Helper
{
    public class ConfigExtension
    {
        public static string GetWebApiUri => ConfigurationManager.AppSettings["ApiUri"];
    }
}