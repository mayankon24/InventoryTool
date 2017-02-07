
create procedure [dbo].[GetAllColor]

as 
SELECT [Color_Id]
      ,[Color_Name]     
  FROM [dbo].[Lk_Color]
  where IsActive = 1
  order by Color_Name