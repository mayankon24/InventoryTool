CREATE TABLE [dbo].[M_Supplier] (
    [Supplier_Id]         INT             IDENTITY (1, 1) NOT NULL,
    [Supplier_Code]       NVARCHAR (100)  NULL,
    [Supplier_Name]       NVARCHAR (100)  NULL,
    [Contact_No]          NVARCHAR (100)  NULL,
    [Email]               NVARCHAR (100)  NULL,
    [Address1]            NVARCHAR (100)  NULL,
    [Address2]            NVARCHAR (100)  NULL,
    [City]                NVARCHAR (100)  NULL,
    [State]               NVARCHAR (100)  NULL,
    [PinCode]             NVARCHAR (15)   NULL,
    [TinNo]               NVARCHAR (15)   NULL,
    [VatNo]               NVARCHAR (15)   NULL,
    [Note]                NVARCHAR (1000) NULL,
    [CreatedBy]           NVARCHAR (100)  NULL,
    [CreatedUTCDate]      DATETIME        NULL,
    [LastModifiedBy]      NVARCHAR (100)  NULL,
    [LastModifiedUTCDate] DATETIME        NULL,
    [IsActive]            BIT             NOT NULL,
    CONSTRAINT [PK_M_Supplier] PRIMARY KEY CLUSTERED ([Supplier_Id] ASC)
);

