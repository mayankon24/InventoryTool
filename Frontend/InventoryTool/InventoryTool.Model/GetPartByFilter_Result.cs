//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace InventoryTool.Model
{
    using System;
    
    public partial class GetPartByFilter_Result
    {
        public int Part_Id { get; set; }
        public int Part_Type_Id { get; set; }
        public string Part_Type { get; set; }
        public int Outsource_Type_Id { get; set; }
        public string Outsource_Type { get; set; }
        public string Part_Code { get; set; }
        public string Part_Name { get; set; }
        public int Unit_Id { get; set; }
        public string Unit_Name { get; set; }
        public int Category_Id { get; set; }
        public string Category_Name { get; set; }
        public int Color_Id { get; set; }
        public string Color_Name { get; set; }
        public int Material_Id { get; set; }
        public string Material_Name { get; set; }
        public int Criticality_Id { get; set; }
        public string Criticality_Name { get; set; }
        public Nullable<int> Balance_Quantity { get; set; }
    }
}
