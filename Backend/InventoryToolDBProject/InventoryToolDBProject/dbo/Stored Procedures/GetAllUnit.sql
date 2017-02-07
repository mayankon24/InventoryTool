
create procedure [dbo].[GetAllUnit]

as 
SELECT [Unit_Id]
      ,[Unit_Name]     
  FROM [dbo].[LK_Unit]
  where IsActive = 1
  order by Unit_Name