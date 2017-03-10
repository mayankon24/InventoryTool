namespace InventoryTool.UI.Helper
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
        Admin_Portal = 1,
        Budget_Summary = 2,
        Budget_Request = 3,
        Budget_Report = 4,
        Group = 5,
        Team = 6,
        Project = 7,
        SubProject = 8,
        Field1 = 9,
        Field2 = 10,
        Manage = 11
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

    public enum StockType
    {
        input = 1,
        output = 2,
        transfer = 3
    }
}