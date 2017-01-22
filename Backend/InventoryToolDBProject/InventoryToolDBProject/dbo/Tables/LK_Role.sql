CREATE TABLE [dbo].[LK_Role] (
    [Role_Id]             INT            IDENTITY (1, 1) NOT NULL,
    [User_Role]           NVARCHAR (100) NOT NULL,
    [RoleDescription]     NVARCHAR (500) NULL,
    [Role_Priority]       INT            NULL,
    [CreatedBy]           NVARCHAR (100) NULL,
    [CreatedUTCDate]      DATETIME       NULL,
    [LastModifiedBy]      NVARCHAR (100) NULL,
    [LastModifiedUTCDate] DATETIME       NULL,
    [IsActive]            BIT            NOT NULL,
    CONSTRAINT [PK_M_Role] PRIMARY KEY CLUSTERED ([Role_Id] ASC)
);

