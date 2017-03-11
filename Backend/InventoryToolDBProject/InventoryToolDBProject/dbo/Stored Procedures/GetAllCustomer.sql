
CREATE procedure [dbo].[GetAllCustomer]

as 
SELECT [Customer_Id]
      ,[Customer_Code]
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
  FROM [M_Customer]
  where IsActive = 1
  order by Customer_Name