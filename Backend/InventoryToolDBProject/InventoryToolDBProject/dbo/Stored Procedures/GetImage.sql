
create procedure [dbo].[GetImage]
(
	@Image_Id int
)
AS


SELECT [Image_Id]
      ,[Image_Data]
  FROM [dbo].[M_Image]
  where IsActive = 1
  and Image_Id = @Image_Id