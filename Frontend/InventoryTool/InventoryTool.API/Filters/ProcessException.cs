using System;

namespace InventoryTool.API.Filters
{
    public class ProcessException : Exception
    {
        public ProcessException(string message)
           : base(message)
        {

        }
    }
}