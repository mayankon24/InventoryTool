using EntityFrameworkExtras.EF6;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTool.Model
{
    [UserDefinedTableType("udt_PartQuantity")]
    public class udt_PartQuantity
    {
        [UserDefinedTableTypeColumn(1, "Part_Id")]
        public int Part_Id { get; set; }
        [UserDefinedTableTypeColumn(2, "Quantity")]
        public int Quantity { get; set; }
    }
}
