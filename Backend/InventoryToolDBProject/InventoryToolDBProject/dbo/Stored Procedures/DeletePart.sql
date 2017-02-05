
create PROCEDURE [dbo].[DeletePart] (
@Part_Id INT
,@LastModifiedBy nvarchar(100)
,@return_Status  int out
)
AS
BEGIN TRY
       BEGIN TRANSACTION
	   
			UPDATE [dbo].[M_Part]
			   SET LastModifiedBy = @LastModifiedBy
				   ,LastModifiedUTCDate = getutcdate()
				   ,isActive = 0
			 WHERE Part_Id = @Part_Id


       set @return_Status = 3
                  
       COMMIT TRANSACTION
END TRY

BEGIN CATCH
       ROLLBACK TRANSACTION
       set @return_Status = -1

       declare @error_message nvarchar(max)
       SELECT @error_message = 
           'ERROR_NUMBER=' +cast(isnull(ERROR_NUMBER(), '') as nvarchar(10))+ ' || '+
              'ERROR_SEVERITY=' +cast(isnull(ERROR_SEVERITY(), '')as nvarchar(10))+ ' || '+
              'ERROR_STATE=' +cast(isnull(ERROR_STATE(), '')as nvarchar(10))+ ' || '+
              'ERROR_PROCEDURE=' +isnull(ERROR_PROCEDURE(), '')+ ' || '+
              'ERROR_LINE=' +cast(isnull(ERROR_LINE(), '')as nvarchar(10))+ ' || '+
              'ERROR_MESSAGE=' +isnull(ERROR_MESSAGE(), '')+ ' || '         
       exec InsertErrorLog null, 'Database', 'DeletePart', @error_message

END CATCH