using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InventoryTool.Model;

namespace InventoryTool.UI.Proxy
{
    public class PartStockProxy
    {
        private static PartStockProxy instance;
        private static readonly object padlock = new object();

        private PartStockProxy()
        {
        }

        public static PartStockProxy Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (padlock)
                    {
                        if (instance == null)
                        {
                            instance = new PartStockProxy();
                        }
                    }
                }
                return instance;
            }
        }


        public int UpdatePartStock(string apiUri, string requestUri, VMAddPartStock AddPartStock)
        {
            var result = ProxyHelper.PostRequestToApi(apiUri, requestUri, AddPartStock);
            return JsonConvert.DeserializeObject<int>(result);
        }

        public List<GetPartByFilter_Result> GetPartByFilter(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetPartByFilter_Result>>(result);
        }
    }
}
