

CREATE PROCEDURE [dbo].[UpdateCustomer] (
					@Customer_Id INT
					,@Customer_Code nvarchar(100)
					,@Customer_Name nvarchar(100)
					,@Contact_No nvarchar(100)
					,@Email nvarchar(100)
					,@Address1 nvarchar(100) 
					,@Address2 nvarchar(100)
					,@City nvarchar(100) 
					,@State nvarchar(100)
					,@PinCode nvarchar(15) 
					,@TinNo nvarchar(15) 
					,@VatNo nvarchar(15) 
					,@Note nvarchar(1000)
					,@ModifiedBy NVARCHAR(100)
					,@return_Status INT OUTPUT
                )
AS
BEGIN TRY
                BEGIN TRANSACTION

                
                if exists(select 1 from [M_Customer] 
                          where Customer_Code = @Customer_Code                                             
                                                  and isactive = 1 
                                                  and @Customer_Id <= 0)
                                                  SET @return_status = -2

                else if exists (select 1 from [M_Customer]  
                          where Customer_Code = @Customer_Code                                                               
                                                  and isactive = 1 
                                                  and @Customer_Id > 0
                                                  and Customer_Id <> @Customer_Id)

                SET @return_status = -2

                
                ELSE IF (@Customer_Id <= 0)
                BEGIN
                                
						INSERT INTO [dbo].[M_Customer]
								   ([Customer_Code]
								   ,[Customer_Name]
								   ,[Contact_No]
								   ,[Email] 
									,[Address1] 
									,[Address2] 
									,[City] 
									,[State] 
									,[PinCode] 
									,[TinNo] 
									,[VatNo] 
									,[Note] 
								   ,[CreatedBy]
								   ,[CreatedUTCDate]
								   ,[LastModifiedBy]
								   ,[LastModifiedUTCDate]
								   ,[IsActive])
							 VALUES
								   (@Customer_Code
								   ,@Customer_Name
								    ,@Contact_No
								    ,@Email
									,@Address1
									,@Address2
									,@City
									,@State
									,@PinCode 
									,@TinNo
									,@VatNo
									,@Note
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
                                UPDATE [dbo].[M_Customer]
								SET [Customer_Code] = @Customer_Code
									,[Customer_Name] = @Customer_Name
									,[Contact_No] = @Contact_No
									,[Email] = @Email
									,[Address1] = @Address1
									,[Address2] = @Address2
									,[City] =@City
									,[State] =@State
									,[PinCode] =@PinCode
									,[TinNo] =@TinNo
									,[VatNo] =@VatNo
									,[Note] =@Note
									,[LastModifiedBy] = @ModifiedBy
									,[LastModifiedUTCDate] = getutcdate()
									
								WHERE Customer_Id = @Customer_Id

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
                exec InsertErrorLog null, 'Database', 'UpdateCustomer', @error_message

END CATCH