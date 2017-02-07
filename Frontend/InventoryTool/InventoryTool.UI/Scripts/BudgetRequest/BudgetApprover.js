var budgetapproverjs = {
    init: function () {
        var obj = budgetapproverjs;
        obj.LoadBudgetApprover();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadBudgetApprover: function () {
        //initial load the Datatable setting.
        budgetapproverjs.ReinitiateDataTable('tblbudgetApproverList');
        $("#UserId").hide();
        $('#BudgetLines').collapse("show");

        budgetapproverjs.UserAliasOnChangeHandler();
        var Group = document.getElementById("ddlGroup").options[1].text;
        budgetapproverjs.StatusDropDown();
        budgetapproverjs.FilterSummary(Group);
        //  budgetapproverjs.GetBudgetSummary();

        //Handle the Group dropdown change event.
        $('#ddlGroup').on('change', function () {
            var selected, params = [];
            selected = $(this).find("option:selected").val();
            params.Group_Id = selected;
            params.beforeSend = budgetapproverjs.TeambeforeSend;
            params.complete = budgetapproverjs.TeamComplete;
            params.success = budgetapproverjs.TeamSuccess
            commonjs.fn_GetTeam(params);

        });

        //Handle the Team dropdown change event.
        $('#ddlTeam').on('change', function () {
            var selected, params = [];
            selected = $(this).find("option:selected").val();
            if ((selected == "") || (selected == "0")) {
                selected = -1;
            }
            params.Team_Id = selected;
            params.beforeSend = budgetapproverjs.ProjectbeforeSend;
            params.complete = budgetapproverjs.ProjectComplete;
            params.success = budgetapproverjs.ProjectSuccess
            commonjs.fn_GetProject(params);
        });

        //Handle the Project dropdown change event.
        $('#ddlProject').on('change', function () {

            var selected, params = [];
            selected = $(this).find("option:selected").val();
            if ((selected == "") || (selected == "0")) {
                selected = -1;
            }
            params.Project_Id = selected;
            params.beforeSend = budgetapproverjs.SubProjectbeforeSend;
            params.complete = budgetapproverjs.SubProjectComplete;
            params.success = budgetapproverjs.SubProjectSuccess
            commonjs.fn_GetSubProject(params);
        });

        //Handle the Find Filter Summary click event.
        $('#btnFindBudgetSummary').on('click', function () {
            Group = $("#ddlGroup").find("option:selected").text();
            budgetapproverjs.FilterSummary(Group);
            //Hide the Approval Panel.
            $("#ApprovalWorkFlow").hide();


        });


        //handles delete functionality for budget request
        $("#gridview").on("click", ".clsDeletebudgetsummary", function () {
            var data, BudgetRequest_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this budget request?');
            if (promptdelete) {
                data = $(this).parents('tr');
                BudgetRequest_Id = $(data).attr('data-BudgetRequest_Id');
                urlPath = "/BudgetApprover/DeleteBudgetRequest";
                if (BudgetRequest_Id != '') {
                     $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            BudgetRequest_Id: BudgetRequest_Id
                        },
                        beforeSend: function () {
                            Common.showDialog.show('Please wait....', {
                                dialogSize: 'sm',
                                progressType: 'warning'
                            });
                        },
                        complete: function () {
                            Common.showDialog.hide();
                        },
                        success: function (result) {
                            if (result.operationstatuscode == 3) {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySummaryMessages', result.messagedata, true, 'alert alert-success');
                                budgetapproverjs.fn_ReloadSummaryGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySummaryMessages', result.messagedata, true, 'alert alert-danger');
                            }
                            //scrolling to success message
                            location.hash = '#Summary';
                        },
                        error: function (ex) {
                            alert(ex.responseText);
                        }
                    });
                }

            }
        });

        //handle the ddlCategoryApprove change event in Approval panel.
        $("#ddlCategoryApprove").on("change", function () {
            var row, data, selected, BudgetRequest_Id, Approval_Level_Id;
            row = $("#gridview").find("#tblbudgetApproverList").find("tr.selected");
            data = $(row);
            selected = $(this).find("option:selected").val();
            BudgetRequest_Id = $(data).attr("data-BudgetRequest_Id");
            Approval_Level_Id = $("#ddlApprovalLevels").find("option:selected").val();
            budgetapproverjs.fn_TotalOriginalAsk(BudgetRequest_Id, selected, Approval_Level_Id);

        });

        //handle the ddlApprovalLevels change event in Approval panel.
        $("#ddlApprovalLevels").on("change", function () {
            var row, data, BudgetRequest_Id, Approval_Level_Id,
                Approval_Level_text, Group, Team, Project, Sub_Project,
                Line_Item, Category_Id;
            row = $("#gridview").find("#tblbudgetApproverList").find("tr.selected");
            data = $(row);
            Approval_Level_Id = $(this).find("option:selected").val();
            Approval_Level_text = $(this).find("option:selected").text();
            if (Approval_Level_Id == "") {
                Approval_Level_Id = 0;
            }
            Category_Id = $("#ddlCategoryApprove").find("option:selected").val();
            BudgetRequest_Id = $(data).attr("data-BudgetRequest_Id");
            Group = $(data).attr("data-Group_name");
            Team = $(data).attr("data-Team_Name");
            Project = $(data).attr("data-Project_Name");
            Sub_Project = $(data).attr("data-Sub_Project_Name");
            Line_Item = $(data).attr("data-Line_item_Description");
            $("#divAmount").hide();
            $('#HideOR').hide();
            if (Approval_Level_Id > 0) {
                $("#levellabel").text(Approval_Level_text);
                if (Approval_Level_Id == 5) {
                    $("#leveltext").val(Group);
                }
                else if (Approval_Level_Id == 4) {
                    $("#leveltext").val(Team);
                }
                else if (Approval_Level_Id == 3) {
                    $("#leveltext").val(Project);
                }
                else if (Approval_Level_Id == 2) {
                    $("#leveltext").val(Sub_Project);
                }
                else if (Approval_Level_Id == 1) {
                    $("#leveltext").val(Line_Item);
                    $("#divAmount").show();
                    $('#HideOR').show();
                    budgetapproverjs.Fn_BulkApprovalAmountCalculation();
                }
                budgetapproverjs.fn_TotalOriginalAsk(BudgetRequest_Id, Category_Id, Approval_Level_Id);

            }
            else {
                $("#leveltext").val("");
                $("#Originalask").val("");
                $("#Approvedamount").val("");
                $("#divAmount").hide();
                $('#HideOR').hide();
            }

        });

        //Handles bulk approval submit
        $('#btnSumapprovalsubmit').on('click', function () {
            var promptbulksubmitapproval, row, data, BudgetRequest_Id,
            Category_Id,Approval_Level_Id,Approval_Status_Id,Approver_Reduction_Percentage,Approved_Amount,Approver_Comment,urlPath;
            row = $("#gridview").find("#tblbudgetApproverList").find("tr.selected");
            data = $(row);
            BudgetRequest_Id = $(data).attr("data-BudgetRequest_Id");
            Category_Id = $("#ddlCategoryApprove").find("option:selected").val();
            Approval_Level_Id = $("#ddlApprovalLevels").find("option:selected").val();
            Approval_Status_Id = $("#ddlLineitemstatusBulk").find("option:selected").val();
            Approver_Reduction_Percentage = $("#Reduction").val().trim();           
            Approved_Amount = $("#ApprovedAmountSummary").val().trim();
            Approved_Amount = fn_RemovingCommas(Approved_Amount);
            Approver_Comment = $("#ApproverComments").val().trim();
            var strValidationMsglists = "";
            //Validations
            if (Category_Id <= 0) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Category before submitting approval.</li>";

            }
            if (Approval_Level_Id <= 0) {
                strValidationMsglists = strValidationMsglists + "<li>Select  a valid Level before submitting approval.</li>";

            }
            if (Approval_Status_Id <= 0) {
                strValidationMsglists = strValidationMsglists + "<li>Select  a valid Status before submitting approval.</li>";

            }
            if ((Approver_Reduction_Percentage == "") || (fn_numbervalidation(Approver_Reduction_Percentage)) || (Approver_Reduction_Percentage % 1 != 0)) {
                strValidationMsglists = strValidationMsglists + "<li>Reduction percentage is required field and it should be whole number.</li>";

            }
            if ((Approved_Amount == "") || (fn_numbervalidation(Approved_Amount))) {
                strValidationMsglists = strValidationMsglists + "<li>Approved Amount is required before submitting approval.</li>";

            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayApprovalMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            promptbulksubmitapproval = confirm('Submit Your Approval. Are you sure?');
            if (promptbulksubmitapproval) {
                urlPath = "/BudgetApprover/BudgetBulkApproval";
                if (true) {
                   $.ajax({
                        type: "POST",
                        cache: false,
                        url: urlPath,
                        data: {
                            BudgetRequest_Id: BudgetRequest_Id,
                            Approval_Status_Id: Approval_Status_Id,
                            Category_Id: Category_Id,
                            Approval_Level_Id: Approval_Level_Id,
                            Approver_Reduction_Percentage: Approver_Reduction_Percentage,
                            Approved_Amount: Approved_Amount,
                            Approver_Comment: Approver_Comment
                        },
                        beforeSend: function () {
                            Common.showDialog.show('Please wait....', {
                                dialogSize: 'sm',
                                progressType: 'warning'
                            });
                        },
                        complete: function () {
                            Common.showDialog.hide();

                        },
                        success: function () {
                            alert('Selected Request Successfully Approved.');
                            //now refresh the approval panel.
                            budgetapproverjs.fn_RefreshApprovalPanel();
                            //now reload the summary Grid.
                            //$("#btnFindBudgetSummary").trigger("click");
                            budgetapproverjs.FilterSummary($("#ddlGroup").find("option:selected").text());
                            //hide the Approval panel
                            $("#ApprovalWorkFlow").hide();

                            //  fn_ShowHideUserMessageDivWithCssClass_common('divDisplayApprovalMessages', "Selected Request Successfully Approved.", true, 'alert alert-success');
                            //$("#btnbulkapprovalundo").removeAttr('disabled');
                        },
                        error: function (ex) {
                            alert(ex.responseText);
                        }
                    });
                }
            }


        });

        //handles undo functionality
        $("#btnbulkapprovalundo").on("click", function () {
            var data, row, BudgetRequest_Id,urlPath;
            row = $("#gridview").find("#tblbudgetApproverList").find("tr.selected");
            data = $(row);
            BudgetRequest_Id = $(data).attr("data-BudgetRequest_Id");
            var promptbulkundo = confirm('Undo Your Last Submitted Approval. Are you sure?');
            if (promptbulkundo) {
                urlPath = "/BudgetRequest/UndoLastAction";
                if (BudgetRequest_Id > 0) {
                     $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            BudgetRequest_Id: BudgetRequest_Id
                            ,IsSingleRequest:false
                        },
                        beforeSend: function () {
                            Common.showDialog.show('Please wait....', {
                                dialogSize: 'sm',
                                progressType: 'warning'
                            });
                        },
                        complete: function () {
                            Common.showDialog.hide();
                        },
                        success: function () {
                            alert('Last Submitted Request Approval is successfully reverted back');
                            //now refresh the approval panel.
                            budgetapproverjs.fn_RefreshApprovalPanel();
                            budgetapproverjs.FilterSummary($("#ddlGroup").find("option:selected").text());
                            //hide the Approval panel
                            $("#ApprovalWorkFlow").hide();

                            //fn_ShowHideUserMessageDivWithCssClass_common('divDisplayApprovalMessages', "Last Submitted Request Approval is successfully reverted back", true, 'alert alert-success');
                            // $("#btnbulkapprovalundo").attr('disabled', 'disabled');

                        },
                        error: function (ex) {
                            alert(ex.responseText);
                        }
                    });
                }
            }
        });

        //handles automatic adding of commas while user entering amount in text box
        $('input.autocommas').keyup(function (event) {

            // skip for arrow keys
            if (event.which >= 37 && event.which <= 40) return;

            // format number
            $(this).val(function (index, value) {
                return value
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                ;


            });
        });


    }, //end of LoadBudgetSummary function

    //This will Get the SummaryList based On diff parameter.
    GetBudgetSummary: function () {

        var  urlPath, ajaxRequest, Group_Id,
            Team_Id, Project_Id, Sub_project_Id, TextSearch, BudgetRequest_Id,
            Category_Id, Class_Id, InvestmentType_Id, Priority_Id,
            Approval_Status_Id;
        
        Approval_Status_Id = $("#ddlApprovalStatus").find("option:selected").val();
        Category_Id = $("#ddlCategory").find("option:selected").val();
        Group_Id = $("#ddlGroup").find("option:selected").val();
        Team_Id = $("#ddlTeam").find("option:selected").val();
        Project_Id = $("#ddlProject").find("option:selected").val();
        Sub_project_Id = $("#ddlSubProject").find("option:selected").val();
        TextSearch = $("#TextSearch").val();
        Priority_Id = $("#ddlPriority").find("option:selected").val();
        Class_Id = $("#ddlClass").find("option:selected").val();
        InvestmentType_Id = $("#ddlInvestmentType").find("option:selected").val();
        BudgetRequest_Id = $("#BudgetID").val();


        if (BudgetRequest_Id != "") {
            Approval_Status_Id = '';
            Category_Id = '';
            Group_Id = '';
            Team_Id = '';
            Project_Id = '';
            Sub_project_Id = '';
            TextSearch = '';
            Priority_Id = '';
            Class_Id = '';
            InvestmentType_Id = '';
        }
        else {
            if ($("#ddlApprovalStatus").find("option:selected").val() <= 0) {
                Approval_Status_Id = '';
            }
            if ($("#ddlCategory").find("option:selected").val() <= 0) {
                Category_Id = '';
            }

            if ($("#ddlGroup").find("option:selected").val() <= 0) {
                Group_Id = '';
            }
            if ($("#ddlTeam").find("option:selected").val() <= 0) {
                Team_Id = '';
            }
            if ($("#ddlProject").find("option:selected").val() <= 0) {
                Project_Id = '';
            }
            if ($("#ddlSubProject").find("option:selected").val() <= 0) {
                Sub_project_Id = '';
            }

            if (TextSearch == '') {
                TextSearch = '';
            }

            if ($("#ddlPriority").find("option:selected").val() <= 0) {
                Priority_Id = '';
            }
            if ($("#ddlClass").find("option:selected").val() <= 0) {
                Class_Id = '';
            }
            if ($("#ddlInvestmentType").find("option:selected").val() <= 0) {
                InvestmentType_Id = '';
            }

            if (BudgetRequest_Id == '') {
                BudgetRequest_Id = '';
            }
        }

        //  if (BudgetRequest_Id != '') {

        urlPath = "/BudgetApprover/GetBudgetSummary";

        ajaxRequest = $.ajax({
            type: "Post",
            cache: false,
            url: urlPath,
            data: {
                Approval_Status_Id: Approval_Status_Id,
                Category_Id: Category_Id,
                Group_Id: Group_Id,
                Team_Id: Team_Id,
                Project_Id: Project_Id,
                Sub_project_Id: Sub_project_Id,
                TextSearch: TextSearch,
                Priority_Id: Priority_Id,
                Class_Id: Class_Id,
                InvestmentType_Id: InvestmentType_Id,
                BudgetRequest_Id: BudgetRequest_Id
               
            },
            beforeSend: function () {
                Common.showDialog.show('Please wait....', {
                    dialogSize: 'sm',
                    progressType: 'warning'
                });
            },
            complete: function () {
                budgetapproverjs.ReinitiateDataTable('tblbudgetApproverList');
                Common.showDialog.hide();
            },
            success: function (result) {

                $("#gridview").html('');
                $("#gridview").html(result.PartialHtml);
                if (result.SubmittedAmount != null) {
                    $("#txtTotalSubmitted").val(budgetapproverjs.addCommas((result.SubmittedAmount).toFixed(0)));
                }
                if (result.ManagerAmount != null) {
                    $("#txtTotalManagerApproved").val(budgetapproverjs.addCommas((result.ManagerAmount).toFixed(0)));
                }
                if (result.DirectorAmount != null) {
                    $("#txtTotalDirectorApproved").val(budgetapproverjs.addCommas((result.DirectorAmount).toFixed(0)));
                }
                if (result.SLTAmount != null) {
                    $("#txtTotalSLTApproved").val(budgetapproverjs.addCommas((result.SLTAmount).toFixed(0)));
                }

            },
            error: function (ex) {
                //   Common.showDialog.hide();
                alert("An error has occured!!!" + ex.responseText);
            }
        });

        //  }

    },

    ReinitiateDataTable: function (tableId) {
         $("#" + tableId).DataTable(
          {
              bFilter: false, bInfo: false, bLengthChange: false, "order": [0, 'asc'], "paging": false, "scroll": true,

              "aoColumnDefs": [
      {
          'bSortable': false,
          'aTargets': ['action-col', 'text-holder']
      }]

              //"footerCallback": function (row, data, start, end, display) {
              //    var api = this.api(), data;

              //    // Remove the formatting to get integer data for summation
              //    var intVal = function (i) {
              //        return typeof i === 'string' ?
              //            i.replace(/[\$,\%]/g, '') * 1 :
              //            typeof i === 'number' ?
              //            i : 0;
              //    };


              //    // Total over all pages
              //    totalAskAmt = api
              //        .column(7)
              //        .data()
              //        .reduce(function (a, b) {
              //            return intVal(a) + intVal(b);
              //        }, 0);
              //    totalReduction = api
              //        .column(8)
              //        .data()
              //        .reduce(function (a, b) {
              //            return intVal(a) + intVal(b);
              //        }, 0);

              //    totalApprovedAmt = api
              //        .column(9)
              //        .data()
              //        .reduce(function (a, b) {
              //            return intVal(a) + intVal(b);
              //        }, 0);
              //    totalFy17Impact = api
              //        .column(10)
              //        .data()
              //        .reduce(function (a, b) {
              //            return intVal(a) + intVal(b);
              //        }, 0);
              //  // Update footer
              //    $(api.column(7).footer()).html('$ ' + totalAskAmt.toFixed(0));
              //    $(api.column(8).footer()).html(totalReduction.toFixed(0) + ' %');
              //    $(api.column(9).footer()).html('$ ' + totalApprovedAmt.toFixed(0));
              //    $(api.column(10).footer()).html('$' + totalFy17Impact.toFixed(0));

              //}
          }
            );
    },
    addCommas: function (x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    },
    //This will Handle the User Alias Selection Change Event.
    UserAliasOnChangeHandler: function () {

        var UserAlias, urlPath,  i;
        UserAlias = $("#UserId").text();
        //UserAlias = "v-maag@microsoft.com";
        urlPath = "/BudgetApprover/GetUserGroup";
        if (UserAlias != '') {
           $.ajax({
                type: "Post",
                cache: false,
                async: false,
                url: urlPath,
                data: {
                    UserAlias: UserAlias
                },
                complete: function () {
                    $('#ddlGroup').removeAttr('disabled');
                    $('#ddlGroup').prop('selectedIndex', 1);
                },
                success: function (result) {
                    $("#ddlGroup").empty();
                    var listItems = "<option value='-1'>Select Group</option>";;
                    for (i = 0; i < result.length; i++) {
                        listItems += "<option value='" + result[i].Group_Id + "'>" +
                            result[i].Group_name + "</option>";
                    }
                    $("#ddlGroup").html(listItems);
                    budgetapproverjs.GetBudgetSummary();
                },
                error: function () {
                    // alert("An error has occured!!!" + ex.responseText);
                }

            });
        }
    },
    FilterSummary: function (Groups) {
        var  Group, Team, Project,TextSearch, SubProject,  Category, Class, InvestmentType, Priority, Status,BudgetID;
        Status = $("#ddlApprovalStatus").find("option:selected").text();
        Category = $("#ddlCategory").find("option:selected").text();
        Group = Groups;
        Team = $("#ddlTeam").find("option:selected").text();
        Project = $("#ddlProject").find("option:selected").text();
        SubProject = $("#ddlSubProject").find("option:selected").text();
        TextSearch = $("#TextSearch").val().trim();
        Priority = $("#ddlPriority").find("option:selected").text();
        Class = $("#ddlClass").find("option:selected").text();
        InvestmentType = $("#ddlInvestmentType").find("option:selected").text();
        BudgetID = $("#BudgetID").val().trim();
        if (BudgetID != "") {
            Status = '';
            Category = '';
            Group = '';
            Team = '';
            Project = '';
            SubProject = '';
            TextSearch = '';
            Priority = '';
            Class = '';
            InvestmentType = '';
        }
        else {
            if ($("#ddlApprovalStatus").find("option:selected").val() <= 0) {
                Status = '';
            }
            if ($("#ddlCategory").find("option:selected").val() <= 0) {
                Category = '';
            }
            if (Group == "Select Group") {
                Group = '';
            }
            else {
                Group = Groups;
            }

            if ($("#ddlTeam").find("option:selected").val() <= 0) {
                Team = '';
            }
            if ($("#ddlProject").find("option:selected").val() <= 0) {
                Project = '';
            }
            if ($("#ddlSubProject").find("option:selected").val() <= 0) {
                SubProject = '';
            }

            if (TextSearch == '') {
                TextSearch = '';
            }

            if ($("#ddlPriority").find("option:selected").val() <= 0) {
                Priority = '';
            }
            if ($("#ddlClass").find("option:selected").val() <= 0) {
                Class = '';
            }
            if ($("#ddlInvestmentType").find("option:selected").val() <= 0) {
                InvestmentType = '';
            }

            if (BudgetID == '') {
                BudgetID = '';
            }
        }
        //This will Get the OrderList Partial
        budgetapproverjs.GetBudgetSummary();


        //make the filter Summary
        var filterSummary =
          "Status :" + ((Status != '') ? Status : 'NA') +
          "; Category :" + ((Category != '') ? Category : 'NA') +
           "; Group :" + ((Group != '') ? Group : 'NA') +
            "; Team :" + ((Team != '') ? Team : 'NA') +
            "; Project :" + ((Project != '') ? Project : 'NA') +
            "; SubProject :" + ((SubProject != '') ? SubProject : 'NA') +
            "; TextSearch :" + ((TextSearch != '') ? TextSearch : 'NA') +
             "; Priority :" + ((Priority != '') ? Priority : 'NA') +
             "; Class :" + ((Class != '') ? Class : 'NA') +
             "; InvestmentType :" + ((InvestmentType != '') ? InvestmentType : 'NA') +
            "; BudgetID :" + ((BudgetID != '') ? BudgetID : 'NA');



        $("#FilterSummary").text(filterSummary);

    },
    StatusDropDown: function () {

       var urlPath = "/Common/GetApprovalStatus";
         $.ajax({
            type: "Post",
            cache: false,
            url: urlPath,
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (result) {

                $('.clsBulkStatus').empty();
                var  listItems = "<option value='0'>--Select Status--</option>";
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].ActionCategory_Id == 2) {
                            listItems += "<option value='" +
                                result[i].Approval_Status_Id + "'>" +
                                result[i].Approval_Status_Name + "</option>";
                        }
                    }
                }
                $('.clsBulkStatus').html(listItems);
            },
            error: function () {
                //alert("An error has occured!!!" + ex.responseText);
            }
        });
    },
    DisabledControls: function (step) {
        if (step == 1) {
            $("#ddlTeam").empty();
            $("#ddlProject").empty();
            $("#ddlSubProject").empty();
            $("#ddlTeam").attr('disabled', 'disabled');
            $("#ddlProject").attr('disabled', 'disabled');
            $("#ddlSubProject").attr('disabled', 'disabled');
        }
        else if (step == 2) {

            $("#ddlProject").empty();
            $("#ddlSubProject").empty();
            $("#ddlProject").attr('disabled', 'disabled');
            $("#ddlSubProject").attr('disabled', 'disabled');

        }
        else if (step == 3) {

            $("#ddlSubProject").empty();
            $("#ddlSubProject").attr('disabled', 'disabled');
        }
        else {

            //for clear and disabled all the filter dropdown

            $("#ddlTeam").empty();
            $("#ddlProject").empty();
            $("#ddlSubProject").empty();

            $("#ddlTeam").attr('disabled', 'disabled');
            $("#ddlProject").attr('disabled', 'disabled');
            $("#ddlSubProject").attr('disabled', 'disabled');


        }

    },
    fn_OnSelectedRowHandler: function (obj) {
        var Approval_Status_Id,SLTAmount;
        var data = $(obj);
        $(obj).addClass("selected").siblings().removeClass("selected");
        Approval_Status_Id = $(data).attr("data-Approval_Status_Id");
        if (Approval_Status_Id != 1 && Approval_Status_Id != 7 && Approval_Status_Id != 8) {           
            //show the Approval panel
            $("#ApprovalWorkFlow").show();
            budgetapproverjs.fn_RefreshApprovalPanel();
            budgetapproverjs.fn_GetOriginalAsk();
        }
        else {
            //hide the Approval panel
            $("#ApprovalWorkFlow").hide();
        }
        //populating SLT amount
        SLTAmount = $(data).attr("data-SLTAmount");
        SLTAmount = Number(SLTAmount);
        if (SLTAmount != 0) {
            $("#txtTotalSLTApproved").val(budgetapproverjs.addCommas((SLTAmount).toFixed(0)));
        }
        else {
            $("#txtTotalSLTApproved").val(0);
        }


    },
    fn_GetOriginalAsk: function () {
        var ddlLineitemstatusBulk, BudgetRequest_Id, Category_Id, Line_Item, Ask_Amount,row,data;
        //Get the Selected Row.
        row = $("#gridview").find("#tblbudgetApproverList").find("tr.selected");
        data = $(row);
        $('#ddlCategoryApprove').prop('selectedIndex', 0);
        ddlLineitemstatusBulk = $('#ddlLineitemstatusBulk').prop('selectedIndex', 0);
        BudgetRequest_Id = $(data).attr("data-BudgetRequest_Id");
        Category_Id = $(data).attr("data-Category_Id");
        Line_Item = $(data).attr("data-Line_item_Description");
        Ask_Amount = $(data).attr("data-Ask_Amount");
        $("#Reduction").val(0);
        if (Ask_Amount != null) {
            var strAsk = fn_KeepingCommas(Number(Ask_Amount).toFixed(0));
            $("#ApprovedAmountSummary").val(strAsk);
        }
        $("#leveltext").val(Line_Item);
        $("#divAmount").hide();
        budgetapproverjs.fn_TotalOriginalAsk(BudgetRequest_Id, Category_Id, 1);
        var Level = document.getElementById("ddlApprovalLevels").options[1].text;
        $('#ddlApprovalLevels').prop('selectedIndex', 1);
        $("#levellabel").text(Level);
        $("#divAmount").show();
        $('#HideOR').show();
        $('#ddlCategoryApprove').val(Category_Id);

    },

    //common function for calculating total original ask and total approved amount
    fn_TotalOriginalAsk: function (BudgetRequest_Id, Category_Id, Approval_Level_Id) {
        var Approver_Reduction_Percentage,urlPath;
        Approver_Reduction_Percentage = $("#Reduction").val().trim();
        urlPath = "/BudgetApprover/GetBulkAmount";
        if (true) {
            $.ajax({
                type: "Get",
                cache: false,
                async: false,
                url: urlPath,
                data: {
                    BudgetRequest_Id: BudgetRequest_Id,
                    Category_Id: Category_Id,
                    Approval_Level_Id: Approval_Level_Id,
                    Approver_Reduction_Percentage: Approver_Reduction_Percentage
                },
                beforeSend: function () {

                },
                complete: function () {

                    Common.showDialog.hide();

                },
                success: function (result) {

                    if (result[0].TotalOrignalAsk != null) {
                        $("#Originalask").val(budgetapproverjs.addCommas((result[0].TotalOrignalAsk).toFixed(0)));

                    }
                    //if (Approver_Reduction_Percentage!=0)
                    //{
                    if (result[0].TotalApproved != null) {
                        $("#Approvedamount").val(budgetapproverjs.addCommas((result[0].TotalApproved).toFixed(0)));
                    }
                    //}
                    //else {
                    //    $("#Approvedamount").val("");
                    //}
                    Common.showDialog.hide();


                },
                error: function (ex) {
                    alert(ex.responseText);
                }
            });
        }


    },

    //This function refresh the grid data.
    fn_ReloadSummaryGrid: function () {
        var urlPath = "/BudgetApprover/GetBudgetSummary";
        if (true) {
             $.ajax({
                type: "Get",
                cache: false,
                url: urlPath,
                beforeSend: function () {
                    //Common.showDialog.show('Please wait....', {
                    //    dialogSize: 'sm',
                    //    progressType: 'warning'
                    //});
                },
                complete: function () {
                    budgetapproverjs.ReinitiateDataTable('tblbudgetApproverList');
                    Common.showDialog.hide();

                },
                success: function (result) {

                    $("#gridview").html(result.PartialHtml);
                    if (result.SubmittedAmount != null) {
                        $("#txtTotalSubmitted").val(budgetapproverjs.addCommas((result.SubmittedAmount).toFixed(0)));
                    }
                    if (result.ManagerAmount != null) {
                        $("#txtTotalManagerApproved").val(budgetapproverjs.addCommas((result.ManagerAmount).toFixed(0)));
                    }
                    if (result.DirectorAmount != null) {
                        $("#txtTotalDirectorApproved").val(budgetapproverjs.addCommas((result.DirectorAmount).toFixed(0)));
                    }
                    if (result.SLTAmount != null) {
                        $("#txtTotalSLTApproved").val(budgetapproverjs.addCommas((result.SLTAmount).toFixed(0)));
                    }
                    Common.showDialog.hide();


                },
                error: function (ex) {
                    alert(ex.responseText);
                }
            });
        }


    },

    TeambeforeSend: function () {
        var procemessage = "<option value='-1'> Please wait...</option>";
        $("#ddlTeam").html(procemessage).show();
    },
    TeamSuccess: function (result) {
        var listItems = "<option value='0'>--Select Team--</option>";
        for (var i = 0; i < result.length; i++) {
            listItems += "<option value='" +
                result[i].Team_Id + "'>" +
                result[i].Team_Name + "</option>";
        }
        $('#ddlTeam').removeAttr('disabled');
        $("#ddlTeam").html(listItems);

    },
    TeamComplete: function () {
        //  budgetapproverjs.Fn_GettingProject(-1);
    },
    ProjectbeforeSend: function () {
        var procemessage = "<option value='-1'> Please wait...</option>";
        $("#ddlProject").html(procemessage).show();
    },
    ProjectSuccess: function (result) {
        // $("#ddlProject").empty();
        var listItems = "<option value='0'>--Select Project--</option>";
        //if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            listItems += "<option value='" +
                result[i].Project_Id + "'>" +
                result[i].Project_Name + "</option>";
            //}
        }
        $('#ddlProject').removeAttr('disabled');
        $("#ddlProject").html(listItems);

    },
    ProjectComplete: function () {
        // budgetapproverjs.Fn_GettingSubProject(-1);

    },
    SubProjectbeforeSend: function () {
        var procemessage = "<option value='-1'> Please wait...</option>";
        $("#ddlSubProject").html(procemessage).show();
    },
    SubProjectSuccess: function (result) {

        var listItems = "<option value='0'>--Select Sub Project--</option>";
        for (var i = 0; i < result.length; i++) {
            listItems += "<option value='" +
                result[i].Sub_Project_Id + "'>" +
                result[i].Sub_Project_Name + "</option>";
        }
        $('#ddlSubProject').removeAttr('disabled');
        $("#ddlSubProject").html(listItems);

    },
    //Handles calculation part for Approval Amount
    Fn_BulkApprovalAmountCalculation: function () {

        var Approver_Reduction_Percentage, Ask_Amount, SubmittedApprovedAmount,Approval_Level_Id,strApprovedAmount;
        Approver_Reduction_Percentage = $("#Reduction").val();
        Approval_Level_Id = $("#ddlApprovalLevels").find("option:selected").val();
        budgetapproverjs.fn_TotalOriginalAsk(BudgetRequest_Id, Category_Id, Approval_Level_Id);
        Ask_Amount = $("#Originalask").val();
        Ask_Amount = fn_RemovingCommas(Ask_Amount);
        if (Approver_Reduction_Percentage >= 0 && Approver_Reduction_Percentage <= 100) {

            SubmittedApprovedAmount = (Number(Ask_Amount) - Number(Ask_Amount * ((Approver_Reduction_Percentage) / 100)));
            $("#ApprovedAmountSummary").val('');
            strApprovedAmount = fn_KeepingCommas((SubmittedApprovedAmount.toFixed(0)));
            $("#ApprovedAmountSummary").val(strApprovedAmount);
        }
        else {
            $("#ApprovedAmountSummary").val('');
            $("#Reduction").val('');
        }

    },
    //Handles calulation of Reduction Percentage
    Fn_BulkReductionPercentageCalculation: function () {
        var Approved_Amount, Ask_Amount, SubmittedApprovedPercentage,Approval_Level_Id;
        Approved_Amount = $("#ApprovedAmountSummary").val();
        Approved_Amount = fn_RemovingCommas(Approved_Amount);
        Approval_Level_Id = $("#ddlApprovalLevels").find("option:selected").val();
        Ask_Amount = $("#Originalask").val();
        Ask_Amount = fn_RemovingCommas(Ask_Amount);
        if (Approved_Amount >= 0) {
            SubmittedApprovedPercentage = 100 - (Approved_Amount / Ask_Amount * 100).toFixed(0);
            $("#Reduction").val('');
            $("#Reduction").val((SubmittedApprovedPercentage));
            budgetapproverjs.fn_TotalOriginalAsk(BudgetRequest_Id, Category_Id, Approval_Level_Id);
        }
        else {
            $("#Reduction").val('');
            $("#ApprovedAmountSummary").val('');
        }

    },

    //Refresh the Approval Pannel
    fn_RefreshApprovalPanel: function () {
        $("#ApprovedAmountSummary").val('');
        $("#Reduction").val('');
        $('#ddlApprovalLevels').prop('selectedIndex', 0);
        $("#levellabel").text('');
        $("#divAmount").hide();
        $('#HideOR').hide();
        $('#ddlCategoryApprove').prop('selectedIndex', 0);
        $("#Originalask").val('');
        $("#Approvedamount").val('');
        $("#leveltext").val('');
        $("#ddlLineitemstatusBulk").prop('selectedIndex', 0);
        $('#ApproverComments').val('');
        $("#divDisplayApprovalMessages").hide();
    },
    ///Export to Excel
    fn_ExportToExcel: function () {
        var  Group_Id, Team_Id, Project_Id,TextSearch, Sub_project_Id, BudgetRequest_Id, Category_Id, Class_Id, InvestmentType_Id, Priority_Id, Approval_Status_Id,User_Alias;
        Approval_Status_Id = $("#ddlApprovalStatus").find("option:selected").val();
        Category_Id = $("#ddlCategory").find("option:selected").val();
        Group_Id = $("#ddlGroup").find("option:selected").val();
        Team_Id = $("#ddlTeam").find("option:selected").val();
        Project_Id = $("#ddlProject").find("option:selected").val();
        Sub_project_Id = $("#ddlSubProject").find("option:selected").val();
        TextSearch = $("#TextSearch").val().trim();
        Priority_Id = $("#ddlPriority").find("option:selected").val();
        Class_Id = $("#ddlClass").find("option:selected").val();
        InvestmentType_Id = $("#ddlInvestmentType").find("option:selected").val();
        BudgetRequest_Id = $("#BudgetID").val().trim();
        User_Alias = $("#UserId").text();
        //if (BudgetRequest_Id != "") {

        //    Category_Id = '';
        //    Group_Id = '';
        //    Team_Id = '';
        //    Project_Id = '';
        //    SubProject_Id = '';
        //    TextSearch = '';
        //    Priority_Id = '';
        //    Class_Id = '';
        //    InvestmentType_Id = '';
        //}
        //else {

        if ($("#ddlApprovalStatus").find("option:selected").val() <= 0) {
            Approval_Status_Id = '';
        }
        if ($("#ddlCategory").find("option:selected").val() <= 0) {
            Category_Id = '';
        }
        if ($("#ddlGroup").find("option:selected").val() <= 0) {
            Group_Id = '';
        }
        if ($("#ddlTeam").find("option:selected").val() <= 0) {
            Team_Id = '';
        }
        if ($("#ddlProject").find("option:selected").val() <= 0) {
            Project_Id = '';
        }
        if ($("#ddlSubProject").find("option:selected").val() <= 0) {
            Sub_project_Id = '';
        }

        if (TextSearch == '') {
            TextSearch = '';
        }

        if ($("#ddlPriority").find("option:selected").val() <= 0) {
            Priority_Id = '';
        }
        if ($("#ddlClass").find("option:selected").val() <= 0) {
            Class_Id = '';
        }
        if ($("#ddlInvestmentType").find("option:selected").val() <= 0) {
            InvestmentType_Id = '';
        }

        if (BudgetRequest_Id == '') {
            BudgetRequest_Id = '';
        }
        //}

        window.open("/BudgetApprover/ExportToExcel?BudgetRequest_Id=" + BudgetRequest_Id +
            "&Category_Id=" + Category_Id +
                "&Group_Id=" + Group_Id +
                "&Team_Id=" + Team_Id +
                "&Project_Id=" + Project_Id +
                "&Sub_project_Id=" + Sub_project_Id +
                "&Approval_Status_Id=" + Approval_Status_Id +
                "&Priority_Id=" + Priority_Id +
                "&Class_Id=" + Class_Id +
                "&InvestmentType_Id=" + InvestmentType_Id +
                "&TextSearch=" + TextSearch +
                "&User_Alias=" + User_Alias);


    }



}

