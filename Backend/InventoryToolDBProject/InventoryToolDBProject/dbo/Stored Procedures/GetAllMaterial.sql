
create procedure [dbo].[GetAllMaterial]

as 

SELECT [Material_Id]
      ,[Material_Name]   
  FROM [dbo].[LK_Material]
  where IsActive = 1
  order by Material_Name