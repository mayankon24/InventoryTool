CREATE TABLE [dbo].[Machine_Process] (
    [Machine_Process_Id] INT IDENTITY (1, 1) NOT NULL,
    [Machine_Id]         INT NULL,
    [Process_Id]         INT NULL,
    [IsActive]           BIT NOT NULL,
    CONSTRAINT [PK_Machine_Process] PRIMARY KEY CLUSTERED ([Machine_Process_Id] ASC),
    CONSTRAINT [FK_Machine_Process_M_Machine] FOREIGN KEY ([Machine_Id]) REFERENCES [dbo].[M_Machine] ([Machine_Id]),
    CONSTRAINT [FK_Machine_Process_M_Process] FOREIGN KEY ([Process_Id]) REFERENCES [dbo].[M_Process] ([Process_Id])
);



