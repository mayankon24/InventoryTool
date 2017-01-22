CREATE TABLE [dbo].[ErrorLog] (
    [ErrorLog_Id]       BIGINT          IDENTITY (1, 1) NOT NULL,
    [Window_Id]         INT             NULL,
    [Source]            NVARCHAR (100)  NULL,
    [Source_Detail]     NVARCHAR (1000) NULL,
    [Error_description] NVARCHAR (MAX)  NULL,
    [Inserted_Date]     DATETIME        NULL,
    CONSTRAINT [PK_Error] PRIMARY KEY CLUSTERED ([ErrorLog_Id] ASC)
);

