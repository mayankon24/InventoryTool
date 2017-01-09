CREATE TABLE [dbo].[Lk_Color] (
    [Color_Id]   INT           IDENTITY (1, 1) NOT NULL,
    [Color_Name] NVARCHAR (50) NULL,
    [IsActive]   BIT           NULL,
    CONSTRAINT [PK_Lk_Color] PRIMARY KEY CLUSTERED ([Color_Id] ASC)
);

