
--[dbo].[GetUserPermission] 'mayank_aggarwal'
CREATE procedure [dbo].[GetUserPermission] 
(
	@User_Name nvarchar(100)
)

as


declare @Role_Id int
set @Role_Id = dbo.GetUserRoleId(@User_Name )

select 
@User_Name User_Name
,Window_Id
,@Role_Id as Role_Id
,cast(sum(cast( CanView as int)) as bit) as CanView
,cast(sum(cast( CanAdd as int)) as bit) as CanAdd
,cast(sum(cast( CanUpdate as int)) as bit) as CanUpdate
,cast(sum(cast( CanDelete as int)) as bit) as CanDelete
,cast(sum(cast( CanPrint as int)) as bit) as CanPrint
,cast(sum(cast( CanDownload as int)) as bit) as CanDownload
,cast(sum(cast( CanUpload as int)) as bit) as CanUpload
from [dbo].[Window_Role_Permission]
where Role_id in (@Role_Id)
group by Window_Id