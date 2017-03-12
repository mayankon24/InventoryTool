using InventoryTool.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTool.UI.Proxy
{
    public class ReportProxy
    {

        private static ReportProxy instance;
        private static readonly object padlock = new object();

        private ReportProxy()
        {
        }

        public static ReportProxy Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (padlock)
                    {
                        if (instance == null)
                        {
                            instance = new ReportProxy();
                        }
                    }
                }
                return instance;
            }
        }

        public List<vw_MinimumBalance> GetMinBalanceReport(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<vw_MinimumBalance>>(result);
        }
    }
}
