

create PROCEDURE [dbo].[InsertErrorLog] (
                @Window_Id INT  
                ,@Source NVARCHAR(100)
                ,@Source_Detail NVARCHAR(1000)
                ,@Error_description nvarchar(max)         
                )
AS


INSERT INTO [dbo].[ErrorLog]
           ([Window_Id]
           ,[Source]
           ,[Source_Detail]
           ,[Error_description]
           ,[Inserted_Date])
     VALUES
           (@Window_Id
           ,@Source
           ,@Source_Detail
           ,@Error_description
           ,getutcdate())