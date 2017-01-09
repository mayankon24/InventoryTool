CREATE TABLE [dbo].[Row_Material_Item] (
    [Row_Material_Item_Id] INT             IDENTITY (1, 1) NOT NULL,
    [Item_Name]            NVARCHAR (MAX)  NULL,
    [Category_Id]          INT             NULL,
    [Color_Id]             INT             NULL,
    [Weight]               DECIMAL (18, 2) NULL,
    [Unit_Id]              INT             NULL,
    [Material_Id]          INT             NULL,
    [Dimension]            NVARCHAR (100)  NULL,
    [Brand_Name]           NVARCHAR (100)  NULL,
    [Item_Description]     NCHAR (10)      NULL,
    [IsActive]             BIT             NULL,
    CONSTRAINT [PK_Row_Material_Item] PRIMARY KEY CLUSTERED ([Row_Material_Item_Id] ASC),
    CONSTRAINT [FK_Row_Material_Item_Lk_Category] FOREIGN KEY ([Category_Id]) REFERENCES [dbo].[Lk_Category] ([Category_Id]),
    CONSTRAINT [FK_Row_Material_Item_Lk_Color] FOREIGN KEY ([Color_Id]) REFERENCES [dbo].[Lk_Color] ([Color_Id]),
    CONSTRAINT [FK_Row_Material_Item_LK_Material] FOREIGN KEY ([Material_Id]) REFERENCES [dbo].[LK_Material] ([Material_Id]),
    CONSTRAINT [FK_Row_Material_Item_LK_Unit] FOREIGN KEY ([Unit_Id]) REFERENCES [dbo].[LK_Unit] ([Unit_Id])
);

