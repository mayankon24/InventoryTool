using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Json;

namespace InventoryTool.UI.Proxy
{

    class ProxyHelper
    { /// <summary>
      /// The Internet media type or Content type
      /// </summary>
        private const string MediaType = "application/json";

        public static string GetResponseFromApi(string apiUri, string requestUri)
        {
            string result;

            HttpClientHandler handler = new HttpClientHandler()
            {
                UseDefaultCredentials = true
            };

            using (var client = new HttpClient(handler))
            {
                client.BaseAddress = new Uri(apiUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(MediaType));

                using (HttpResponseMessage response = client.GetAsync(requestUri).Result)
                {
                    result = GetResultStringObject(response);
                }
            }


            return result;
        }


        /// <summary>
        /// Gets the response from API.
        /// </summary>
        /// <typeparam name="T">Type is the object type in which result will return</typeparam>
        /// <param name="apiUri">The API URI.</param>
        /// <param name="requestUri">The request URI.</param>
        /// <param name="requestData" />
        /// <returns>Result will return in the form of generic type</returns>
        public static string PostRequestToApi<T>(string apiUri, string requestUri, T requestData)
        {
            HttpClientHandler handler = new HttpClientHandler()
            {
                UseDefaultCredentials = true
            };

            using (var client = new HttpClient(handler))
            {
                string postData;
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(requestData.GetType());
                using (MemoryStream ms = new MemoryStream())
                {
                    serializer.WriteObject(ms, requestData);
                    ms.Seek(0, SeekOrigin.Begin);
                    using (StreamReader sr = new StreamReader(ms))
                    {
                        postData = sr.ReadToEnd();
                    }
                }

                client.BaseAddress = new Uri(apiUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(MediaType));
                using (var response = client.PostAsync(requestUri, new StringContent(postData, Encoding.UTF8, "application/json")).Result)
                {
                    return GetResultStringObject(response);
                }
            }
        }

        private static string GetResultStringObject(HttpResponseMessage response)
        {
            string result;
            using (Stream stream = response.Content.ReadAsStreamAsync().Result)
            {
                var reader = new StreamReader(stream);
                result = reader.ReadToEnd();
            }

            return result;
        }
    }
}
