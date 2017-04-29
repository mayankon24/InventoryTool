CREATE TABLE [dbo].[M_Image] (
    [Image_Id]            INT            IDENTITY (1, 1) NOT NULL,
    [Image_Data]          IMAGE          NULL,
    [CreatedBy]           NVARCHAR (100) NULL,
    [CreatedUTCDate]      DATETIME       NULL,
    [LastModifiedBy]      NVARCHAR (100) NULL,
    [LastModifiedUTCDate] DATETIME       NULL,
    [IsActive]            BIT            NOT NULL,
    CONSTRAINT [PK_M_Image] PRIMARY KEY CLUSTERED ([Image_Id] ASC)
);

