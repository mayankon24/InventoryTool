
--declare @returnStatus INT
--exec UpdatePart -1,4,2,'256','259',1,1,2,5,2,'', @return_Status = @returnStatus output
CREATE PROCEDURE [dbo].[UpdatePartStock] (
    @PartQuantity udt_PartQuantity readonly
	,@FromStore_Id int
	,@ToStore_Id int
	,@Date datetime
	,@StoreTransferType_Id int	
	,@Description nvarchar(500)					
	,@ModifiedBy NVARCHAR(100)
	,@return_Status INT OUTPUT
)
AS
BEGIN TRY
BEGIN TRANSACTION


DECLARE @Action_Guid uniqueidentifier = newid()  
CREATE TABLE #temp(	
	[Part_Id] [int] NULL,
	[Store_Id] [int] NULL,
	[In_Quantity] [int] NULL,
	[Out_Quantity] [int] NULL	
	)


if(	@StoreTransferType_Id = 3)
begin

insert into #temp 
			(Part_Id
			, Store_Id
			, In_Quantity
			, Out_Quantity
			)	
	 select PQ.Part_Id
			   ,@FromStore_Id as Store_Id			 
			   ,null as In_Quantity
			   ,PQ.Quantity as Out_Quantity
	  from @PartQuantity PQ

	insert into #temp 
			(Part_Id
			, Store_Id
			, In_Quantity
			, Out_Quantity
			)	
	 select PQ.Part_Id
			   ,@ToStore_Id as Store_Id		 
			   ,PQ.Quantity  as In_Quantity
			   ,null as Out_Quantity
	  from @PartQuantity PQ

	  
end
else
begin
	insert into #temp 
			(Part_Id
			, Store_Id
			, In_Quantity
			, Out_Quantity
			)	
	 select PQ.Part_Id
			   ,@FromStore_Id as Store_Id			  
			   ,case when @StoreTransferType_Id = 1 then PQ.Quantity else null end as In_Quantity
			   ,case when @StoreTransferType_Id = 2 then PQ.Quantity else null end as Out_Quantity
	  from @PartQuantity PQ

end
	INSERT INTO [dbo].[TX_Part_Stock]
           ([Part_Id]
           ,[Store_Id]
           ,[Date]
           ,[In_Quantity]
           ,[Out_Quantity]
		   ,[Action_Guid]
		   ,[Is_Transfer]
           ,[Description]
           ,[CreatedBy]
           ,[CreatedUTCDate]
           ,[LastModifiedBy]
           ,[LastModifiedUTCDate]
           ,[IsActive])

     select temp.Part_Id
			,temp.Store_Id
			,@Date as Date
			,temp.In_Quantity
			,temp.Out_Quantity
			,@Action_Guid
			,case when @StoreTransferType_Id = 3 then 1 else 0 end as Is_Transfer
			,@Description as Description
			,@ModifiedBy as CreatedBy
			,getutcdate() as CreatedUTCDate
			,null as LastModifiedBy
			,null as LastModifiedUTCDate
			,1 as IsActive
      from #temp temp
       
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