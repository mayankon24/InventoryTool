
CREATE procedure [dbo].[GetAllPart]

as 
SELECT [Part_Id]
      ,P.Part_Type_Id
	  ,P.Part_Type
      ,O.Outsource_Type_Id
	  ,O.Outsource_Type
      ,[Part_Code]
      ,[Part_Name]
	  ,U.Unit_Id
	  ,U.Unit_Name
      ,C.Category_Id
	  ,C.Category_Name
      ,Co.Color_Id
	  ,Co.Color_Name
      ,M.Material_Id
	  ,M.Material_Name
	  ,Cl.Criticality_Id
	  ,Cl.Criticality_Name
  FROM M_Part PA 
       Left join LK_Material M on M.Material_Id = PA.Material_Id and M.IsActive = 1
	   Left join LK_Unit U on U.Unit_Id = PA.Unit_Id and U.IsActive = 1
	   Left join Lk_Category C on C.Category_Id = PA.Category_Id and C.IsActive = 1
	   Left join Lk_Color CO on CO.Color_Id = PA.Color_Id and CO.IsActive = 1
	   Left join LK_Outsource_Type O on O.Outsource_Type_Id = PA.Outsource_Type_Id and O.IsActive = 1
	   Left join LK_Part_Type P on P.Part_Type_Id = PA.Part_Type_Id and P.IsActive = 1
	   Left join LK_Criticality Cl on Cl.Criticality_Id = PA.Criticality_Id and Cl.IsActive = 1
 where PA.IsActive = 1
  order by Part_Name