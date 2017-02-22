CREATE TABLE [dbo].[LK_Criticality] (
    [Criticality_Id]   INT            IDENTITY (1, 1) NOT NULL,
    [Criticality_Name] NVARCHAR (100) NULL,
    [IsActive]         BIT            NOT NULL,
    CONSTRAINT [PK_LK_Criticality] PRIMARY KEY CLUSTERED ([Criticality_Id] ASC)
);

