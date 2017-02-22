
--declare @returnStatus INT
--exec UpdatePart -1,4,2,'256','259',1,1,2,5,2,'', @return_Status = @returnStatus output
CREATE PROCEDURE [dbo].[UpdatePart] (
	@Part_Id INT
	,@Part_Type_Id int
	,@Outsource_Type_Id int
	,@Part_Code nvarchar(100)
	,@Part_Name nvarchar(100)
	,@Unit_Id int
	,@Category_Id int
	,@Color_Id int
	,@Material_Id int
	,@Criticality_Id int					
	,@ModifiedBy NVARCHAR(100)
	,@return_Status INT OUTPUT
)
AS
BEGIN TRY
BEGIN TRANSACTION

                
        if exists(select 1 from [M_Part] 
                    where Part_Code = @Part_Code                                             
                                            and isactive = 1 
                                            and @Part_Id <= 0)
                                            SET @return_status = -2

        else if exists (select 1 from [M_Part]  
                    where Part_Code = @Part_Code                                                               
                                            and Isactive = 1 
                                            and @Part_Id > 0
                                            and Part_Id <> @Part_Id)

        SET @return_status = -2

                
        ELSE IF (@Part_Id <= 0)
        BEGIN

			INSERT INTO [dbo].[M_Part]
						([Part_Type_Id]
						,[Outsource_Type_Id]
						,[Part_Code]
						,[Part_Name]
						,[Unit_Id]
						,[Category_Id]
						,[Color_Id]
						,[Material_Id]
						,Criticality_Id
						,[CreatedBy]
						,[CreatedUTCDate]
						,[LastModifiedBy]
						,[LastModifiedUTCDate]
						,[IsActive])
					VALUES
						(@Part_Type_Id
						,@Outsource_Type_Id
						,@Part_Code
						,@Part_Name
						,@Unit_Id
						,@Category_Id
						,@Color_Id
						,@Material_Id
						,@Criticality_Id
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
						UPDATE [dbo].[M_Part]
							SET [Part_Type_Id] = @Part_Type_Id
								,[Outsource_Type_Id] = @Outsource_Type_Id
								,[Part_Code] = @Part_Code
								,[Part_Name] = @Part_Name
								,[Unit_Id] = @Unit_Id
								,[Category_Id] = @Category_Id
								,[Color_Id] = @Color_Id
								,[Material_Id] = @Material_Id
								,Criticality_Id= @Criticality_Id
									 
							WHERE Part_Id = @Part_Id


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
        exec InsertErrorLog null, 'Database', 'UpdatePart', @error_message

END CATCH