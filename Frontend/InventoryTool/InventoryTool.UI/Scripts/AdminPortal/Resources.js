/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
//Resource Type
var resourcejs = {
    init: function () {
        var obj = resourcejs;
        obj.LoadResource();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadResource: function () {
        //initial load the Datatable setting.
        resourcejs.ReinitiateDataTable('tblResourceList');
        $("#field2").find("#resource").find("#dvResourceList").on("click", ".clsDeleteResource", function () {
            
            var data, Resource_Type_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action');
            if (promptdelete) {
                data = $(this).parents('tr');
                Resource_Type_Id = $(data).attr('data-Resource_Type_Id');
                urlPath = "/AdminPortal/DeleteResource";
                if (Resource_Type_Id != '') {
                    $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Resource_Type_Id: Resource_Type_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayResourceMessages', result.messagedata, true, 'alert alert-success');
                                resourcejs.fn_ReloadResourceGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayResourceMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#field2").find("#resource").find("#dvResourceList").on("click", ".clsEditResource", function () {
            
            var Resource_Type_Id, data,urlPath;
            data = $(this).parents('tr');
            Resource_Type_Id = $(data).attr('data-Resource_Type_Id');
            urlPath = "/AdminPortal/GetResourceByResourceId";
            if (Resource_Type_Id != '') {
                $('.clsEditResource ,.clsDeleteResource').css('display', 'none');
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Resource_Type_Id: Resource_Type_Id
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
                        var row = $("#MasterRowEdit_Resource").clone();
                        $(row).find('.clsresource').val(result.Resource_Type);   
                        $(row).removeAttr("style");
                        $(row).attr("data-Resource_Type_Id", Resource_Type_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewResource").on('click', function () {
            var oTable = $('#tblResourceList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_Resource").clone();
            $(row).removeAttr("style");
            $(row).find('.clsresource').val('');
            $("#tblResourceList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $("#field2").find("#resource").find("#dvResourceList").on("click", ".clsCancelResourceUpdate", function () {
            
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditResource,.clsDeleteResource').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#field2").find("#resource").find("#dvResourceList").on("click", ".clsAddUpdateResource", function () {
               
            var Resource_Type_Id, Resource_Type, data,urlPath;
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            Resource_Type_Id = $(data).attr('data-Resource_Type_Id');
            Resource_Type = $(data).find(".clsresource").val();
           
            //put validation here
            if ((Resource_Type == "") || (fn_namevalidation(Resource_Type))) {
                strValidationMsglists = strValidationMsglists + "<li>Resource Type is required and it shouldn’t be numeric..</li>";
            }
            
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayResourceMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateResource";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Resource_Type_Id: Resource_Type_Id,
                        Resource_Type: Resource_Type
                        
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayResourceMessages', result.messagedata, true, 'alert alert-success');
                            resourcejs.fn_ReloadResourceGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayResourceMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadResourceGrid: function () {
        
        var urlPath = "/AdminPortal/GetResourcePartial";
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
                    resourcejs.ReinitiateDataTable('tblResourceList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvResourceList").html(result);
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
