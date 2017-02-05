

CREATE PROCEDURE [dbo].[UpdateProduct] (
					@Product_Id INT
					,@Product_Code nvarchar(100)
					,@Product_Name nvarchar(100)
					,@Manufacturing_Days int
					,@Description nvarchar(1000)
					,@ModifiedBy NVARCHAR(100)
					,@return_Status INT OUTPUT
                )
AS
BEGIN TRY
                BEGIN TRANSACTION

                
                if exists(select 1 from [M_Product] 
                          where Product_Code = @Product_Code                                             
                                                  and isactive = 1 
                                                  and @Product_Id <= 0)
                                                  SET @return_status = -2

                else if exists (select 1 from [M_Product]  
                          where Product_Code = @Product_Code                                                               
                                                  and isactive = 1 
                                                  and @Product_Id > 0
                                                  and Product_Id <> @Product_Id)

                SET @return_status = -2

                
                ELSE IF (@Product_Id <= 0)
                BEGIN
                                
						INSERT INTO [dbo].[M_Product]
								   ([Product_Code]
								   ,[Product_Name]
								   ,[Manufacturing_Days]
								   ,[Description]
								   ,[CreatedBy]
								   ,[CreatedUTCDate]
								   ,[LastModifiedBy]
								   ,[LastModifiedUTCDate]
								   ,[IsActive])
							 VALUES
								   (@Product_Code
								   ,@Product_Name
								   ,@Manufacturing_Days
								   ,@Description
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
                                UPDATE [dbo].[M_Product]
								SET [Product_Code] = @Product_Code
									,[Product_Name] = @Product_Name
									,[Manufacturing_Days] = @Manufacturing_Days
									,[Description] = @Description
									,[LastModifiedBy] = @ModifiedBy
									,[LastModifiedUTCDate] = getutcdate()
									
								WHERE Product_Id = @Product_Id

                SET @return_status = 2
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
                exec InsertErrorLog null, 'Database', 'UpdateProduct', @error_message

END CATCH