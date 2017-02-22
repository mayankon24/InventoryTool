CREATE TABLE [dbo].[M_Company] (
    [Company_Id]   INT            IDENTITY (1, 1) NOT NULL,
    [Tin_No]       NVARCHAR (50)  NULL,
    [Company_Name] NVARCHAR (150) NULL,
    [Address1]     NVARCHAR (450) NULL,
    [Pan_No]       NVARCHAR (50)  NULL,
    [City]         NVARCHAR (50)  NULL,
    [State]        NVARCHAR (50)  NULL,
    [Pincode]      NVARCHAR (50)  NULL,
    [Email]        NVARCHAR (150) NULL,
    [Phone]        NVARCHAR (50)  NULL,
    [Fax_No]       NVARCHAR (50)  NULL,
    [IsActive]     BIT            NOT NULL
);



