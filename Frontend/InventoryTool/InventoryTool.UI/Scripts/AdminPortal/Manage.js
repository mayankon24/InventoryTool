/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
var managejs = {
    init: function () {
        var obj = managejs;
        obj.LoadManage();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadManage: function () {
        //initial load the Datatable setting.
        managejs.ReinitiateDataTable('tblManageList');
        managejs.fn_ResetRadioButtons();

        //managejs.Fn_UserUpdate();

        $("#manage").find("#dvManageList").on("click", ".clsDeleteManage", function () {
           
            var data, LineItem_Status_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action.');
            if (promptdelete) {
                data = $(this).parents('tr');
                LineItem_Status_Id = $(data).attr('data-LineItem_Status_Id');
                urlPath = "/AdminPortal/DeleteLineItemStatus";
                if (LineItem_Status_Id != '') {
                     $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            LineItem_Status_Id: LineItem_Status_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayManageMessages', result.messagedata, true, 'alert alert-success');
                                managejs.fn_ReloadManageGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayManageMessages', result.messagedata, true, 'alert alert-danger');
                            }
                        },
                        error: function (ex) {
                            alert(ex.responseText);
                        }
                    });
                }

            }


        });
        ///Get Row Data in Edit Mode
        $("#manage").find("#dvManageList").on("click", ".clsEditManage", function () {
            var  LineItem_Status_Id, data,urlPath;
            data = $(this).parents('tr');
            LineItem_Status_Id = $(data).attr('data-LineItem_Status_Id');
            urlPath = "/AdminPortal/GetManageByManageId";
            if (LineItem_Status_Id != '') {
                $('.clsEditManage ,.clsDeleteManage').css('display', 'none');
                $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        LineItem_Status_Id: LineItem_Status_Id
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
                       
                        $(data).hide();
                        var row = $("#MasterRowEdit_Manage").clone();
                        $(row).find('.clslineitem').val(result.Approval_Stage_Name);
                        $(row).find('.clsstep').val(result.Status_Order);
                        if (result.IsBudgetRequestLocked == true) {
                            $(row).find('.clsbudgetlocked').val(1);
                        }
                        else {
                            $(row).find('.clsbudgetlocked').val(0);
                        }


                        $(row).removeAttr("style");
                        $(row).attr("data-LineItem_Status_Id", LineItem_Status_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewManage").on('click', function () {
            var oTable = $('#tblManageList').dataTable();
            oTable.fnPageChange('first');
          
            //get the clone row.
            var row = $("#MasterRow_Manage").clone();
            $(row).removeAttr("style");
            $(row).find('.clslineitem').val('');
            $(row).find('.clsstep').val('');
            $(row).find('.clsbudgetlocked').val('');
            $("#tblManageList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $("#manage").find("#dvManageList").on("click", ".clsCancelManageUpdate", function () {
            var data;
          
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditManage,.clsDeleteManage').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#manage").find("#dvManageList").on("click", ".clsAddUpdateManage", function () {
            var  LineItem_Status_Id, LineItem_Status_Name, Status_Order, IsBudgetRequestLocked, data,urlPath;
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            LineItem_Status_Id = $(data).attr('data-LineItem_Status_Id');
            LineItem_Status_Name = $(data).find(".clslineitem").val();
            Status_Order = $(data).find(".clsstep").val();
            // IsBudgetRequestLocked = $(this).val();
            IsBudgetRequestLocked = $(data).find(".clsbudgetlocked :selected").text();
            //put validation here
            if ((LineItem_Status_Name == "") || (fn_namevalidation(LineItem_Status_Name))) {
                strValidationMsglists = strValidationMsglists + "<li>Line Item Status Name is required and it shouldn’t be numeric.</li>";
            }
            if ((fn_numbervalidation(Status_Order))) {
                strValidationMsglists = strValidationMsglists + "<li>STatus Order is required and it should be numeric.</li>";
            }
            if (IsBudgetRequestLocked < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Budget Request Locked is required.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayManageMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateManage";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Approval_Stage_Id: LineItem_Status_Id,
                        Approval_Stage_Name: LineItem_Status_Name,
                        Status_Order: Status_Order,
                        IsBudgetRequestLocked: IsBudgetRequestLocked
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
                        if (result.operationstatuscode == 1 || result.operationstatuscode == 2) {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayManageMessages', result.messagedata, true, 'alert alert-success');
                            managejs.fn_ReloadManageGrid();
                           
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayManageMessages', result.messagedata, true, 'alert alert-danger');
                        }
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }
        });
        $('#btnFindBudgetRem').on('click', function () {
           
           var IsBudgetTool_Open, Fiscal_Year_Id,urlPath;
            IsBudgetTool_Open = $("input:radio[name=option]:checked").val();
            Fiscal_Year_Id = $("#ddlFiscalYear :selected").val();
            urlPath = "/AdminPortal/UpdateBudgetStatus";
            if (true) {
               $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        IsBudgetTool_Open: IsBudgetTool_Open,
                        Fiscal_Year_Id: Fiscal_Year_Id
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

                        fn_ShowHideUserMessageDivWithCssClass_common('divbudgetmsg', "State changed successfully.", true, 'alert alert-success');
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }
        });
        //handle cancel function for budget state
        $('#btnFindBudgetRemCancel').on('click', function () {
          
            $("#divradio").load(location.href + " #divradio>*", "");

        });
        //Finance Administator
        $('#btnFindBudgetRemFinance').on('click', function () {
            var urlPath = "/AdminPortal/UpdateFinanaceAdministrator";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Request_Status_Id: Selected
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

                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }
        });

        $("#source").autocomplete({
            autoFocus: true,
            selectFirst: true,
            source: function (request, response) {
                $.ajax({
                    url: "/AdminPortal/GetUsers",
                    data: { 'term': request.term },
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
         
                managejs.addSelectedUserInList(e, i);
                this.value = "";
                return false;
            },
            minLength: 3
        });

        ///This function remove user from selected user list.
        $("#divFinanceAdministratorUser").on('click', '.clsRemoveUser', function () {
            $(this).parent().remove();
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

        $('#btnUpdatefinanceadmin').on('click', function () {
            var arrUsers = [];
            var strValidationMsglists = "";
         
            
            $('#divFinanceAdministratorUser').find('span.SpanContainer').each(function () {
                 
                var User_FirstName, User_LastName, User_DisplayName, User_Alias;
              
                User_FirstName = $(this).attr('data-user_firstname');
                User_LastName = $(this).attr('data-User_LastName');
                User_DisplayName = $(this).attr('data-User_DisplayName');
                User_Alias = $(this).attr('data-User_Alias');
                var UserObj = { 'User_FirstName': User_FirstName, 'User_LastName': User_LastName, 'User_DisplayName': User_DisplayName, 'User_Alias': User_Alias }
                arrUsers.push(UserObj);
                
             
            });
           
           if (arrUsers.length < 1) {

                    strValidationMsglists = strValidationMsglists + "<li>Please select valid User</li>";

                }
                 if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayFinanceMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
           

           var urlPath = "/AdminPortal/UpdateFinanaceAdministrator";
            if (true) {
                $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        UserData: JSON.stringify(arrUsers)
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayFinanceMessages', result.messagedata, true, 'alert alert-success');
                           
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayFinanceMessages', result.messagedata, true, 'alert alert-danger');
                        }
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }
        });
    
    //handle cancel function for finance admin 
        $('#btnFindBudgetRemFinanceCancel').on('click', function () {
          
            $("#divFinanceAdministratorUser").load(location.href + " #divFinanceAdministratorUser>*", "");

    });
    },

    ///This function refresh the grid data.
    fn_ReloadManageGrid: function () {
       
        var urlPath = "/AdminPortal/GetManagePartial";
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
                    managejs.ReinitiateDataTable('tblManageList');
                  
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvManageList").html(result);
                   
                    Common.showDialog.hide();
                },
                error: function (ex) {
                    alert(ex.responseText);
                }
            });
        }


    },
   
    fn_ResetRadioButtons: function () {
        var urlPath = "/AdminPortal/GetBudgetStatus";
         $.ajax({
            type: "Post",
            cache: false,
            url: urlPath,

            beforeSend: function () {

            },
            complete: function () {

            },
            success: function (result) {
                
                $('#ddlFiscalYear').val(result[0].Fiscal_Year_Id)


            },
            error: function () {

            }
        });


    },
    ReinitiateDataTable: function (tableId) {
         $("#" + tableId).DataTable(
        {
            bFilter: false, bInfo: false, bLengthChange: false, "order": [1, 'asc'],
            "aoColumnDefs": [
 {
     'bSortable': false,
     'aTargets': ['action-col', 'text-holder']
 }]
        }
          );
    },

    /*This function Create Html with Attribute of User 
  and add in DivContainer of user list*/
    addSelectedUserInList: function (e, i) {
        
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
        aTag.setAttribute('class', 'clsRemoveUser')

        var iTag = document.createElement('i');
        iTag.setAttribute('class', 'glyphicon glyphicon-remove')
        aTag.appendChild(iTag)
        spanOuterContainer.appendChild(spanInnerContainer)
        spanOuterContainer.appendChild(aTag)

        var htm = spanOuterContainer.outerHTML;
        //$("#divSelectedUser_BudgetOwner").append(htm);
        $('#divFinanceAdministratorUser').append(htm);
        //}
        //else {
        //    alert('Please select User Properly from suggested list.');
        //}
    }










};








