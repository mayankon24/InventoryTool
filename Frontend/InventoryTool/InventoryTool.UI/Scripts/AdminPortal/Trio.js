/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
var Triojs = {
    init: function () {
        var obj = Triojs;
        obj.LoadTrio();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadTrio: function () {
        //initial load the Datatable setting.
        Triojs.ReinitiateDataTable('tblTrioList');
        $('#field1').find("#Trio").find("#dvTrioList").on("click", ".clsDeleteTrio", function () {
           
            var data, Trio_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action');
            if (promptdelete) {
                data = $(this).parents('tr');
                Trio_Id = $(data).attr('data-Trio_id');
                urlPath = "/AdminPortal/DeleteTrio";
                if (Trio_Id != '') {
                     $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Trio_Id: Trio_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayTrioMessages', result.messagedata, true, 'alert alert-success');
                                Triojs.fn_ReloadTrioGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayTrioMessages', result.messagedata, true, 'alert alert-danger');
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
        $('#field1').find("#Trio").find("#dvTrioList").on("click", ".clsEditTrio", function () {
          
            var  Trio_Id, data,urlPath;
            data = $(this).parents('tr');
            Trio_Id = $(data).attr('data-Trio_id');
            urlPath = "/AdminPortal/GetTrioByTrioId";
            if (Trio_Id != '') {
                $('.clsEditTrio ,.clsDeleteTrio').css('display', 'none');
                $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Trio_Id: Trio_Id
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
                        var row = $("#MasterRowEdit_Trio").clone();
                       
                        $(row).find('.clsTrio').val(result.Trio_Name);
                        $(row).removeAttr("style");
                        $(row).attr("data-Trio_Id", Trio_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewTrio").on('click', function () {
            
            var oTable = $('#tblTrioList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_Trio").clone();
            $(row).removeAttr("style");
            $(row).find('.clsTrio').val('');
            $("#tblTrioList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $('#field1').find("#Trio").find("#dvTrioList").on("click", ".clsCancelTrioUpdate", function () {
           
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditTrio,.clsDeleteTrio').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $('#field1').find("#Trio").find("#dvTrioList").on("click", ".clsAddUpdateTrio", function () {
            var Trio_Id, Trio_Name, data,urlPath;
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            Trio_Id = $(data).attr('data-Trio_Id');
           
            Trio_Name = $(data).find(".clsTrio").val();
            //put validation here
           
            if ((Trio_Name == "") || ((fn_namevalidation(Trio_Name)))) {
                strValidationMsglists = strValidationMsglists + "<li>Trio Name is required and it shouldn’t be numeric.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayTrioMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateTrio";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Trio_Id: Trio_Id,
                        Trio_Name: Trio_Name
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayTrioMessages', result.messagedata, true, 'alert alert-success');
                            Triojs.fn_ReloadTrioGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayTrioMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadTrioGrid: function () {
        
        var urlPath = "/AdminPortal/GetTrioPartial";
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
                    Triojs.ReinitiateDataTable('tblTrioList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvTrioList").html(result);
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