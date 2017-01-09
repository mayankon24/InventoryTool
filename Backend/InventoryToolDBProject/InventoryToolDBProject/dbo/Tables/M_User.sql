CREATE TABLE [dbo].[M_User] (
    [User_Id]             INT            IDENTITY (1, 1) NOT NULL,
    [User_FirstName]      NVARCHAR (100) NULL,
    [User_LastName]       NVARCHAR (100) NULL,
    [User_DisplayName]    NVARCHAR (100) NULL,
    [User_Name]           NVARCHAR (100) NOT NULL,
    [Password]            NVARCHAR (100) NULL,
    [CreatedBy]           NVARCHAR (100) NULL,
    [CreatedUTCDate]      DATETIME       NULL,
    [LastModifiedBy]      NVARCHAR (100) NULL,
    [LastModifiedUTCDate] DATETIME       NULL,
    [IsActive]            BIT            NOT NULL,
    CONSTRAINT [PK_M_User] PRIMARY KEY CLUSTERED ([User_Id] ASC)
);

