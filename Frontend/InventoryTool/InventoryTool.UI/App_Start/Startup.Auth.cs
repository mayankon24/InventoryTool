using System;
using System.Configuration;
using System.Globalization;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Owin;
using Microsoft.Owin;
using InventoryTool.UI.Helper;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using InventoryTool.UI.Models;
using System.IdentityModel.Claims;

/*
* Modified By : Amrit Upadhyay
* Modified On : 19-Oct-2016
* */
[assembly: OwinStartup(typeof(InventoryTool.UI.Startup))]
namespace InventoryTool.UI
{
    public partial class Startup
    {

        private static readonly string clientId = ConfigurationManager.AppSettings["ida:ClientId"];
        private static readonly string aadInstance = ConfigurationManager.AppSettings["ida:AADInstance"];
        private static readonly string Domain = ConfigurationManager.AppSettings["ida:Domain"];
        private static readonly string postLogoutRedirectUri = ConfigurationManager.AppSettings["ida:PostLogoutRedirectUri"];
        private static readonly string appKey = ConfigurationManager.AppSettings["ida:AppKey"];
        readonly string graphResourceId = ConfigurationManager.AppSettings["ida:GraphUrl"];
        private static readonly string Authority = String.Format(CultureInfo.InvariantCulture, (aadInstance + Domain));



        public void ConfigureAuth(IAppBuilder app)
        {
            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

            app.UseCookieAuthentication(new CookieAuthenticationOptions());

            app.UseOpenIdConnectAuthentication(
                new OpenIdConnectAuthenticationOptions
                {

                    ClientId = clientId,
                    Authority = Authority,
                    PostLogoutRedirectUri = postLogoutRedirectUri,

                    Notifications = new OpenIdConnectAuthenticationNotifications()
                    {
                        // If there is a code in the OpenID Connect response, redeem it for an access token and refresh token, and store those away.
                        AuthorizationCodeReceived = async (context) =>
                        {
                            var code = context.Code;
                            ClientCredential credential = new ClientCredential(clientId, appKey);
                            string signedInUserID = context.AuthenticationTicket.Identity.FindFirst(ClaimTypes.NameIdentifier).Value;
                            AuthenticationContext authContext = new AuthenticationContext(Authority, new ADALTokenCache(signedInUserID));
                            await authContext.AcquireTokenByAuthorizationCodeAsync(
                                code, new Uri(HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Path)), credential, graphResourceId);
                            //Hookup the Method to Get UserRolePermission RoleSet.
                            RoleHelper.GetUserPermission(context.AuthenticationTicket.Identity.Name, true);
                        },
                        AuthenticationFailed = context =>
                        {
                            context.HandleResponse();
                            context.Response.Redirect("/Error/message=" + context.Exception.Message);
                            return Task.FromResult(0);

                        }

                    }
                });
        }
    }

}



