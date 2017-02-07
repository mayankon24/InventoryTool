using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTool.Model
{
    public class VMPart
    {
        public VMPart()
        {
            CategoryList = new List<GetAllCategory_Result>();
            ColorList = new List<GetAllColor_Result>();
            MaterialList = new List<GetAllMaterial_Result>();
            OutsourceTypeList = new List<GetAllOutsourceType_Result>();
            PartTypeList = new List<GetAllPartType_Result>();
            UnitList = new List<GetAllUnit_Result>();
            PartList = new List<GetAllPart_Result>();

        }
        public List<GetAllCategory_Result> CategoryList { get; set; }
        public List<GetAllColor_Result> ColorList { get; set; }
        public List<GetAllMaterial_Result> MaterialList { get; set; }
        public List<GetAllOutsourceType_Result> OutsourceTypeList { get; set; }
        public List<GetAllPartType_Result> PartTypeList { get; set; }
        public List<GetAllUnit_Result> UnitList { get; set; }
        public List<GetAllPart_Result> PartList { get; set; }
    }
}
