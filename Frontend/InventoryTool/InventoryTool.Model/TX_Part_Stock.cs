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
    using System.Collections.Generic;
    
    public partial class TX_Part_Stock
    {
        public long Part_Stock_Id { get; set; }
        public Nullable<int> Part_Id { get; set; }
        public Nullable<int> Store_Id { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<int> In_Quantity { get; set; }
        public Nullable<int> Out_Quantity { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedUTCDate { get; set; }
        public string LastModifiedBy { get; set; }
        public Nullable<System.DateTime> LastModifiedUTCDate { get; set; }
        public bool IsActive { get; set; }
    }
}