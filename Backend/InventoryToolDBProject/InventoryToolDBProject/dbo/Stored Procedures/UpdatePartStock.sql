
--declare @returnStatus INT
--exec UpdatePart -1,4,2,'256','259',1,1,2,5,2,'', @return_Status = @returnStatus output
create PROCEDURE [dbo].[UpdatePartStock] (
	@Part_Id INT
	,@Store_Id int
	,@Date datetime
	,@In_Quantity int
	,@Out_Quantity int
	,@Description nvarchar(500)					
	,@ModifiedBy NVARCHAR(100)
	,@return_Status INT OUTPUT
)
AS
BEGIN TRY
BEGIN TRANSACTION

       INSERT INTO [dbo].[TX_Part_Stock]
           ([Part_Id]
           ,[Store_Id]
           ,[Date]
           ,[In_Quantity]
           ,[Out_Quantity]
           ,[Description]
           ,[CreatedBy]
           ,[CreatedUTCDate]
           ,[LastModifiedBy]
           ,[LastModifiedUTCDate]
           ,[IsActive])
     VALUES
           (@Part_Id
           ,@Store_Id
           ,@Date
           ,@In_Quantity
           ,@Out_Quantity
           ,@Description
           ,@ModifiedBy
           ,getutcdate()
           ,null
           ,null
           ,1)         
       
	      SET @return_status = 1
        COMMIT TRANSACTION
END TRY

BEGIN CATCH
        ROLLBACK TRANSACTION

        SET @return_status = - 1

        declare @error_message nvarchar(max)
        SELECT @error_message = 
            'ERROR_NUMBER=' +cast(isnull(ERROR_NUMBER(), '') as nvarchar(10))+ ' || '+
                        'ERROR_SEVERITY=' +cast(isnull(ERROR_SEVERITY(), '')as nvarchar(10))+ ' || '+
                        'ERROR_STATE=' +cast(isnull(ERROR_STATE(), '')as nvarchar(10))+ ' || '+
                        'ERROR_PROCEDURE=' +isnull(ERROR_PROCEDURE(), '')+ ' || '+
                        'ERROR_LINE=' +cast(isnull(ERROR_LINE(), '')as nvarchar(10))+ ' || '+
                        'ERROR_MESSAGE=' +isnull(ERROR_MESSAGE(), '')+ ' || '                                
        exec InsertErrorLog null, 'Database', 'UpdatePartStock', @error_message

END CATCH