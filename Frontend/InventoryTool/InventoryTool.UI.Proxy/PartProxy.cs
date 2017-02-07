using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InventoryTool.Model;

namespace InventoryTool.UI.Proxy
{
    public class PartProxy
    {
        private static PartProxy instance;
        private static readonly object padlock = new object();

        private PartProxy()
        {
        }

        public static PartProxy Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (padlock)
                    {
                        if (instance == null)
                        {
                            instance = new PartProxy();
                        }
                    }
                }
                return instance;
            }
        }


        public int AddUpdatePart(string apiUri, string requestUri, M_Part Part)
        {
            var result = ProxyHelper.PostRequestToApi(apiUri, requestUri, Part);
            return JsonConvert.DeserializeObject<int>(result);
        }

        public int DeletePart(string apiUri, string requestUri, M_Part Part)
        {
            var result = ProxyHelper.PostRequestToApi(apiUri, requestUri, Part);
            return JsonConvert.DeserializeObject<int>(result);
        }

        public List<GetAllPart_Result> GetAllPart(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllPart_Result>>(result);
        }

    }
}
