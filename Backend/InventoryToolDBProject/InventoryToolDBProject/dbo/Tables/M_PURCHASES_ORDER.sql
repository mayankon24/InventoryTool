CREATE TABLE [dbo].[M_PURCHASES_ORDER] (
    [Purchases_Order_Id] INT           IDENTITY (1, 1) NOT NULL,
    [Company_id]         INT           NULL,
    [Date]               DATETIME      NULL,
    [Purchases_Order_No] VARCHAR (100) NOT NULL,
    [Future1]            NCHAR (10)    NULL,
    [Future2]            NCHAR (10)    NULL,
    CONSTRAINT [PK_M_PURCHASES_ORDER] PRIMARY KEY CLUSTERED ([Purchases_Order_Id] ASC)
);

