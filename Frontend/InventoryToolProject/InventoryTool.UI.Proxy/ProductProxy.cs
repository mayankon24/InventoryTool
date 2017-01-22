using Newtonsoft.Json;
using InventoryTool.Model;

namespace InventoryTool.UI.Proxy
{
    public class ProductProxy
    {
        private static ProductProxy instance;
        private static readonly object padlock = new object();

        private ProductProxy()
        {
        }

        public static ProductProxy Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (padlock)
                    {
                        if (instance == null)
                        {
                            instance = new ProductProxy();
                        }
                    }
                }
                return instance;
            }
        }


        public int UpdateProduct(string apiUri, string requestUri, M_Product product)
        {
            var result = ProxyHelper.PostRequestToApi(apiUri, requestUri, product);
            return JsonConvert.DeserializeObject<int>(result);
        }

        public int DeleteProduct(string apiUri, string requestUri, M_Product product)
        {
            var result = ProxyHelper.PostRequestToApi(apiUri, requestUri, product);
            return JsonConvert.DeserializeObject<int>(result);
        }

    }
}
