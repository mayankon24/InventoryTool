CREATE TABLE [dbo].[LK_Unit] (
    [Unit_Id]   INT            IDENTITY (1, 1) NOT NULL,
    [Unit_Name] NVARCHAR (100) NULL,
    [IsActive]  BIT            NULL,
    CONSTRAINT [PK_LK_Unit] PRIMARY KEY CLUSTERED ([Unit_Id] ASC)
);

