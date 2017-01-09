CREATE TABLE [dbo].[M_Machine] (
    [Machine_Id]   INT            IDENTITY (1, 1) NOT NULL,
    [Machine_Name] NVARCHAR (100) NULL,
    [IsActive]     BIT            NULL,
    CONSTRAINT [PK_M_Machine] PRIMARY KEY CLUSTERED ([Machine_Id] ASC)
);

