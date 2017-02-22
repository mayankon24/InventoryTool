
create procedure [dbo].[GetAllCriticality]

as 
SELECT [Criticality_Id]
      ,[Criticality_Name]     
  FROM [dbo].[LK_Criticality]
  where IsActive = 1
  order by Criticality_Name