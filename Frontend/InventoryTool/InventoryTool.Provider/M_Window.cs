//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace InventoryTool.Provider
{
    using System;
    using System.Collections.Generic;
    
    public partial class M_Window
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public M_Window()
        {
            this.Window_Role_Permission = new HashSet<Window_Role_Permission>();
        }
    
        public int Window_Id { get; set; }
        public string Page_Name { get; set; }
        public string Page_Description { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedUTCDate { get; set; }
        public string LastModifiedBy { get; set; }
        public Nullable<System.DateTime> LastModifiedUTCDate { get; set; }
        public bool IsActive { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Window_Role_Permission> Window_Role_Permission { get; set; }
    }
}
