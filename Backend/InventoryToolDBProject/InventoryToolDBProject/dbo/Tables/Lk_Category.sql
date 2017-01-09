CREATE TABLE [dbo].[Lk_Category] (
    [Category_Id]   INT            IDENTITY (1, 1) NOT NULL,
    [Category_Name] NVARCHAR (100) NULL,
    [IsActive]      BIT            NULL,
    CONSTRAINT [PK_Lk_Category] PRIMARY KEY CLUSTERED ([Category_Id] ASC)
);

