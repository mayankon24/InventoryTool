using Newtonsoft.Json;
using System.Collections.Generic;


namespace WDGBudgetTool.UI.Proxy
{
    public class CommonProxy
    {

        private static CommonProxy instance = null;
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


        public List<GetAllCategory_Result> GetAllCategory(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllCategory_Result>>(result);
        }


        public List<GetAllGroup_Result> GetAllGroup(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllGroup_Result>>(result);
        }


        public List<GetTeamByGroupId_Result> GetTeamByGroupId(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetTeamByGroupId_Result>>(result);
        }

        public List<GetProjectByGroupNTeam_Result> GetProjectByGroupNTeam(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetProjectByGroupNTeam_Result>>(result);
        }

        public List<GetAllStatus_Result> GetAllStatus(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllStatus_Result>>(result);
        }

        public List<GetAllClass_Result> GetAllClass(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllClass_Result>>(result);
        }

        public List<GetAllPriority_Result> GetAllPriority(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllPriority_Result>>(result);
        }

        public List<GetAllInvestmentType_Result> GetAllInvestmentType(string apiUri, string requestUri)
        {
            var result = ProxyHelper.GetResponseFromApi(apiUri, requestUri);
            return JsonConvert.DeserializeObject<List<GetAllInvestmentType_Result>>(result);
        }
    }
}
