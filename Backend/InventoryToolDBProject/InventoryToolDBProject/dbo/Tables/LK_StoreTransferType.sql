CREATE TABLE [dbo].[LK_StoreTransferType] (
    [StoreTransferType_Id]   INT            IDENTITY (1, 1) NOT NULL,
    [StoreTransferType_Name] NVARCHAR (100) NULL,
    [IsActive]               BIT            NOT NULL,
    CONSTRAINT [PK_LK_StoreTransferType] PRIMARY KEY CLUSTERED ([StoreTransferType_Id] ASC)
);

