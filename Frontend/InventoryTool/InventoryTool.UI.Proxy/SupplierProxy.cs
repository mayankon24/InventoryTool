using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InventoryTool.Model;

namespace InventoryTool.UI.Proxy
{
    public class SupplierProxy
    {
        private static SupplierProxy instance;
        private static readonly object padlock = new object();

        private SupplierProxy()
        {
        }

        public static SupplierProxy Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (padlock)
                    {
                        if (instance == null)
                        {
                            instance = new SupplierProxy();
                        }
                    }
                }
                return instance;
            }
        }


        public int AddUpdateSupplier(string apiUri, string requestUri, M_Supplier Supplier)
        {
            var result = ProxyHelper.PostRequestToApi(apiUri, requestUri, Supplier);
            return JsonConvert.DeserializeObject<int>(result);
        }

        public int DeleteSupplier(string apiUri, string requestUri, M_Supplier Supplier)
        {
            var result = ProxyHelper.PostRequestToApi(apiUri, requestUri, Supplier);
            return JsonConvert.DeserializeObject<int>(result);
        }

        public List<GetAllSupplier_Result> GetAllSupplier(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllSupplier_Result>>(result);
        }

    }
}
