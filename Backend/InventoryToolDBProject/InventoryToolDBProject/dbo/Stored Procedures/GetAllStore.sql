
create procedure [dbo].[GetAllStore]

as 
SELECT [Store_Id]
      ,[Store_Name]    
  FROM [dbo].[LK_Store]
  where IsActive = 1
  order by Store_Name