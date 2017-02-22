CREATE TABLE [dbo].[Item_Consumption] (
    [Item_Consumption_Id] INT             IDENTITY (1, 1) NOT NULL,
    [Part_Id]             INT             NULL,
    [Machine_Process_Id]  INT             NULL,
    [Quantity]            DECIMAL (18, 2) NULL,
    [Date]                DATETIME        NULL,
    [User_Id]             INT             NULL,
    [IsActive]            BIT             NOT NULL,
    CONSTRAINT [PK_Item_Consumption] PRIMARY KEY CLUSTERED ([Item_Consumption_Id] ASC),
    CONSTRAINT [FK_Item_Consumption_Machine_Process] FOREIGN KEY ([Machine_Process_Id]) REFERENCES [dbo].[Machine_Process] ([Machine_Process_Id])
);



