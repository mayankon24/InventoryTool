using System;
using System.Configuration;
using System.Globalization;
using Microsoft.Owin.Security.Cookies;
using Owin;
using Microsoft.Owin;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.Google;
using InventoryTool.UI.Helper;

[assembly: OwinStartup(typeof(InventoryTool.UI.Startup))]
namespace InventoryTool.UI
{
    public partial class Startup
    {

        //private static readonly string clientId = ConfigurationManager.AppSettings["ida:ClientId"];
        //private static readonly string aadInstance = ConfigurationManager.AppSettings["ida:AADInstance"];
        //private static readonly string Domain = ConfigurationManager.AppSettings["ida:Domain"];
        //private static readonly string postLogoutRedirectUri = ConfigurationManager.AppSettings["ida:PostLogoutRedirectUri"];
        //private static readonly string appKey = ConfigurationManager.AppSettings["ida:AppKey"];
        //readonly string graphResourceId = ConfigurationManager.AppSettings["ida:GraphUrl"];
        //private static readonly string Authority = String.Format(CultureInfo.InvariantCulture, (aadInstance + Domain));
        

        public void ConfigureAuth(IAppBuilder app)
        {

            // Enable the application to use a cookie to store information for the signed in user
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login")
            });
            // Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //   consumerKey: "",
            //   consumerSecret: "");

            //app.UseFacebookAuthentication(
            //   appId: "",
            //   appSecret: "");

            var options = new GoogleOAuth2AuthenticationOptions
            {
                ClientId = ConfigExtension.ClientId,
                ClientSecret = ConfigExtension.ClientSecret,
                Provider = new GoogleOAuth2AuthenticationProvider
                {
                    OnAuthenticated = async context =>
                    {
                        // Retrieve the OAuth access token to store for subsequent API calls
                        string accessToken = context.AccessToken;

                        // Retrieve the name of the user in Google
                        string googleName = context.Name;

                        // Retrieve the user's email address
                        string googleEmailAddress = context.Email;

                        // You can even retrieve the full JSON-serialized user
                        var serializedUser = context.User;

                    }
                }
            };
            app.UseGoogleAuthentication(options);

        }
    }

}



