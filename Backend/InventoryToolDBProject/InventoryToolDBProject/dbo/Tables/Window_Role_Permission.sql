CREATE TABLE [dbo].[Window_Role_Permission] (
    [Window_Id]           INT            NOT NULL,
    [Role_Id]             INT            NOT NULL,
    [CanView]             BIT            NULL,
    [CanAdd]              BIT            NULL,
    [CanUpdate]           BIT            NULL,
    [CanDelete]           BIT            NULL,
    [CanPrint]            BIT            NULL,
    [CanDownload]         BIT            NULL,
    [CanUpload]           BIT            NULL,
    [CreatedBy]           NVARCHAR (100) NULL,
    [CreatedUTCDate]      DATETIME       NULL,
    [LastModifiedBy]      NVARCHAR (100) NULL,
    [LastModifiedUTCDate] DATETIME       NULL,
    [IsActive]            BIT            NULL,
    CONSTRAINT [PK_Window_Role_Permission] PRIMARY KEY CLUSTERED ([Window_Id] ASC, [Role_Id] ASC),
    CONSTRAINT [FK_Window_Role_Permission_M_Role] FOREIGN KEY ([Role_Id]) REFERENCES [dbo].[LK_Role] ([Role_Id]),
    CONSTRAINT [FK_Window_Role_Permission_M_Window] FOREIGN KEY ([Window_Id]) REFERENCES [dbo].[LK_Window] ([Window_Id])
);



