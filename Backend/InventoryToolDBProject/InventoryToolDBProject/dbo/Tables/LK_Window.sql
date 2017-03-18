CREATE TABLE [dbo].[LK_Window] (
    [Window_Id]        INT            IDENTITY (1, 1) NOT NULL,
    [Page_Name]        NVARCHAR (100) NULL,
    [Page_Description] NVARCHAR (500) NULL,
    [IsActive]         BIT            NOT NULL,
    CONSTRAINT [PK_M_Window] PRIMARY KEY CLUSTERED ([Window_Id] ASC)
);



