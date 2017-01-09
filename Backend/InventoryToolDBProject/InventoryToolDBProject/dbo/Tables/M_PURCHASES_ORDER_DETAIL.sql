CREATE TABLE [dbo].[M_PURCHASES_ORDER_DETAIL] (
    [Purchase_Order_Detail_Id] INT             IDENTITY (1, 1) NOT NULL,
    [Purchases_Order_Id]       INT             NULL,
    [Row_Material_Item_Id]     INT             NULL,
    [Notes]                    NVARCHAR (1000) NULL,
    [Quantity]                 FLOAT (53)      NULL,
    [Item_Rate]                FLOAT (53)      NULL,
    [Total_Amount]             DECIMAL (10, 2) NULL,
    [future1]                  NCHAR (10)      NULL,
    [future2]                  NCHAR (10)      NULL,
    CONSTRAINT [PK_M_PURCHASES_ORDER_DETAIL] PRIMARY KEY CLUSTERED ([Purchase_Order_Detail_Id] ASC),
    CONSTRAINT [FK_M_PURCHASES_ORDER_DETAIL_M_PURCHASES_ORDER] FOREIGN KEY ([Purchases_Order_Id]) REFERENCES [dbo].[M_PURCHASES_ORDER] ([Purchases_Order_Id]),
    CONSTRAINT [FK_M_PURCHASES_ORDER_DETAIL_Row_Material_Item] FOREIGN KEY ([Row_Material_Item_Id]) REFERENCES [dbo].[Row_Material_Item] ([Row_Material_Item_Id])
);

