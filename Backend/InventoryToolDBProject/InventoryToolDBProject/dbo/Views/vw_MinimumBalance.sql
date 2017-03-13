
--select * from vw_MinimumBalance
CREATE VIEW [dbo].[vw_MinimumBalance]
AS
   


 select *
 from
	  (select P.*
	  ,isnull(temp.Balance_Quantity ,0) as Balance_Quantity 
	  from (
				SELECT [Part_Id]
					  ,isnull(Min_Quantity,0) as Min_Quantity
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
					   left join LK_Material M on M.Material_Id = PA.Material_Id and M.IsActive = 1
					   left join LK_Unit U on U.Unit_Id = PA.Unit_Id and U.IsActive = 1
					   left join Lk_Category C on C.Category_Id = PA.Category_Id and C.IsActive = 1
					   left join Lk_Color CO on CO.Color_Id = PA.Color_Id and CO.IsActive = 1
					   left join LK_Outsource_Type O on O.Outsource_Type_Id = PA.Outsource_Type_Id and O.IsActive = 1
					   left join LK_Part_Type P on P.Part_Type_Id = PA.Part_Type_Id and P.IsActive = 1
					   left join LK_Criticality Cl on Cl.Criticality_Id = PA.Criticality_Id and Cl.IsActive = 1
				 where PA.isActive = 1 
	  ) P
	  left join 
	  (
		  select Part_Id
		  ,(sum(isnull(In_Quantity,0)) - sum(isnull(Out_Quantity,0))) as Balance_Quantity  
		  from TX_Part_Stock
		  group by Part_Id
	  ) temp 
	  on P.Part_Id = temp.Part_Id
  )temp1
  where Balance_Quantity <= Min_Quantity
GO
EXECUTE sp_addextendedproperty @name = N'MS_DiagramPaneCount', @value = 1, @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'VIEW', @level1name = N'vw_MinimumBalance';


GO
EXECUTE sp_addextendedproperty @name = N'MS_DiagramPane1', @value = N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Lk_Color"
            Begin Extent = 
               Top = 7
               Left = 48
               Bottom = 148
               Right = 242
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'VIEW', @level1name = N'vw_MinimumBalance';

