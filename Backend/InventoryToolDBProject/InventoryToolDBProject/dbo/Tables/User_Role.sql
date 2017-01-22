CREATE TABLE [dbo].[User_Role] (
    [User_Role_Id]        INT            IDENTITY (1, 1) NOT NULL,
    [User_Id]             INT            NOT NULL,
    [Role_Id]             INT            NOT NULL,
    [CreatedBy]           NVARCHAR (100) NULL,
    [CreatedUTCDate]      DATETIME       NULL,
    [LastModifiedBy]      NVARCHAR (100) NULL,
    [LastModifiedUTCDate] DATETIME       NULL,
    [IsActive]            BIT            NOT NULL,
    CONSTRAINT [PK_User_Role] PRIMARY KEY CLUSTERED ([User_Role_Id] ASC),
    CONSTRAINT [FK_User_Role_M_Role] FOREIGN KEY ([Role_Id]) REFERENCES [dbo].[LK_Role] ([Role_Id]),
    CONSTRAINT [FK_User_Role_M_User] FOREIGN KEY ([User_Id]) REFERENCES [dbo].[M_User] ([User_Id])
);



