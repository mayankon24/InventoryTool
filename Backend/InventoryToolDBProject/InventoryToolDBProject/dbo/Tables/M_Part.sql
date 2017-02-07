CREATE TABLE [dbo].[M_Part] (
    [Part_Id]             INT            IDENTITY (1, 1) NOT NULL,
    [Part_Type_Id]        INT            NULL,
    [Outsource_Type_Id]   INT            NULL,
    [Part_Code]           NVARCHAR (100) NULL,
    [Part_Name]           NVARCHAR (100) NULL,
    [Unit_Id]             INT            NULL,
    [Category_Id]         INT            NULL,
    [Color_Id]            INT            NULL,
    [Material_Id]         INT            NULL,
    [CreatedBy]           NVARCHAR (100) NULL,
    [CreatedUTCDate]      DATETIME       NULL,
    [LastModifiedBy]      NVARCHAR (100) NULL,
    [LastModifiedUTCDate] DATETIME       NULL,
    [IsActive]            BIT            NULL,
    CONSTRAINT [PK_M_Part] PRIMARY KEY CLUSTERED ([Part_Id] ASC),
    CONSTRAINT [FK_M_Part_Lk_Category] FOREIGN KEY ([Category_Id]) REFERENCES [dbo].[Lk_Category] ([Category_Id]),
    CONSTRAINT [FK_M_Part_Lk_Color] FOREIGN KEY ([Color_Id]) REFERENCES [dbo].[Lk_Color] ([Color_Id]),
    CONSTRAINT [FK_M_Part_LK_Material] FOREIGN KEY ([Material_Id]) REFERENCES [dbo].[LK_Material] ([Material_Id]),
    CONSTRAINT [FK_M_Part_LK_Outsource_Type] FOREIGN KEY ([Outsource_Type_Id]) REFERENCES [dbo].[LK_Outsource_Type] ([Outsource_Type_Id]),
    CONSTRAINT [FK_M_Part_LK_Part_Type] FOREIGN KEY ([Part_Type_Id]) REFERENCES [dbo].[LK_Part_Type] ([Part_Type_Id]),
    CONSTRAINT [FK_M_Part_LK_Unit] FOREIGN KEY ([Unit_Id]) REFERENCES [dbo].[LK_Unit] ([Unit_Id])
);





