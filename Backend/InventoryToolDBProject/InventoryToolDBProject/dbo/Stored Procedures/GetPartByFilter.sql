
--exec GetPartByFilter null, null, null, null, null, null, null, null, null
CREATE procedure [dbo].[GetPartByFilter]
(

	@Part_Type_Id int
	,@Outsource_Type_Id int
	,@Part_Code nvarchar(50)
	,@Part_Name nvarchar(50)
	,@Unit_Id int
	,@Category_Id int
	,@Color_Id int
	,@Material_Id int
	,@Criticality_Id int
)
as 
SET FMTONLY OFF

select val
,seq
into #PartCode
from dbo.f_split(@Part_Code, ',')



SELECT [Part_Id]
      ,isnull(Image_Id,0) as Image_Id
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
	  Into #Part
  FROM M_Part PA 
       left join LK_Material M on M.Material_Id = PA.Material_Id and M.IsActive = 1
	   left join LK_Unit U on U.Unit_Id = PA.Unit_Id and U.IsActive = 1
	   left join Lk_Category C on C.Category_Id = PA.Category_Id and C.IsActive = 1
	   left join Lk_Color CO on CO.Color_Id = PA.Color_Id and CO.IsActive = 1
	   left join LK_Outsource_Type O on O.Outsource_Type_Id = PA.Outsource_Type_Id and O.IsActive = 1
	   left join LK_Part_Type P on P.Part_Type_Id = PA.Part_Type_Id and P.IsActive = 1
	   left join LK_Criticality Cl on Cl.Criticality_Id = PA.Criticality_Id and Cl.IsActive = 1
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
              OR part_Code in( select val from #PartCode )                     
              )
		AND (
              @part_Name IS NULL
              OR part_Name LIKE '%' + @part_Name + '%'                     
              )                       
  order by Part_Name


  select P.*
  ,isnull(temp.Balance_Quantity ,0) as Balance_Quantity 
  from #Part P
  left join 
  (
	  select Part_Id
	  ,(sum(isnull(In_Quantity,0)) - sum(isnull(Out_Quantity,0))) as Balance_Quantity  
	  from TX_Part_Stock
	  group by Part_Id
  ) temp 
  on P.Part_Id = temp.Part_Id

  --drop table #PartCode
  --drop table #Part