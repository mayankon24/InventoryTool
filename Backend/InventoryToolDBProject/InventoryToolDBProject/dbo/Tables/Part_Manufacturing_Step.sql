CREATE TABLE [dbo].[Part_Manufacturing_Step] (
    [Part_Manufacturing_Step_Id] INT IDENTITY (1, 1) NOT NULL,
    [Part_Id]                    INT NULL,
    [Process_Id]                 INT NULL,
    [Output_Part_Id]             INT NULL,
    [Step_Sequence]              INT NULL,
    CONSTRAINT [PK_Part_Manufacturing_Step] PRIMARY KEY CLUSTERED ([Part_Manufacturing_Step_Id] ASC),
    CONSTRAINT [FK_Part_Manufacturing_Step_M_Part] FOREIGN KEY ([Part_Id]) REFERENCES [dbo].[M_Part] ([Part_Id]),
    CONSTRAINT [FK_Part_Manufacturing_Step_M_Part1] FOREIGN KEY ([Output_Part_Id]) REFERENCES [dbo].[M_Part] ([Part_Id]),
    CONSTRAINT [FK_Part_Manufacturing_Step_M_Process] FOREIGN KEY ([Process_Id]) REFERENCES [dbo].[M_Process] ([Process_Id])
);

