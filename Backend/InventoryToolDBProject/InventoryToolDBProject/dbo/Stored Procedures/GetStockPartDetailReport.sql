--exec GetStockPartDetailReport 2009
CREATE procedure [dbo].[GetStockPartDetailReport]
(
	@Part_Id int
)

as 

SELECT [Part_Stock_Id]
      ,P.Part_Id
	  ,P.Part_Name
	  ,S.Store_Id
	  ,S.Store_Name
	  ,[Date]
      ,[In_Quantity]
      ,[Out_Quantity]
      ,[Action_Guid]
      ,STT.StoreTransferType_Id
	  ,STT.StoreTransferType_Name
      ,[Description]     
  FROM [TX_Part_Stock] PS
  inner join [M_Part] P on  PS.Part_Id = P.Part_Id and P.Part_Id = @Part_Id
  inner join [LK_Store] S on S.Store_Id = PS.Store_Id
  inner join [LK_StoreTransferType] STT on STT.StoreTransferType_Id = PS.StoreTransferType_Id