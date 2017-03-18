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
        SuperAdmin = 1,
        Admin = 2,
        Data_Operator = 3
    }
    
    public enum Window
    {
        Product = 1,
        Part = 2,
        Customer = 3,
        Supplier = 4,
        PartStock = 5,
        MinimumBalanceReport = 6
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