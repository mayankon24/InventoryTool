/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/

//Position Type
var positionjs = {
    init: function () {
        var obj = positionjs;
        obj.LoadPosition();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadPosition: function () {
        //initial load the Datatable setting.
        positionjs.ReinitiateDataTable('tblPositionList');
        $("#field2").find("#position").find("#dvPositionList").on("click", ".clsDeletePosition", function () {
            
            var data, Position_Id, urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action');
            if (promptdelete) {
                data = $(this).parents('tr');
                Position_Id = $(data).attr('data-Position_Id');
                urlPath = "/AdminPortal/DeletePosition";
                if (Position_Id != '') {
                     $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Position_Id: Position_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayPositionMessages', result.messagedata, true, 'alert alert-success');
                                positionjs.fn_ReloadPositionGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayPositionMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#field2").find("#position").find("#dvPositionList").on("click", ".clsEditPosition", function () {
            
            var Position_Id, data, urlPath;
            data = $(this).parents('tr');
            Position_Id = $(data).attr('data-Position_Id');
            urlPath = "/AdminPortal/GetPositionByPositionId";
            if (Position_Id != '') {
                $('.clsEditPosition ,.clsDeletePosition').css('display', 'none');
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Position_Id: Position_Id
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
                        var row = $("#MasterRowEdit_Position").clone();
                        $(row).find('.clstitle').val(result.Position_Name);
                        $(row).find('.clsrate').val(result.rate);
                        $(row).removeAttr("style");
                        $(row).attr("data-Position_Id", Position_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewPosition").on('click', function () {
            var oTable = $('#tblPositionList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_Position").clone();
            $(row).removeAttr("style");
            $(row).find('.clstitle').val('');
            $(row).find('.clsrate').val('');
            $("#tblPositionList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $("#field2").find("#position").find("#dvPositionList").on("click", ".clsCancelPositionUpdate", function () {
            
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditPosition,.clsDeletePosition').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#field2").find("#position").find("#dvPositionList").on("click", ".clsAddUpdatePosition", function () {
            var Position_Id, Position_Name, rate, data, urlPath;
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            Position_Id = $(data).attr('data-Position_Id');
            Position_Name = $(data).find(".clstitle").val();
            rate = $(data).find(".clsrate").val();
            //put validation here
            if ((Position_Name == "") || (fn_namevalidation(Position_Name))) {
                strValidationMsglists = strValidationMsglists + "<li>Position Name is required and it shouldn’t be numeric.</li>";
            }
            if (fn_numbervalidation(rate)) {
                strValidationMsglists = strValidationMsglists + "<li>rate  is required and should be numeric.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayPositionMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdatePosition";
            if (true) {
                $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Position_Id: Position_Id,
                        Position_Name: Position_Name,
                        rate: rate
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayPositionMessages', result.messagedata, true, 'alert alert-success');
                            positionjs.fn_ReloadPositionGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayPositionMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadPositionGrid: function () {
        var urlPath = "/AdminPortal/GetPositionPartial";
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
                    positionjs.ReinitiateDataTable('tblPositionList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvPositionList").html(result);
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