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
    
    public partial class GetStockPartDetailReport_Result
    {
        public long Part_Stock_Id { get; set; }
        public int Part_Id { get; set; }
        public string Part_Name { get; set; }
        public int Store_Id { get; set; }
        public string Store_Name { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<int> In_Quantity { get; set; }
        public Nullable<int> Out_Quantity { get; set; }
        public Nullable<System.Guid> Action_Guid { get; set; }
        public int StoreTransferType_Id { get; set; }
        public string StoreTransferType_Name { get; set; }
        public string Description { get; set; }
        public Nullable<int> Image_Id { get; set; }        
    }
}
