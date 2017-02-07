/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
//For LabCompany
var LabCompanyjs = {
    init: function () {

        var obj = LabCompanyjs;
        obj.LoadLabCompany();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadLabCompany: function () {
        //initial load the Datatable setting.
        LabCompanyjs.ReinitiateDataTable('tblLabCompanyList');

        $("#LabCompany").find("#dvLabCompanyList").on("click", ".clsDeleteLabCompany", function () {
          
            var data, LabCompany_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action');
            if (promptdelete) {
                data = $(this).parents('tr');
                LabCompany_Id = $(data).attr('data-LabCompany_id');
                urlPath = "/AdminPortal/DeleteLabCompany";
                if (LabCompany_Id != '') {
                     $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            LabCompany_Id: LabCompany_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayLabCompanyMessages', result.messagedata, true, 'alert alert-success');
                                LabCompanyjs.fn_ReloadLabCompanyGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayLabCompanyMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#LabCompany").find("#dvLabCompanyList").on("click", ".clsEditLabCompany", function () {
          
            var LabCompany_Id, data,urlPath;
            data = $(this).parents('tr');
            LabCompany_Id = $(data).attr('data-LabCompany_id');
            urlPath = "/AdminPortal/GetLabCompanyByLabCompanyId";
            if (LabCompany_Id != '') {
                $('.clsEditLabCompany ,.clsDeleteLabCompany').css('display', 'none');
                $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        LabCompany_Id: LabCompany_Id
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
                        var row = $("#MasterRowEdit_LabCompany").clone();
                        $(row).find('.clsLabCompanyCode').val(result.LabCompany_Code);
                        $(row).find('.clsLabCompany').val(result.LabCompany_Name);
                        $(row).removeAttr("style");
                        $(row).attr("data-LabCompany_Id", LabCompany_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewLabCompany").on('click', function () {
            var oTable = $('#tblLabCompanyList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_LabCompany").clone();
            $(row).removeAttr("style");
            $(row).find('.clsLabCompany').val('');
            $(row).find('.clsLabCompanyCode').val('');
            $("#tblLabCompanyList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $("#LabCompany").find("#dvLabCompanyList").on("click", ".clsCancelLabCompanyUpdate", function () {
         
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditLabCompany,.clsDeleteLabCompany').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#LabCompany").find("#dvLabCompanyList").on("click", ".clsAddUpdateLabCompany", function () {
      
            var LabCompany_Id, LabCompany_Code, LabCompany_Name, data, urlPath;
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            LabCompany_Id = $(data).attr('data-LabCompany_Id');
            LabCompany_Name = $(data).find(".clsLabCompany").val();
            LabCompany_Code = $(data).find(".clsLabCompanyCode").val();
          
            //put validation here
            if ((fn_numbervalidation(LabCompany_Code))) {
                strValidationMsglists = strValidationMsglists + "<li>Lab Code is required and should be numeric.</li>";
            }
            if ((LabCompany_Name == "") || ((fn_namevalidation(LabCompany_Name)))) {
                strValidationMsglists = strValidationMsglists + "<li>Company code is required and it shouldn’t be numeric.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayLabCompanyMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateLabCompany";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        LabCompany_Id: LabCompany_Id,
                        LabCompany_Name: LabCompany_Name,
                        LabCompany_Code: LabCompany_Code
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayLabCompanyMessages', result.messagedata, true, 'alert alert-success');
                            LabCompanyjs.fn_ReloadLabCompanyGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayLabCompanyMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadLabCompanyGrid: function () {
      
        var urlPath = "/AdminPortal/GetLabCompanyPartial";
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
                    LabCompanyjs.ReinitiateDataTable('tblLabCompanyList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvLabCompanyList").html(result);
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