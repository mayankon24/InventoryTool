CREATE TABLE [dbo].[LK_Material] (
    [Material_Id]   INT        IDENTITY (1, 1) NOT NULL,
    [Material_Name] NCHAR (10) NULL,
    [IsActive]      BIT        NULL,
    CONSTRAINT [PK_LK_Material] PRIMARY KEY CLUSTERED ([Material_Id] ASC)
);

