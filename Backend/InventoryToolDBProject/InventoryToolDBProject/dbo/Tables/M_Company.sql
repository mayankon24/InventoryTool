CREATE TABLE [dbo].[M_Company] (
    [Company_id]   INT             IDENTITY (1, 1) NOT NULL,
    [tin_no]       NVARCHAR (50)   NULL,
    [company_name] NVARCHAR (150)  NULL,
    [address1]     NVARCHAR (450)  NULL,
    [pan_no]       NVARCHAR (50)   NULL,
    [city]         NVARCHAR (50)   NULL,
    [state]        NVARCHAR (50)   NULL,
    [pincode]      NVARCHAR (50)   NULL,
    [email]        NVARCHAR (150)  NULL,
    [phone]        NVARCHAR (50)   NULL,
    [Fax_No]       NVARCHAR (50)   NULL,
    [is_active]    INT             NULL,
    [future1]      NVARCHAR (100)  NULL,
    [future2]      NVARCHAR (100)  NULL,
    [delivery_at]  NVARCHAR (2000) NULL
);

