
CREATE procedure [dbo].[GetAllPart]

as 
SELECT [Part_Id]
      ,[Part_Type_Id]
      ,[Outsource_Type_Id]
      ,[Part_Code]
      ,[Part_Name]
      ,[Category_Id]
      ,[Color_Id]
      ,[Material_Id]     
  FROM [dbo].[M_Part]
  where IsActive = 1
  order by Part_Name