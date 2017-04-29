

CREATE PROCEDURE [dbo].[UpdateImage] (
	@Image_Id INT
	,@Image_Data image					
	,@ModifiedBy NVARCHAR(100)
	,@return_Status INT OUTPUT
)
AS
BEGIN TRY
BEGIN TRANSACTION

        
        IF (@Image_Id <= 0)
        BEGIN

	INSERT INTO [M_Image]
           ([Image_Data]
           ,[CreatedBy]
           ,[CreatedUTCDate]
           ,[LastModifiedBy]
           ,[LastModifiedUTCDate]
           ,[IsActive])
     VALUES
           (@Image_Data
           ,@ModifiedBy
           ,getutcdate()
           ,null
           ,null
           ,1)

                        SET @return_status = 1

                        SELECT SCOPE_IdENTITY() AS Id
        END
        ELSE
           begin
				UPDATE [dbo].[M_Image]
				   SET [Image_Data] = @Image_Data
					  ,[LastModifiedBy] = @ModifiedBy
					  ,[LastModifiedUTCDate] = getutcdate()
					  ,[IsActive] = 1
				 WHERE Image_Id = @Image_Id
        SET @return_status = 2
		select @Image_Id as Id
        end
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
        exec InsertErrorLog null, 'Database', 'UpdateImage', @error_message

END CATCH