CREATE TABLE [dbo].[LK_Store] (
    [Store_Id]   INT            IDENTITY (1, 1) NOT NULL,
    [Store_Name] NVARCHAR (100) NULL,
    [IsActive]   BIT            NOT NULL,
    CONSTRAINT [PK_LK_Store] PRIMARY KEY CLUSTERED ([Store_Id] ASC)
);

