
CREATE procedure [dbo].[GetAllPartType]

as 
SELECT [Part_Type_Id]
      ,[Part_Type]     
  FROM LK_Part_Type
  where IsActive = 1
  order by Part_Type