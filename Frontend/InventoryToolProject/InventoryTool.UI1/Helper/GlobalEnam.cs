namespace InventoryTool.UI1.Helper
{
    public enum operation_status
    {
        Insert = 1,
        Update = 2,
        Delete = 3,
        Bulk_Insert = 4,
        Error = -1,
        Duplicate_Record = -2,
        Delete_Prevent = -3,
        Update_Prevent = -4,
        Duplicate_Step = -5
    }

    public enum Role
    {
        Budget_Admin = 1,
        Budget_Champion = 2,
        Budget_Manager = 3,
        Finance_Admin = 4,
        Budget_Visitor = 5,
        Budget_Director = 6,
        Tool_Admin = 7
    }
    
    public enum Window
    {
        product =1
    }

    public enum PermissionOfRoles
    {
        CanView = 1,
        CanAdd,
        CanUpdate,
        CanDelete,
        CanPrint,
        CanDownload,
        CanUpload
    } 

}