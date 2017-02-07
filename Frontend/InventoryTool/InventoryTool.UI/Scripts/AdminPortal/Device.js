/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/

//Device Type
var devicejs = {
    init: function () {
        var obj = devicejs;
        obj.LoadDevices();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadDevices: function () {
      //  var obj = devicejs;
        //initial load the Datatable setting.
        devicejs.ReinitiateDataTable('tblDeviceList');
        $("#field2").find("#device").find("#dvDeviceList").on("click", ".clsDeleteDevice", function () {
            
            var data, Device_Type_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action');
            if (promptdelete) {
                data = $(this).parents('tr');
                Device_Type_Id = $(data).attr('data-Device_Type_Id');
                urlPath = "/AdminPortal/DeleteDevice";
                if (Device_Type_Id != '') {
                    $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Device_Type_Id: Device_Type_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayDeviceMessages', result.messagedata, true, 'alert alert-success');
                                devicejs.fn_ReloadDeviceGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayDeviceMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#field2").find("#device").find("#dvDeviceList").on("click", ".clsEditDevice", function () {
            
            var  Device_Type_Id, data,urlPath;
            data = $(this).parents('tr');
            Device_Type_Id = $(data).attr('data-Device_Type_Id');
            urlPath = "/AdminPortal/GetDeviceByDeviceId";
            if (Device_Type_Id != '') {
                $('.clsEditDevice ,.clsDeleteDevice').css('display', 'none');
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Device_Type_Id: Device_Type_Id
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
                        var row = $("#MasterRowEdit_Device").clone();
                        $(row).find('.clsdevicetype').val(result.Device_Type_Name);
                        $(row).find('.clsdepreciation').val(result.Depreciation_Month);
                        $(row).find('.clsDelay').val(result.Delay_Factor);
                        $(row).removeAttr("style");
                        $(row).attr("data-Device_Type_Id", Device_Type_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewDevice").on('click', function () {
            var oTable = $('#tblDeviceList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_Device").clone();
            $(row).removeAttr("style");
            $(row).find('.clsdevicetype').val('');
            $(row).find('.clsdepreciation').val('');
            $(row).find('.clsDelay').val('');
            $("#tblDeviceList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $("#field2").find("#device").find("#dvDeviceList").on("click", ".clsCancelDeviceUpdate", function () {
            
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditDevice,.clsDeleteDevice').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#field2").find("#device").find("#dvDeviceList").on("click", ".clsAddUpdateDevice", function () {
            
            var  Device_Type_Id, Device_Type_Name, Depreciation_Month,Delay_Factor, data,urlPath;
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            Device_Type_Id = $(data).attr('data-Device_Type_Id');
            Device_Type_Name = $(data).find(".clsdevicetype").val();
            Depreciation_Month = $(data).find(".clsdepreciation").val();
            Delay_Factor = $(data).find(".clsDelay").val();
            
            //put validation here
            if ((Device_Type_Name == "") || (fn_namevalidation(Device_Type_Name))) {
                strValidationMsglists = strValidationMsglists + "<li>Device Type Name is required and it shouldn’t be numeric.</li>";
            }
            if (((Depreciation_Month % 12 != 0) && (Depreciation_Month != 1)) || (fn_numbervalidation(Depreciation_Month))) {
                strValidationMsglists = strValidationMsglists + "<li>Depreciation month is required and it should be numeric.Error! The Value you have provided is neither multiple of 12 nor equal to 1.</li>";
            }
            if ((Delay_Factor == "") || (fn_numbervalidation(Delay_Factor))) {
                strValidationMsglists = strValidationMsglists + "<li>Delay Factor is required and it should be numeric.</li>";
            }
            
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayDeviceMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateDevice";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Device_Type_Id: Device_Type_Id,
                        Device_Type_Name: Device_Type_Name,
                        Depreciation_Month: Depreciation_Month,
                        Delay_Factor: Delay_Factor
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayDeviceMessages', result.messagedata, true, 'alert alert-success');
                            devicejs.fn_ReloadDeviceGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayDeviceMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadDeviceGrid: function () {
        
        var urlPath = "/AdminPortal/GetDevicePartial";
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
                    devicejs.ReinitiateDataTable('tblDeviceList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvDeviceList").html(result);
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
        bFilter: false, bInfo: false, bLengthChange: false, "order": [0,'asc'],
        "aoColumnDefs": [
{
    'bSortable': false,
    'aTargets': ['action-col', 'text-holder']
}]
    }
      );
}
    
};