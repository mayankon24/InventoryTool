using Newtonsoft.Json;
using InventoryTool.Model;
using System.Collections.Generic;

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


        public int AddUpdateProduct(string apiUri, string requestUri, M_Product product)
        {
            var result = ProxyHelper.PostRequestToApi(apiUri, requestUri, product);
            return JsonConvert.DeserializeObject<int>(result);
        }

        public int DeleteProduct(string apiUri, string requestUri, M_Product product)
        {
            var result = ProxyHelper.PostRequestToApi(apiUri, requestUri, product);
            return JsonConvert.DeserializeObject<int>(result);
        }

        public List<GetAllProduct_Result> GetAllProduct(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllProduct_Result>>(result);
        }

    }
}
