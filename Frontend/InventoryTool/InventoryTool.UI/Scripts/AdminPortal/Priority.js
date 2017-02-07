/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
var Priorityjs = {
    init: function () {
        var obj = Priorityjs;
        obj.LoadPriority();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadPriority: function () {
        //initial load the Datatable setting.
        Priorityjs.ReinitiateDataTable('tblPriorityList');

        $('#field1').find("#Priority").find("#dvPriorityList").on("click", ".clsDeletePriority", function () {
           
            var data, Priority_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action');
            if (promptdelete) {
                data = $(this).parents('tr');
                Priority_Id = $(data).attr('data-Priority_id');
                urlPath = "/AdminPortal/DeletePriority";
                if (Priority_Id != '') {
                    $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Priority_Id: Priority_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayPriorityMessages', result.messagedata, true, 'alert alert-success');
                                Priorityjs.fn_ReloadPriorityGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayPriorityMessages', result.messagedata, true, 'alert alert-danger');
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
        $('#field1').find("#Priority").find("#dvPriorityList").on("click", ".clsEditPriority", function () {
           
            var Priority_Id, data, urlPath;
            data = $(this).parents('tr');
            Priority_Id = $(data).attr('data-Priority_id');
            urlPath = "/AdminPortal/GetPriorityByPriorityId";
            if (Priority_Id != '') {
                $('.clsEditPriority ,.clsDeletePriority').css('display', 'none');
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Priority_Id: Priority_Id
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
                        var row = $("#MasterRowEdit_Priority").clone();

                        $(row).find('.clsPriority').val(result.Priority_Name);
                        $(row).removeAttr("style");
                        $(row).attr("data-Priority_Id", Priority_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewPriority").on('click', function () {
           
            var oTable = $('#tblPriorityList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_Priority").clone();
            $(row).removeAttr("style");
            $(row).find('.clsPriority').val('');
            $("#tblPriorityList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $('#field1').find("#Priority").find("#dvPriorityList").on("click", ".clsCancelPriorityUpdate", function () {
          
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditPriority,.clsDeletePriority').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $('#field1').find("#Priority").find("#dvPriorityList").on("click", ".clsAddUpdatePriority", function () {
            var  Priority_Id, Priority_Name, data,urlPath;
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            Priority_Id = $(data).attr('data-Priority_Id');
            Priority_Name = $(data).find(".clsPriority").val();
            //put validation here

            if ((Priority_Name == "") || ((fn_numbervalidation(Priority_Name)))) {
                strValidationMsglists = strValidationMsglists + "<li>Priority Name is required and it should be numeric.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayPriorityMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdatePriority";
            if (true) {
                $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Priority_Id: Priority_Id,
                        Priority_Name: Priority_Name
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayPriorityMessages', result.messagedata, true, 'alert alert-success');
                            Priorityjs.fn_ReloadPriorityGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayPriorityMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadPriorityGrid: function () {
        var urlPath = "/AdminPortal/GetPriorityPartial";
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
                    Priorityjs.ReinitiateDataTable('tblPriorityList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvPriorityList").html(result);
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
