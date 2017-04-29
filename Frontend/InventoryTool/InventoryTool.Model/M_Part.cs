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
    
    public partial class M_Part
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public M_Part()
        {
            this.TX_Part_Stock = new HashSet<TX_Part_Stock>();
        }
    
        public int Part_Id { get; set; }
        public Nullable<int> Part_Type_Id { get; set; }
        public Nullable<int> Outsource_Type_Id { get; set; }
        public string Part_Code { get; set; }
        public string Part_Name { get; set; }
        public Nullable<int> Category_Id { get; set; }
        public Nullable<int> Color_Id { get; set; }
        public Nullable<int> Material_Id { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedUTCDate { get; set; }
        public string LastModifiedBy { get; set; }
        public Nullable<System.DateTime> LastModifiedUTCDate { get; set; }
        public bool IsActive { get; set; }
        public Nullable<int> Unit_Id { get; set; }
        public Nullable<int> Criticality_Id { get; set; }
        public Nullable<int> Min_Quantity { get; set; }
        public Nullable<int> Image_Id { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TX_Part_Stock> TX_Part_Stock { get; set; }
    }
}
