
CREATE procedure [dbo].[GetPartByFilter]
(

	@part_Type_Id int
	,@outsource_Type_Id int
	,@part_Code nvarchar(50)
	,@part_Name nvarchar(50)
	,@unit_Id int
	,@category_Id int
	,@color_Id int
	,@material_Id int
	,@criticality_Id int
)
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
       inner join LK_Material M on M.Material_Id = PA.Material_Id and M.IsActive = 1
	   inner join LK_Unit U on U.Unit_Id = PA.Unit_Id and U.IsActive = 1
	   inner join Lk_Category C on C.Category_Id = PA.Category_Id and C.IsActive = 1
	   inner join Lk_Color CO on CO.Color_Id = PA.Color_Id and CO.IsActive = 1
	   inner join LK_Outsource_Type O on O.Outsource_Type_Id = PA.Outsource_Type_Id and O.IsActive = 1
	   inner join LK_Part_Type P on P.Part_Type_Id = PA.Part_Type_Id and P.IsActive = 1
	   inner join LK_Criticality Cl on Cl.Criticality_Id = PA.Criticality_Id and Cl.IsActive = 1
 where PA.isActive = 1      
       and (
              @part_Type_Id IS NULL
              OR PA.part_Type_Id = @part_Type_Id
              )
       AND (
              @outsource_Type_Id IS NULL
              OR PA.outsource_Type_Id = @outsource_Type_Id
              )
       AND (
              @unit_Id IS NULL
              OR PA.unit_Id = @unit_Id
              )  
	  AND (
              @category_Id IS NULL
              OR PA.category_Id = @category_Id
              ) 
	  AND (
              @color_Id IS NULL
              OR PA.color_Id = @color_Id
              ) 
	  AND (
              @material_Id IS NULL
              OR PA.material_Id = @material_Id
              )  
	  AND (
              @criticality_Id IS NULL
              OR PA.criticality_Id = @criticality_Id
              )       
       AND (
              @part_Code IS NULL
              OR part_Code LIKE '%' + @part_Code + '%'                     
              )
		AND (
              @part_Name IS NULL
              OR part_Name LIKE '%' + @part_Name + '%'                     
              )
                       
  order by Part_Name