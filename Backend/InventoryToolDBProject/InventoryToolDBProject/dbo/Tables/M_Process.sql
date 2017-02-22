CREATE TABLE [dbo].[M_Process] (
    [Process_Id]   INT            IDENTITY (1, 1) NOT NULL,
    [Process_Name] NVARCHAR (100) NULL,
    [IsActive]     BIT            NOT NULL,
    CONSTRAINT [PK_M_Process] PRIMARY KEY CLUSTERED ([Process_Id] ASC)
);



