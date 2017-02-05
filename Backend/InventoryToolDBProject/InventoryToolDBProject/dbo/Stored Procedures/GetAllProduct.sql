
CREATE procedure [dbo].[GetAllProduct]

as 
SELECT [Product_Id]
      ,[Product_Code]
      ,[Product_Name]
      ,[Manufacturing_Days]
      ,[Description]
  FROM [M_Product]
  where IsActive = 1
  order by Product_Name