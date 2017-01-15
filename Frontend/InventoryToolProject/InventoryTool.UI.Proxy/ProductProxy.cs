using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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


        public void AddUpdateProducts(string apiUri, string requestUri)
        {
            
        }

    }
}
