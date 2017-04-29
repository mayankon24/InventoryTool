using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTool.Model
{
    public class VMImage
    {
        public VMImage()
        {
            Image = new M_Image();
        }

        public int Parent_Id { get; set; }
        public M_Image Image { get; set; }
    }
}
