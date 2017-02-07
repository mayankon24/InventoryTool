/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
//For InvestmentType
var InvestmentTypejs = {
    init: function () {
        var obj = InvestmentTypejs;
        obj.LoadInvestmentType();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadInvestmentType: function () {
        //initial load the Datatable setting.
        InvestmentTypejs.ReinitiateDataTable('tblInvestmentTypeList');

        $("#InvestmentType").find("#dvInvestmentTypeList").on("click", ".clsDeleteInvestmentType", function () {
           
            var data, Investment_Type_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action');
            if (promptdelete) {
                data = $(this).parents('tr');
                Investment_Type_Id = $(data).attr('data-InvestmentType_id');
                urlPath = "/AdminPortal/DeleteInvestmentType";
                if (Investment_Type_Id != '') {
                    $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Investment_Type_Id: Investment_Type_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayInvestmentTypeMessages', result.messagedata, true, 'alert alert-success');
                                InvestmentTypejs.fn_ReloadInvestmentTypeGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayInvestmentTypeMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#InvestmentType").find("#dvInvestmentTypeList").on("click", ".clsEditInvestmentType", function () {
          
            var Investment_Type_Id, data, urlPath;
            data = $(this).parents('tr');
            Investment_Type_Id = $(data).attr('data-InvestmentType_id');
            urlPath = "/AdminPortal/GetInvestmentTypeByInvestmentTypeId";
            if (Investment_Type_Id != '') {
                $('.clsEditInvestmentType ,.clsDeleteInvestmentType').css('display', 'none');
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Investment_Type_Id: Investment_Type_Id
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
                        var row = $("#MasterRowEdit_InvestmentType").clone();
                        $(row).find('.clsInvestmentType').val(result.Investment_Type);
                        $(row).removeAttr("style");
                        $(row).attr("data-InvestmentType_Id", Investment_Type_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewInvestmentType").on('click', function () {
            var oTable = $('#tblInvestmentTypeList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_InvestmentType").clone();
            $(row).removeAttr("style");
            $(row).find('.clsInvestmentType').val('');
            $("#tblInvestmentTypeList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $("#InvestmentType").find("#dvInvestmentTypeList").on("click", ".clsCancelInvestmentTypeUpdate", function () {
            
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditInvestmentType,.clsDeleteInvestmentType').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#InvestmentType").find("#dvInvestmentTypeList").on("click", ".clsAddUpdateInvestmentType", function () {
        
            var Investment_Type_Id, Investment_Type, data,urlPath;
            var strValidationMsglists = "";
          
            data = $(this).parents('tr');
            Investment_Type_Id = $(data).attr('data-InvestmentType_Id');
            Investment_Type = $(data).find(".clsInvestmentType").val();
            //put validation here
            if ((Investment_Type == "") || ((fn_namevalidation(Investment_Type)))) {
                strValidationMsglists = strValidationMsglists + "<li>Investment Type is required and it shouldn’t be numeric.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayInvestmentTypeMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateInvestmentType";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Investment_Type_Id: Investment_Type_Id,
                        Investment_Type: Investment_Type
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayInvestmentTypeMessages', result.messagedata, true, 'alert alert-success');
                            InvestmentTypejs.fn_ReloadInvestmentTypeGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayInvestmentTypeMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadInvestmentTypeGrid: function () {
        var urlPath = "/AdminPortal/GetInvestmentTypePartial";
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
                    InvestmentTypejs.ReinitiateDataTable('tblInvestmentTypeList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvInvestmentTypeList").html(result);
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