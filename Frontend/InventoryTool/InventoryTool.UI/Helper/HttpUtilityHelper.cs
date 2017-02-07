using System;
using System.Globalization;

namespace InventoryTool.UI.Helper
{
    public class HttpUtilityHelper
    {
        public static DateTime TryParseDateTime(object o)
        {
            try
            {
                CultureInfo provider = CultureInfo.CurrentUICulture;
                if (o != null) return DateTime.Parse(o.ToString(), provider);
            }
            catch
            {
                try
                {
                    CultureInfo provider = CultureInfo.CurrentCulture;
                    if (o != null) return DateTime.Parse(o.ToString(), provider);
                }
                catch
                {
                    try
                    {
                        CultureInfo provider = CultureInfo.InvariantCulture;
                        if (o != null) return DateTime.Parse(o.ToString(), provider);
                    }
                    catch
                    {
                        return DateTime.MinValue;
                    }
                }
            }

            return DateTime.MinValue;

        }
    }
}