using InventoryTool.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTool.UI.Proxy
{
    public class CommonProxy
    {

        private static CommonProxy instance;
        private static readonly object padlock = new object();

        private CommonProxy()
        {
        }

        public static CommonProxy Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (padlock)
                    {
                        if (instance == null)
                        {
                            instance = new CommonProxy();
                        }
                    }
                }
                return instance;
            }
        }

        public List<GetUserPermission_Result> GetUserPermission(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetUserPermission_Result>>(result);
        }

    }
}
