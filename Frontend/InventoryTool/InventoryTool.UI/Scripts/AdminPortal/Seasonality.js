/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/

//Seasonality Type
var seasonalityjs = {
    init: function () {
        var obj = seasonalityjs;
        obj.LoadSeasonality();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadSeasonality: function () {
        //initial load the Datatable setting.
        seasonalityjs.ReinitiateDataTable('tblSeasonalityList');
        $("#field2").find("#seasonality").find("#dvSeasonalityList").on("click", ".clsDeleteSeasonality", function () {
            
            var data, Seasonality_Type_Id, urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action');
            if (promptdelete) {
                data = $(this).parents('tr');
                Seasonality_Type_Id = $(data).attr('data-Seasonality_Type_Id');
                urlPath = "/AdminPortal/DeleteSeasonality";
                if (Seasonality_Type_Id != '') {
                     $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Seasonality_Type_Id: Seasonality_Type_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySeasonalityMessages', result.messagedata, true, 'alert alert-success');
                                seasonalityjs.fn_ReloadSeasonalityGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySeasonalityMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#field2").find("#seasonality").find("#dvSeasonalityList").on("click", ".clsEditSeasonality", function () {
            
            var Seasonality_Type_Id, data, urlPath;
            data = $(this).parents('tr');
            Seasonality_Type_Id = $(data).attr('data-Seasonality_Type_Id');
            urlPath = "/AdminPortal/GetSeasonalityBySeasonalityId";
            if (Seasonality_Type_Id != '') {
                $('.clsEditSeasonality ,.clsDeleteSeasonality').css('display', 'none');
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Seasonality_Type_Id: Seasonality_Type_Id
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
                        var row = $("#MasterRowEdit_Seasonality").clone();
                        $(row).find('.clsseasonalitytype').val(result.Seasonality_Type_Name);
                        $(row).removeAttr("style");
                        $(row).attr("data-Seasonality_Type_Id", Seasonality_Type_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewSeasonality").on('click', function () {
            var oTable = $('#tblSeasonalityList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_Seasonality").clone();
            $(row).removeAttr("style");
            $(row).find('.clsseasonalitytype').val('');
            $("#tblSeasonalityList>tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $("#field2").find("#seasonality").find("#dvSeasonalityList").on("click", ".clsCancelSeasonalityUpdate", function () {
            
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditSeasonality,.clsDeleteSeasonality').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#field2").find("#seasonality").find("#dvSeasonalityList").on("click", ".clsAddUpdateSeasonality", function () {
                       
            var Seasonality_Type_Id, Seasonality_Type_Name, data,urlPath;
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            Seasonality_Type_Id = $(data).attr('data-Seasonality_Type_Id');
            Seasonality_Type_Name = $(data).find(".clsseasonalitytype").val();
            
            //put validation here
            if ((Seasonality_Type_Name == "") || (fn_namevalidation(Seasonality_Type_Name))) {
                strValidationMsglists = strValidationMsglists + "<li>Seasonality Type Name is required and it shouldn’t be numeric.</li>";
            }
            
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySeasonalityMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateSeasonality";
            if (true) {
                $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Seasonality_Type_Id: Seasonality_Type_Id,
                        Seasonality_Type_Name: Seasonality_Type_Name
                       
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySeasonalityMessages', result.messagedata, true, 'alert alert-success');
                            seasonalityjs.fn_ReloadSeasonalityGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySeasonalityMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadSeasonalityGrid: function () {
        
        var urlPath = "/AdminPortal/GetSeasonalityPartial";
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
                    seasonalityjs.ReinitiateDataTable('tblSeasonalityList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvSeasonalityList").html(result);
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