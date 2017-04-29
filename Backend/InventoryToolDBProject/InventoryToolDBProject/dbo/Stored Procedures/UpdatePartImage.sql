
--declare @return_Status int
--exec UpdatePartImage 3013, null, 'mayank', @return_Status output
CREATE PROCEDURE [dbo].[UpdatePartImage] (
	 @Part_Id int
	,@Image_Data image					
	,@ModifiedBy NVARCHAR(100)
	,@return_Status INT OUTPUT
)
AS
BEGIN TRY
BEGIN TRANSACTION

	  declare @Image_Id int
      declare @tblImage table 
	  (
		  Image_Id int
	  )
	  select @Image_Id = isnull(Image_Id, 0) from M_Part where Part_Id = @Part_Id

	  insert into @tblImage
	  exec UpdateImage @Image_Id, @Image_Data, @ModifiedBy, @return_Status output
	    
		
		select * from @tblImage


        UPDATE [dbo].[M_Part]
				   SET Image_Id = (select top 1 Image_Id from @tblImage)
				 WHERE Part_Id = @Part_Id


        SET @return_status = 2
       
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
        exec InsertErrorLog null, 'Database', 'UpdatePartImage', @error_message

END CATCH