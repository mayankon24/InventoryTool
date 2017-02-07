/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
var groupsjs = {
    init: function () {
        var obj = groupsjs;
        obj.LoadGroups();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadGroups: function () {
        var obj = groupsjs;
        //initial load the Datatable setting.
        groupsjs.ReinitiateDataTable('tblGroupsList');

        $("#groups").find("#dvGroupList").on("click", ".clsDeleteGroups", function () {
            var data, Group_Id, promptdelete;
            promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action.');
            if (promptdelete) {
                data = $(this).parents('tr');
                Group_Id = $(data).attr('data-Group_Id');
                urlPath = "/AdminPortal/DeleteGroup";
                if (Group_Id != '') {
                    ajaxRequest = $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Group_Id: Group_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayGroupmessages', result.messagedata, true, 'alert alert-success');
                                groupsjs.fn_ReloadGroupGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayGroupmessages', result.messagedata, true, 'alert alert-danger');
                            }
                        },
                        error: function (xhr, status, error) {
                            alert(xhr.responseText);
                        }
                    });
                }

            }


        });
        ///Get Row Data in Edit Mode
        $("#groups").find("#dvGroupList").on("click", ".clsEditGroup", function () {
          
            var ajaxRequest, Group_Id, data;
            data = $(this).parents('tr');
            Group_Id = $(data).attr('data-Group_Id');
            urlPath = "/AdminPortal/GetGroupByGroupId";
            if (Group_Id != '') {
                $('.clsEditGroup ,.clsDeleteGroups').css('display', 'none');
                ajaxRequest = $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Group_Id: Group_Id
                    },
                    beforeSend: function () {
                       
                        Common.showDialog.show('Please wait....', {
                            dialogSize: 'sm',
                            progressType: 'warning'
                        });
                    },
                    complete: function () {
                        $(".clsRefreshGroup").show();
                        Common.showDialog.hide();
                    },
                    success: function (result) {
                
                        $(data).hide();
                        var row = groupsjs.GetCloneRowHTML(true); //true== This is for Edit Mode.
                        $(row).attr("data-group_id", result.Group_Id);
                        $(row).find('.clsGroups').val(result.Group_Name);
                        
                        $(data).after(row);
                        groupsjs.addUserInList(result.BudgetManagerUser, 'divSelectedUser_BudgetManager');
                        groupsjs.addUserInList(result.BudgetDirectorUser, 'divSelectedUser_BudgetDirector');
                        groupsjs.addUserInList(result.BudgetChampionUser, 'divSelectedUser_BudgetChampion');
                        groupsjs.addUserInList(result.BudgetAdminUser, 'divSelectedUser_BudgetAdmin');
                        groupsjs.addUserInList(result.BudgetVisitorUser, 'divSelectedUser_BudgetVisitor');
                        groupsjs.addUserInList(result.PmManagerUser, 'divSelectedUser_PmManager');
                        groupsjs.addUserInList(result.DevManagerUser, 'divSelectedUser_DevManager');
                        groupsjs.addUserInList(result.QualityManagerUser, 'divSelectedUser_QualityManager');
                        $(row).find('.clsSLT_Target').val(result.SLT_Target);
                        groupsjs.ADUser_AutoSuggetion("#BudgetManagerUser,#BudgetDirectorUser,#BudgetChampionUser,#BudgetAdminUser,#BudgetVisitorUser,#PmManagerUser,#DevManagerUser,#QualityManagerUser");
                        
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });

        $("#lnkAddNewGroup").on('click', function () {

            var oTable = $('#tblGroupsList').dataTable();
            oTable.fnPageChange('first');
            var row = groupsjs.GetCloneRowHTML();
            $("#tblGroupsList >tbody").prepend(row);// now will append the clone row to table.
           // $(".clsSLT_Target").attr('disabled', 'disabled');
            $(".clsRefreshGroup").hide();
            //Now bind the Event of Auto Complete in textboxs. 
            groupsjs.ADUser_AutoSuggetion("#BudgetManagerUser,#BudgetDirectorUser,#BudgetChampionUser,#BudgetAdminUser,#BudgetVisitorUser,#PmManagerUser,#DevManagerUser,#QualityManagerUser");
        });
        ///Handle the Cancel update functionality
        $("#groups").find("#dvGroupList").on("click", ".clsCancelGroupUpdate", function () {
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditGroup,.clsDeleteGroups').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#groups").find("#dvGroupList").on("click", ".clsAddUpdateGroup", function () {
            var ajaxRequest, Group_Id, Group_name, data;
            var strValidationMsglists = "";
            var arBudgetManagerUser = [], arBudgetDirectorUser = [], arBudgetChampionUser = [], arBudgetAdminUser = [], arBudgetVisitorUser = []
                , arPmManagerUser = [], arDevManagerUser = [], arQualityManagerUser = [];
            var GroupData;

            data = $(this).parents('tr');
            Group_Id = $(data).attr('data-Group_Id');
            Group_Name = $(data).find('.clsGroups ').val();
            SLT_Target = $(data).find('.clsSLT_Target').val();

            arBudgetManagerUser = groupsjs.GetUserDetails(data, 'divSelectedUser_BudgetManager');
            arBudgetDirectorUser = groupsjs.GetUserDetails(data, 'divSelectedUser_BudgetDirector');
            arBudgetChampionUser = groupsjs.GetUserDetails(data, 'divSelectedUser_BudgetChampion');
            arBudgetAdminUser = groupsjs.GetUserDetails(data, 'divSelectedUser_BudgetAdmin');
            arBudgetVisitorUser = groupsjs.GetUserDetails(data, 'divSelectedUser_BudgetVisitor');
            arPmManagerUser = groupsjs.GetUserDetails(data, 'divSelectedUser_PmManager');
            arDevManagerUser = groupsjs.GetUserDetails(data, 'divSelectedUser_DevManager');
            arQualityManagerUser = groupsjs.GetUserDetails(data, 'divSelectedUser_QualityManager');
            GroupData = {
                'Group_Id': Group_Id, 'Group_Name': Group_Name,'SLT_Target':SLT_Target, 'BudgetManagerUser': arBudgetManagerUser, 'BudgetDirectorUser': arBudgetDirectorUser, 'BudgetChampionUser': arBudgetChampionUser,
                'BudgetAdminUser': arBudgetAdminUser, 'BudgetVisitorUser': arBudgetVisitorUser, 'PmManagerUser': arPmManagerUser, 'DevManagerUser': arDevManagerUser,
                'QualityManagerUser': arQualityManagerUser
            };

            //put validation here
            if ((Group_Name == "") || (fn_namevalidation(Group_Name))) {
                strValidationMsglists = strValidationMsglists + "<li>Group Name is Required and shouldn't be numeric</li>";
            }
            if (arBudgetManagerUser.length < 1)
            {
                strValidationMsglists = strValidationMsglists + "<li>Budget Manager User is Required.</li>";
            }
            if (arBudgetDirectorUser.length < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Budget Director User is Required.</li>";
            }
            if (arBudgetChampionUser.length < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Budget Champion User is Required. </li>";
            }
            if (arBudgetAdminUser.length < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Budget Admin User is Required. </li>";
            }
            if (arBudgetVisitorUser.length < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Budget Visitor User is Required.</li>";
            }
            if (arPmManagerUser.length < 1) {
                strValidationMsglists = strValidationMsglists + "<li>PM Manager User is Required.</li>";
            }
            if (arDevManagerUser.length < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Dev Manager User is Required.</li>";
            }
            if (arQualityManagerUser.length < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Quality Manager User is Required.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayGroupmessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateGroup";
            if (true) {
                ajaxRequest = $.ajax({
                    type: "POST",
                    cache: false,
                    url: urlPath,
                    data: {
                        GroupData: JSON.stringify(GroupData)
                    },
                  //  contentType: "application/json; charset=utf-8",
                    //dataType: "json",
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
                        if (result.operationstatuscode == 1 || result.operationstatuscode == 2) {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayGroupmessages', result.messagedata, true, 'alert alert-success');
                            groupsjs.fn_ReloadGroupGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayGroupmessages', result.messagedata, true, 'alert alert-danger');
                        }
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }
        });
        //This is used for Refreshing SLT_Target
        $("#groups").find("#dvGroupList").on("click", ".clsRefreshGroup", function () {
   
            var selected, urlPath, ajaxRequest, listItems, i, Group_Id;
            data = $(this).parents('tr');
            Group_Id = $(data).attr('data-Group_Id');
            urlPath = "/BudgetSummary/GetSLT_Target";
          
                ajaxRequest = $.ajax({
                    type: "Post",
                    cache: false,
                    url: urlPath,
                    data: {
                        Group_Id: Group_Id
                    },
                    beforeSend: function () {
                       
                    },
                    complete: function () {

                    },
                    success: function (result) {

                      
                      
                       $('.clsSLT_Target').val(result[0].SltTarget);

                    },
                    error: function (ex) {
                        alert("An error has occured!!!");
                    }
                });
            
        });
        //This function Clean the Auto complete Text box
        $("#source").keyup(function (e) {
            if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 88) {
                if ($(this).val()) {
                    $(this).val('');
                    $(this).val('');
                }
                else {
                    $(this).val('');
                }
            }
        });

        ///This function remove user from selected user list.
        $("#groups").find("#dvGroupList").on('click', '.clsRemoveUser', function (e) {
            $(this).parent().remove();
        });

    },

    ///This function refresh the grid data.
    fn_ReloadGroupGrid: function () {
        var ajaxRequest;
        urlPath = "/AdminPortal/GetGroupPartial";
        if (true) {
            ajaxRequest = $.ajax({
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
                    groupsjs.ReinitiateDataTable('tblGroupsList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvGroupList").html(result);
                    Common.showDialog.hide();
                },
                error: function (ex) {
                    alert(ex.responseText);
                }
            });
        }


    }
    ,
    ReinitiateDataTable: function (tableId) {
        var table = $("#" + tableId).DataTable(
          {
              bFilter: false, bInfo: false, bLengthChange: false, "order": [0, 'asc'], "pageLength": 5,
              "aoColumnDefs": [
      {
          'bSortable': false,
          'aTargets': ['action-col', 'text-holder']
      }]
          }
            );
    },

    ///This function enable the Autocomplete feature 
    ADUser_AutoSuggetion: function (InputIds) {
        $(InputIds).autocomplete({
            autoFocus: true,
            selectFirst: true,
            source: function (request, response) {
                $.ajax({
                    url: "/AdminPortal/GetUsers",
                    data: { 'term': request.term, },
                    dataType: "json",
                    type: "GET",
                    beforeSend: function () {
                        //var procemessage = "<option value='-1'> Please wait...</option>";
                        //$("#ddlGroup").html(procemessage).show();
                    },
                    complete: function () {
                      
                    },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return {
                                User_FirstName: item.User_FirstName,
                                User_LastName: item.User_LastName,
                                label: item.User_DisplayName,
                                val: item.User_Alias
                            }
                        }))
                    },
                    error: function (response) {
                        alert(response.responseText);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    }
                });
            },
            select: function (e, i) {
                var that = this;
                groupsjs.addSelectedUserInList(e, i, that);
                this.value = "";
                return false;
            },
            minLength: 3
        });
    },

    /*This function Create Html with Attribute of User 
    and add in DivContainer of user list*/
    addSelectedUserInList: function (e, i, obj) {
        //;
        //put validation if user selected properly or not.
        //if (i.item.val != '' && i.item.val != undefiend && i.item.val!=null) {

        var spanOuterContainer = document.createElement('span');
        spanOuterContainer.setAttribute('class', 'spanOuter');

        var spanInnerContainer = document.createElement('span');
        spanInnerContainer.setAttribute('class', 'SpanContainer');
        spanInnerContainer.setAttribute('title', i.item.label);
        spanInnerContainer.setAttribute('data-User_FirstName', i.item.User_FirstName);
        spanInnerContainer.setAttribute('data-User_LastName', i.item.User_LastName);
        spanInnerContainer.setAttribute('data-User_DisplayName', i.item.label);
        spanInnerContainer.setAttribute('data-User_Alias', i.item.val);
        spanInnerContainer.innerHTML = i.item.label;
        //Now add Remove Icon
        var aTag = document.createElement('a');
        aTag.setAttribute('href', 'javascript:void(0)');
        aTag.setAttribute('class', 'clsRemoveUser');
        var iTag = document.createElement('i');
        iTag.setAttribute('class', 'glyphicon glyphicon-remove');
        aTag.appendChild(iTag);
        spanOuterContainer.appendChild(spanInnerContainer);
        spanOuterContainer.appendChild(aTag);
        var htm = spanOuterContainer.outerHTML;
        $(obj).closest('td').find('div.DivContainer').append(htm);
        $(obj).val('');
        $(obj).text('');
        //}
        //else {
        //    alert('Please select User Properly from suggested list.');
        //}
    },

    GetUserDetails: function (data, DivId) {
        var arrUsers = [];
        $(data).find('td #' + DivId).find('span.SpanContainer').each(function () {
            var User_FirstName, User_LastName, User_DisplayName, User_Alias;
            User_FirstName = $(this).attr('data-user_firstname');
            User_LastName = $(this).attr('data-User_LastName');
            User_DisplayName = $(this).attr('data-User_DisplayName');
            User_Alias = $(this).attr('data-User_Alias');
            var UserObj = { 'User_FirstName': User_FirstName, 'User_LastName': User_LastName, 'User_DisplayName': User_DisplayName, 'User_Alias': User_Alias }
            arrUsers.push(UserObj);
        });
        return arrUsers;
    },
    GetCloneRowHTML: function (IsEdit) {
   
        //get the clone row.
        var row = $("#MasterRow_Groups").clone();
        // Now set the Id
        $(row).find('td:nth-child(2)').find('input').attr('id', 'BudgetManagerUser');
        $(row).find('td:nth-child(3)').find('input').attr('id', 'BudgetDirectorUser');
        $(row).find('td:nth-child(4)').find('input').attr('id', 'BudgetChampionUser');
        $(row).find('td:nth-child(5)').find('input').attr('id', 'BudgetAdminUser');
        $(row).find('td:nth-child(6)').find('input').attr('id', 'BudgetVisitorUser');
        $(row).find('td:nth-child(7)').find('input').attr('id', 'PmManagerUser');
        $(row).find('td:nth-child(8)').find('input').attr('id', 'DevManagerUser');
        $(row).find('td:nth-child(9)').find('input').attr('id', 'QualityManagerUser');

        $(row).find('td:nth-child(2)').find('div.DivContainer').attr('id', 'divSelectedUser_BudgetManager');
        $(row).find('td:nth-child(3)').find('div.DivContainer').attr('id', 'divSelectedUser_BudgetDirector');
        $(row).find('td:nth-child(4)').find('div.DivContainer').attr('id', 'divSelectedUser_BudgetChampion');
        $(row).find('td:nth-child(5)').find('div.DivContainer').attr('id', 'divSelectedUser_BudgetAdmin');
        $(row).find('td:nth-child(6)').find('div.DivContainer').attr('id', 'divSelectedUser_BudgetVisitor');
        $(row).find('td:nth-child(7)').find('div.DivContainer').attr('id', 'divSelectedUser_PmManager');
        $(row).find('td:nth-child(8)').find('div.DivContainer').attr('id', 'divSelectedUser_DevManager');
        $(row).find('td:nth-child(9)').find('div.DivContainer').attr('id', 'divSelectedUser_QualityManager');
        $(row).removeAttr("style");
        //$(row).find('.clsTeam').val('');
        if (IsEdit)
        {
            $(row).find('a#lnkCancel').removeAttr('onclick');
            //$(row).find('a#lnkCancel').attr('class', 'clsCancelGroupUpdate');
            $(row).find('a#lnkCancel').attr('onclick', 'groupsjs.fn_CancelGroupUpdate(this)');


        }
        return row;

    },
    addUserInList: function (arrUser,DivId) {
        $.each(arrUser, function (index, value) {
            var UserObj = $("#spanUserblock").clone();
            $(UserObj).removeAttr('id');
            $(UserObj).removeAttr('style');
            $(UserObj).find('span.SpanContainer').attr('title', value.User_DisplayName);
            $(UserObj).find('span.SpanContainer').attr('data-User_FirstName', value.User_FirstName);
            $(UserObj).find('span.SpanContainer').attr('data-User_LastName', value.User_LastName);
            $(UserObj).find('span.SpanContainer').attr('data-User_DisplayName', value.User_DisplayName);
            $(UserObj).find('span.SpanContainer').attr('data-User_Alias', value.User_Alias);
            $(UserObj).find('span.SpanContainer').text(value.User_DisplayName);
            $("#"+DivId).append(UserObj);
        });

    }
    ,
    fn_CancelGroupUpdate: function (obj) {
        var data = $(obj).parents('tr');
        $(data).closest('tr').prev('tr.display-mode').show();
        $(data).closest('tr.edit-mode').remove();
        $('.clsEditGroup,.clsDeleteGroups').removeAttr('style');
    }
};


