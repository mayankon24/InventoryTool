using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTool.Model
{
    public class VMPartStock
    {
        public VMPartStock()
        {           
            PartTypeList = new List<GetAllPartType_Result>();           
            PartList = new List<GetAllPart_Result>();
        }
        public List<GetAllCategory_Result> CategoryList { get; set; }
        public List<GetAllColor_Result> ColorList { get; set; }
        public List<GetAllMaterial_Result> MaterialList { get; set; }
        public List<GetAllCriticality_Result> CriticalityList { get; set; }
        
        public List<GetAllOutsourceType_Result> OutsourceTypeList { get; set; }
        public List<GetAllPartType_Result> PartTypeList { get; set; }
        public List<GetAllUnit_Result> UnitList { get; set; }
        public List<GetAllPart_Result> PartList { get; set; }
    }
}
