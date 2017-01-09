CREATE TABLE [dbo].[M_Part_Type] (
    [Part_Type_Id] INT            IDENTITY (1, 1) NOT NULL,
    [Part_Type]    NVARCHAR (100) NULL,
    CONSTRAINT [PK_M_Part_Type] PRIMARY KEY CLUSTERED ([Part_Type_Id] ASC)
);

