CREATE TABLE [dbo].[LK_Outsource_Type] (
    [Outsource_Type_Id] INT            IDENTITY (1, 1) NOT NULL,
    [Outsource_Type]    NVARCHAR (100) NULL,
    [IsActive]          BIT            NULL,
    CONSTRAINT [PK_LK_Outsource_Type] PRIMARY KEY CLUSTERED ([Outsource_Type_Id] ASC)
);



