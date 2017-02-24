CREATE TABLE [dbo].[TX_Part_Stock] (
    [Part_Stock_Id]       BIGINT         IDENTITY (1, 1) NOT NULL,
    [Part_Id]             INT            NULL,
    [Store_Id]            INT            NULL,
    [Date]                DATETIME       NULL,
    [In_Quantity]         INT            NULL,
    [Out_Quantity]        INT            NULL,
    [Description]         NVARCHAR (500) NULL,
    [CreatedBy]           NVARCHAR (100) NULL,
    [CreatedUTCDate]      DATETIME       NULL,
    [LastModifiedBy]      NVARCHAR (100) NULL,
    [LastModifiedUTCDate] DATETIME       NULL,
    [IsActive]            BIT            NOT NULL,
    CONSTRAINT [PK_TX_Part_Stock] PRIMARY KEY CLUSTERED ([Part_Stock_Id] ASC)
);

