
CREATE procedure [dbo].[GetAllSupplier]

as 
SELECT [Supplier_Id]
      ,[Supplier_Code]
      ,[Supplier_Name]
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
  FROM [M_Supplier]
  where IsActive = 1
  order by Supplier_Name