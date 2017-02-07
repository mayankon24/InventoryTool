
create procedure [dbo].[GetAllOutsourceType]

as 

SELECT [Outsource_Type_Id]
      ,[Outsource_Type]
  FROM [dbo].[LK_Outsource_Type]
  where IsActive = 1
  order by Outsource_Type