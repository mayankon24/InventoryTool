CREATE TABLE [dbo].[M_Product] (
    [Product_Id]          INT             IDENTITY (1, 1) NOT NULL,
    [Product_Code]        NVARCHAR (100)  NULL,
    [Product_Name]        NVARCHAR (100)  NULL,
    [Manufacturing_Days]  INT             NULL,
    [Description]         NVARCHAR (1000) NULL,
    [CreatedBy]           NVARCHAR (100)  NULL,
    [CreatedUTCDate]      DATETIME        NULL,
    [LastModifiedBy]      NVARCHAR (100)  NULL,
    [LastModifiedUTCDate] DATETIME        NULL,
    [IsActive]            BIT             NULL,
    CONSTRAINT [PK_M_Product] PRIMARY KEY CLUSTERED ([Product_Id] ASC)
);





