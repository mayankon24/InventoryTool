using System;

namespace InventoryTool.UI.Helper
{
    public static class ViewHelper
    {
        public static string GetCurrentFiscalYear()
        {
            DateTime dt = DateTime.Now;
            string curYear = dt.Year.ToString().Substring(2, 2);
            string curMonth = dt.Month.ToString();

            int Month = Convert.ToInt32(curMonth);
            if (Month <= 6)
            {
                int CurrentFY = Convert.ToInt32(curYear);
                curYear = "FY" + Convert.ToString(CurrentFY);
            }
            else
            {
                var CurrentFY = Convert.ToInt32(curYear) + 1;
                curYear = "FY" + Convert.ToString(CurrentFY);
            }

            return curYear;
        }

        public static string Encode(string encodeMe)
        {
            if (!string.IsNullOrEmpty(encodeMe))
            {
                byte[] encoded = System.Text.Encoding.UTF8.GetBytes(encodeMe);
                return Convert.ToBase64String(encoded);
            }
            else
            {
                return string.Empty;
            }
        }

        public static string Decode(string decodeMe)
        {
            if (!string.IsNullOrEmpty(decodeMe))
            {

                byte[] encoded = Convert.FromBase64String(decodeMe);
                return System.Text.Encoding.UTF8.GetString(encoded);
            }
            else
            {
                return string.Empty;
            }
        }
    }
}