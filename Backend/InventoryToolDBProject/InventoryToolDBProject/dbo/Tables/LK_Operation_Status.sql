CREATE TABLE [dbo].[LK_Operation_Status] (
    [Operation_Status_Id] INT             IDENTITY (1, 1) NOT NULL,
    [Status_Name]         NVARCHAR (100)  NULL,
    [Status_Code]         INT             NULL,
    [Status_Message]      NVARCHAR (1000) NULL,
    [CreatedBy]           NVARCHAR (100)  NULL,
    [CreatedUTCDate]      DATETIME        CONSTRAINT [DF_LK_Operation_Status_CreatedUTCDate] DEFAULT (getdate()) NULL,
    [LastModifiedBy]      NVARCHAR (100)  NULL,
    [LastModifiedUTCDate] DATETIME        CONSTRAINT [DF_LK_Operation_Status_LastModifiedUTCDate] DEFAULT (getdate()) NULL,
    [IsActive]            BIT             NOT NULL,
    CONSTRAINT [PK_Lk_Operation_Status] PRIMARY KEY CLUSTERED ([Operation_Status_Id] ASC)
);

