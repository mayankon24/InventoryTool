CREATE TABLE [dbo].[Product_Part] (
    [Product_Part_Id]     INT            IDENTITY (1, 1) NOT NULL,
    [Product_Id]          INT            NULL,
    [Part_Id]             INT            NULL,
    [Quantity]            INT            NULL,
    [CreatedBy]           NVARCHAR (100) NULL,
    [CreatedUTCDate]      DATETIME       NULL,
    [LastModifiedBy]      NVARCHAR (100) NULL,
    [LastModifiedUTCDate] DATETIME       NULL,
    [IsActive]            BIT            NOT NULL,
    CONSTRAINT [PK_Product_Part] PRIMARY KEY CLUSTERED ([Product_Part_Id] ASC),
    CONSTRAINT [FK_Product_Part_M_Part] FOREIGN KEY ([Part_Id]) REFERENCES [dbo].[M_Part] ([Part_Id]),
    CONSTRAINT [FK_Product_Part_M_Product] FOREIGN KEY ([Product_Id]) REFERENCES [dbo].[M_Product] ([Product_Id])
);



