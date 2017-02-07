/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/

//Role-ApprovalStatusMapping
//lineitemsubstatus
var rolenamejs = {
    init: function () {
        var obj = rolenamejs;
        obj.LoadRoleName();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadRoleName: function () {
        //initial load the Datatable setting.
        rolenamejs.ReinitiateDataTable('tblApprovalStatusList');
        $('#ApprovalStatusMapping').find("#dvApprovalStatusList").on("click", ".clsDeleteApprovalStatus", function () {
            var data, Role_ApprovalStage_id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action.');
            if (promptdelete) {
                data = $(this).parents('tr');
                Role_ApprovalStage_id = $(data).attr('data-Role_ApprovalStage_id');
                urlPath = "/AdminPortal/DeleteRoleApprovalStatus";
                if (Role_ApprovalStage_id != '') {
                     $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Role_ApprovalStage_id: Role_ApprovalStage_id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayApprovalStatusMessages', result.messagedata, true, 'alert alert-success');
                                rolenamejs.fn_ReloadApprovalStatusGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayApprovalStatusMessages', result.messagedata, true, 'alert alert-danger');
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
        $('#ApprovalStatusMapping').find("#dvApprovalStatusList").on("click", ".clsEditApprovalStatus", function () {
            var Role_ApprovalStage_id, data,urlPath;
            data = $(this).parents('tr');
            Role_ApprovalStage_id = $(data).attr('data-Role_ApprovalStage_id');
            urlPath = "/AdminPortal/GetApprovalStatusById";
            if (Role_ApprovalStage_id != '') {
                $('.clsEditApprovalStatus ,.clsDeleteApprovalStatus').css('display', 'none');
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Role_ApprovalStage_id: Role_ApprovalStage_id
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
                        var row = $("#MasterRowEdit_ApprovalStatus").clone();
                        $(row).find('.clsRoleName').val(result.Role_Id);
                        commonjs.fn_ReloadApprovalStageDDL(row, result.Approval_Stage_Id);
                        //$(row).find('.clsApprovalStage').val(result.Approval_Stage_Id);
                        $(row).removeAttr("style");
                        $(row).attr("data-Role_ApprovalStage_id", Role_ApprovalStage_id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $('#ApprovalStatusMapping').find("#lnkAddNewApprovalStatus").on('click', function () {
            var oTable = $('#tblApprovalStatusList').dataTable();
            oTable.fnPageChange('first');

            //get the clone row.
            var row = $("#MasterRow_ApprovalStatus").clone();
            commonjs.fn_ReloadApprovalStageDDL(row, 0);
            $(row).removeAttr("style");
            $(row).find('.clsRoleName').val('');
            $(row).find('.clsApprovalStage').val('');

            $("#tblApprovalStatusList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $('#ApprovalStatusMapping').find("#dvApprovalStatusList").on("click", ".clsCancelApprovalStatusUpdate", function () {
            var data;
           
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditApprovalStatus,.clsDeleteApprovalStatus').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $('#ApprovalStatusMapping').find("#dvApprovalStatusList").on("click", ".clsAddUpdateApprovalStatus", function () {
            var Role_ApprovalStage_id, Role_Id, Approval_Stage_Id, data,urlPath;
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            Role_ApprovalStage_id = $(data).attr('data-Role_ApprovalStage_id');
            Role_Id = $(data).find(".clsRoleName :selected").val();
            Approval_Stage_Id = $(data).find(".clsApprovalStage").val();


            //put validation here

            if (Role_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Role Name is required.</li>";

            }
            if (Approval_Stage_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Approval Stage is required .</li>";
            }

            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayApprovalStatusMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateApprovalStatus";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Role_ApprovalStage_id: Role_ApprovalStage_id,
                        Role_Id: Role_Id,
                        Approval_Stage_Id: Approval_Stage_Id
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayApprovalStatusMessages', result.messagedata, true, 'alert alert-success');
                            rolenamejs.fn_ReloadApprovalStatusGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayApprovalStatusMessages', result.messagedata, true, 'alert alert-danger');
                        }
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }
        });
    },
    ///This function refresh the grid data.
    fn_ReloadApprovalStatusGrid: function () {
        var urlPath = "/AdminPortal/GetApprovalStatusPartial";
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
                    rolenamejs.ReinitiateDataTable('tblApprovalStatusList');
                    Common.showDialog.hide();

                },
                success: function (result) {
             
                    $("#dvApprovalStatusList").html(result);
                    Common.showDialog.hide();
                },
                error: function (ex) {
                    alert(ex.responseText);
                }
            });
        }
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
    }
};