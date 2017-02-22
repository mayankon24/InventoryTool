CREATE TABLE [dbo].[M_PURCHASES_ORDER] (
    [Purchases_Order_Id] INT           IDENTITY (1, 1) NOT NULL,
    [Company_Id]         INT           NULL,
    [Date]               DATETIME      NULL,
    [Purchases_Order_No] VARCHAR (100) NOT NULL,
    [IsActive]           BIT           NOT NULL,
    CONSTRAINT [PK_M_PURCHASES_ORDER] PRIMARY KEY CLUSTERED ([Purchases_Order_Id] ASC)
);



