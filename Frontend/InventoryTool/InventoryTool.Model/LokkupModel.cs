using System.Collections.Generic;

namespace InventoryTool.Model
{

    public class LokkupModel
    {
        public LokkupModel()
        {
            CategoryList = new List<GetAllCategory_Result>();
            ColorList = new List<GetAllColor_Result>();
            MaterialList = new List<GetAllMaterial_Result>();
            OutsourceType = new List<GetAllOutsourceType_Result>();
            PartType = new List<GetAllPartType_Result>();
            Unit = new List<GetAllUnit_Result>();

        }

        public List<GetAllCategory_Result> CategoryList { get; set; }
        public List<GetAllColor_Result> ColorList { get; set; }
        public List<GetAllMaterial_Result> MaterialList { get; set; }
        public List<GetAllOutsourceType_Result> OutsourceType { get; set; }
        public List<GetAllPartType_Result> PartType { get; set; }
        public List<GetAllUnit_Result> Unit { get; set; }
    }
}
