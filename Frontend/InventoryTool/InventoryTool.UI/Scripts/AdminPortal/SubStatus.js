/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/

//lineitemsubstatus
var substatusjs = {
    init: function () {
        var obj = substatusjs;
        obj.LoadSubStatus();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadSubStatus: function () {
        //initial load the Datatable setting.
        substatusjs.ReinitiateDataTable('tblSubStatusList');
        $('#LineItemSubStatus').find("#dvSubStatusList").on("click", ".clsDeleteApprovalStageAndStatus", function () {
            var data, ApprovalStage_ApprovalStatus_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action.');
            if (promptdelete) {
                data = $(this).parents('tr');
                ApprovalStage_ApprovalStatus_Id = $(data).attr('data-ApprovalStage_ApprovalStatus_Id');
                urlPath = "/AdminPortal/DeleteApprovalStageAndStatus";
                if (ApprovalStage_ApprovalStatus_Id != '') {
                     $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            ApprovalStage_ApprovalStatus_Id: ApprovalStage_ApprovalStatus_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySubStatusMessages', result.messagedata, true, 'alert alert-success');
                                substatusjs.fn_ReloadApprovalStageStatusGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySubStatusMessages', result.messagedata, true, 'alert alert-danger');
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
        $('#LineItemSubStatus').find("#dvSubStatusList").on("click", ".clsEditApprovalStageAndStatus", function () {
            var  ApprovalStage_ApprovalStatus_Id, data,urlPath;
            data = $(this).parents('tr');
            ApprovalStage_ApprovalStatus_Id = $(data).attr('data-ApprovalStage_ApprovalStatus_Id');
            urlPath = "/AdminPortal/GetApprovalStageAndStatus";
            if (ApprovalStage_ApprovalStatus_Id != '') {
                $('.clsEditApprovalStageAndStatus ,.clsDeleteApprovalStageAndStatus').css('display', 'none');
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        ApprovalStage_ApprovalStatus_Id: ApprovalStage_ApprovalStatus_Id
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
                        var row = $("#MasterRowEdit_SubStatus").clone();
                        commonjs.fn_ReloadApprovalStageDDL(row, result.Approval_Stage_Id)
                        // $(row).find('.clsApprovalStage').val(result.Approval_Stage_Id);
                        $(row).find('.clsApprovalStatus').val(result.Approval_Status_Id);
                        if (result.IsBudgetRequestLocked == true) {
                            $(row).find('.clsbudgetlocked').val(1);
                        }
                        else {
                            $(row).find('.clsbudgetlocked').val(0);
                        }


                        $(row).removeAttr("style");
                        $(row).attr("data-ApprovalStage_ApprovalStatus_Id", ApprovalStage_ApprovalStatus_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $('#LineItemSubStatus').find("#lnkAddNewSubStatus").on('click', function () {
            var oTable = $('#tblSubStatusList').dataTable();
            oTable.fnPageChange('first');

            //get the clone row.
            var row = $("#MasterRow_SubStatus").clone();
            commonjs.fn_ReloadApprovalStageDDL(row, 0);
            $(row).removeAttr("style");
            $(row).find('.clsApprovalStage').val('');
            $(row).find('.clsApprovalStatus').val('');
            $(row).find('.clsbudgetlocked').val('');
            $("#tblSubStatusList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $('#LineItemSubStatus').find("#dvSubStatusList").on("click", ".clsCancelApprovalStageUpdate", function () {
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditApprovalStageAndStatus ,.clsDeleteApprovalStageAndStatus').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $('#LineItemSubStatus').find("#dvSubStatusList").on("click", ".clsAddUpdateApprovalStageAndStatus", function () {
            var ApprovalStage_ApprovalStatus_Id, Approval_Stage_Id, Approval_Status_Id, IsBudgetRequestLocked, data,urlPath;
     
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            ApprovalStage_ApprovalStatus_Id = $(data).attr('data-ApprovalStage_ApprovalStatus_Id');
            Approval_Stage_Id = $(data).find(".clsApprovalStage :selected").val();

            Approval_Status_Id = $(data).find(".clsApprovalStatus :selected").val();

            IsBudgetRequestLocked = $(data).find(".clsbudgetlocked :selected").text();
            //put validation here

            if (Approval_Stage_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Approval Stage Name is required.</li>";

            }
            if (Approval_Status_Id == "") {
                strValidationMsglists = strValidationMsglists + "<li>Approval Status Name is required .</li>";
            }
            if (IsBudgetRequestLocked == "") {
                strValidationMsglists = strValidationMsglists + "<li>Budget Request Locked is required.</li>";
            }

            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySubStatusMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateApprovalStageAndStatus";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        ApprovalStage_ApprovalStatus_Id: ApprovalStage_ApprovalStatus_Id,
                        Approval_Stage_Id: Approval_Stage_Id,
                        Approval_Status_Id: Approval_Status_Id,

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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySubStatusMessages', result.messagedata, true, 'alert alert-success');
                            substatusjs.fn_ReloadApprovalStageStatusGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySubStatusMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadApprovalStageStatusGrid: function () {
    
        var urlPath = "/AdminPortal/GetApprovalStageAndStatusPartial";
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
                    substatusjs.ReinitiateDataTable('tblSubStatusList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvSubStatusList").html(result);
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
            bFilter: false, bInfo: false, bLengthChange: false, "order": [0, 'asc'],
            "aoColumnDefs": [
 {
     'bSortable': false,
     'aTargets': ['action-col', 'text-holder']
 }]
        }
          );
    }
};