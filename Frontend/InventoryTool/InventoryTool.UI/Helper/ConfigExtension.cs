using System.Configuration;

namespace InventoryTool.UI.Helper
{
    public class ConfigExtension
    {
        public static string GetWebApiUri => ConfigurationManager.AppSettings["ApiUri"];
        public static string ClientId => ConfigurationManager.AppSettings["ClientId"];
        public static string ClientSecret => ConfigurationManager.AppSettings["ClientSecret"];
        
    }
}