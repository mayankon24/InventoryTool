
create procedure [dbo].[GetAllCategory]

as 
SELECT [Category_Id]
      ,[Category_Name]     
  FROM Lk_Category
  where IsActive = 1
  order by Category_Name