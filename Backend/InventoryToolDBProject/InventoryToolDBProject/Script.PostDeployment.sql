/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

SET IDENTITY_INSERT [dbo].[Lk_Category] ON 

GO
INSERT [dbo].[Lk_Category] ([Category_Id], [Category_Name], [IsActive]) VALUES (1, N'Final', 1)
GO
SET IDENTITY_INSERT [dbo].[Lk_Category] OFF
GO
SET IDENTITY_INSERT [dbo].[Lk_Color] ON 

GO
INSERT [dbo].[Lk_Color] ([Color_Id], [Color_Name], [IsActive]) VALUES (1, N'Red', 1)
GO
INSERT [dbo].[Lk_Color] ([Color_Id], [Color_Name], [IsActive]) VALUES (2, N'Blue', 1)
GO
INSERT [dbo].[Lk_Color] ([Color_Id], [Color_Name], [IsActive]) VALUES (3, N'Green', 1)
GO
INSERT [dbo].[Lk_Color] ([Color_Id], [Color_Name], [IsActive]) VALUES (4, N'Yellow', 1)
GO
SET IDENTITY_INSERT [dbo].[Lk_Color] OFF
GO
SET IDENTITY_INSERT [dbo].[LK_Material] ON 

GO
INSERT [dbo].[LK_Material] ([Material_Id], [Material_Name], [IsActive]) VALUES (1, N'Copper    ', 1)
GO
INSERT [dbo].[LK_Material] ([Material_Id], [Material_Name], [IsActive]) VALUES (2, N'Iron      ', 1)
GO
INSERT [dbo].[LK_Material] ([Material_Id], [Material_Name], [IsActive]) VALUES (3, N'Brass     ', 1)
GO
INSERT [dbo].[LK_Material] ([Material_Id], [Material_Name], [IsActive]) VALUES (4, N'SS        ', 1)
GO
INSERT [dbo].[LK_Material] ([Material_Id], [Material_Name], [IsActive]) VALUES (5, N'Aluminium ', 1)
GO
SET IDENTITY_INSERT [dbo].[LK_Material] OFF
GO
SET IDENTITY_INSERT [dbo].[LK_Outsource_Type] ON 

GO
INSERT [dbo].[LK_Outsource_Type] ([Outsource_Type_Id], [Outsource_Type], [IsActive]) VALUES (1, N'Outsource', 1)
GO
INSERT [dbo].[LK_Outsource_Type] ([Outsource_Type_Id], [Outsource_Type], [IsActive]) VALUES (2, N'In House', 1)
GO
INSERT [dbo].[LK_Outsource_Type] ([Outsource_Type_Id], [Outsource_Type], [IsActive]) VALUES (3, N'In House/Outsource', 1)
GO
SET IDENTITY_INSERT [dbo].[LK_Outsource_Type] OFF
GO
SET IDENTITY_INSERT [dbo].[LK_Part_Type] ON 

GO
INSERT [dbo].[LK_Part_Type] ([Part_Type_Id], [Part_Type], [IsActive]) VALUES (1, N'Part', 1)
GO
INSERT [dbo].[LK_Part_Type] ([Part_Type_Id], [Part_Type], [IsActive]) VALUES (2, N'Assembly', 1)
GO
INSERT [dbo].[LK_Part_Type] ([Part_Type_Id], [Part_Type], [IsActive]) VALUES (3, N'Row Material', 1)
GO
INSERT [dbo].[LK_Part_Type] ([Part_Type_Id], [Part_Type], [IsActive]) VALUES (4, N'Service', 1)
GO
SET IDENTITY_INSERT [dbo].[LK_Part_Type] OFF
GO
SET IDENTITY_INSERT [dbo].[LK_Unit] ON 

GO
INSERT [dbo].[LK_Unit] ([Unit_Id], [Unit_Name], [IsActive]) VALUES (1, N'Kg', 1)
GO
INSERT [dbo].[LK_Unit] ([Unit_Id], [Unit_Name], [IsActive]) VALUES (2, N'Pics', 1)
GO
SET IDENTITY_INSERT [dbo].[LK_Unit] OFF
GO

