
CREATE FUNCTION [dbo].[GetUserRoleId] 
(
	@User_Name nvarchar(100)
)
RETURNS int
AS
BEGIN
	-- Declare the return variable here
	declare @Role_id int 

select top 1 @Role_id = R.Role_id 
from User_Role UR inner join 
 M_User U on U.user_id = UR.user_id and [User_Name] = @User_Name and UR.isactive = 1 inner join 
 LK_Role R on R.role_id = UR.role_id
order by Role_Priority

return @Role_id

END