CREATE TABLE [dbo].[M_Product] (
    [Product_Id]         INT             NOT NULL,
    [Product_Code]       NVARCHAR (100)  NULL,
    [Product_Name]       NVARCHAR (100)  NULL,
    [Manufacturing_Days] INT             NULL,
    [Description]        NVARCHAR (1000) NULL,
    [IsActive]           NCHAR (10)      NULL,
    CONSTRAINT [PK_M_Product] PRIMARY KEY CLUSTERED ([Product_Id] ASC)
);

