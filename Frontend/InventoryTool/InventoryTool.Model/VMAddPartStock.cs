using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTool.Model
{
    public class VMAddPartStock
    {
        public int Store_Id { get; set; }
        public bool  IsInput { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string LastModifiedBy { get; set; }
        public List<PartQuantity> PartQuantity { get; set; }
    }

    public class PartQuantity
    {
        public int Part_Id { get; set; }
        public Nullable<int> Quantity { get; set; }
    }

}
