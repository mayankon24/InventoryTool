using InventoryTool.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTool.UI.Proxy
{
    public class LookupProxy
    {

        private static LookupProxy instance;
        private static readonly object padlock = new object();

        private LookupProxy()
        {
        }

        public static LookupProxy Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (padlock)
                    {
                        if (instance == null)
                        {
                            instance = new LookupProxy();
                        }
                    }
                }
                return instance;
            }
        }

        public List<GetAllCategory_Result> GetAllCategory(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllCategory_Result>>(result);
        }

        public List<GetAllColor_Result> GetAllColor(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllColor_Result>>(result);
        }

        public List<GetAllMaterial_Result> GetAllMaterial(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllMaterial_Result>>(result);
        }

        public List<GetAllOutsourceType_Result> GetAllOutsourceType(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllOutsourceType_Result>>(result);
        }

        public List<GetAllPartType_Result> GetAllPartType(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllPartType_Result>>(result);
        }

        public List<GetAllUnit_Result> GetAllunit(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllUnit_Result>>(result);
        }
    }
}
