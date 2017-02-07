/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
//For Release
var Releasejs = {
    init: function () {
        var obj = Releasejs;
        obj.LoadRelease();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadRelease: function () {
        //initial load the Datatable setting.
        Releasejs.ReinitiateDataTable('tblReleaseList');

        $("#Release").find("#dvReleaseList").on("click", ".clsDeleteRelease", function () {
            var data, Release_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action');
            if (promptdelete) {
                data = $(this).parents('tr');
                Release_Id = $(data).attr('data-Release_id');
                urlPath = "/AdminPortal/DeleteRelease";
                if (Release_Id != '') {
                     $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Release_Id: Release_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayReleaseMessages', result.messagedata, true, 'alert alert-success');
                                Releasejs.fn_ReloadReleaseGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayReleaseMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#Release").find("#dvReleaseList").on("click", ".clsEditRelease", function () {
         
            var  Release_Id, data,urlPath;
            data = $(this).parents('tr');
            Release_Id = $(data).attr('data-Release_id');
            urlPath = "/AdminPortal/GetReleaseByReleaseId";
            if (Release_Id != '') {
                $('.clsEditRelease ,.clsDeleteRelease').css('display', 'none');
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Release_Id: Release_Id
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
                        var row = $("#MasterRowEdit_Release").clone();
                        $(row).find('.clsGroup').val(result.Group_Id);
                        $(row).find('.clsRelease').val(result.Release_Name);
                        $(row).removeAttr("style");
                        $(row).attr("data-Release_Id", Release_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewRelease").on('click', function () {
            var oTable = $('#tblReleaseList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_Release").clone();
            $(row).removeAttr("style");
            $(row).find('.clsRelease').val('');
            $("#tblReleaseList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $("#Release").find("#dvReleaseList").on("click", ".clsCancelReleaseUpdate", function () {
        
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditRelease,.clsDeleteRelease').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#Release").find("#dvReleaseList").on("click", ".clsAddUpdateRelease", function () {
       
            var Release_Id, Release_Name, data,urlPath;
            var strValidationMsglists = "";
        
            data = $(this).parents('tr');
            Release_Id = $(data).attr('data-Release_Id');
            Release_Name = $(data).find(".clsRelease").val();
            //put validation here

           if ((Release_Name == "") || ((fn_namevalidation(Release_Name)))) {
                strValidationMsglists = strValidationMsglists + "<li>Release Name is required and it shouldn’t be numeric.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayReleaseMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateRelease";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Release_Id: Release_Id,
                        Release_Name: Release_Name
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayReleaseMessages', result.messagedata, true, 'alert alert-success');
                            Releasejs.fn_ReloadReleaseGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayReleaseMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadReleaseGrid: function () {
        var urlPath = "/AdminPortal/GetReleasePartial";
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
                    Releasejs.ReinitiateDataTable('tblReleaseList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvReleaseList").html(result);
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