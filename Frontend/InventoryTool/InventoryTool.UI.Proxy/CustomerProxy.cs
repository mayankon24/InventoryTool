using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InventoryTool.Model;

namespace InventoryTool.UI.Proxy
{
    public class CustomerProxy
    {
        private static CustomerProxy instance;
        private static readonly object padlock = new object();

        private CustomerProxy()
        {
        }

        public static CustomerProxy Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (padlock)
                    {
                        if (instance == null)
                        {
                            instance = new CustomerProxy();
                        }
                    }
                }
                return instance;
            }
        }


        public int AddUpdateCustomer(string apiUri, string requestUri, M_Customer Customer)
        {
            var result = ProxyHelper.PostRequestToApi(apiUri, requestUri, Customer);
            return JsonConvert.DeserializeObject<int>(result);
        }

        public int DeleteCustomer(string apiUri, string requestUri, M_Customer Customer)
        {
            var result = ProxyHelper.PostRequestToApi(apiUri, requestUri, Customer);
            return JsonConvert.DeserializeObject<int>(result);
        }

        public List<GetAllCustomer_Result> GetAllCustomer(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllCustomer_Result>>(result);
        }

    }
}
