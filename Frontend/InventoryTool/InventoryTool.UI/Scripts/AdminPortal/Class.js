/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
//For Class
var Classjs = {
    init: function () {
        var obj = Classjs;
        obj.LoadClass();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadClass: function () {
      //  var obj = Classjs;
        //initial load the Datatable setting.
        Classjs.ReinitiateDataTable('tblClassList');

        $("#Class").find("#dvClassList").on("click", ".clsDeleteClass", function () {
         
            var data, Class_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action');
            if (promptdelete) {
                data = $(this).parents('tr');
                Class_Id = $(data).attr('data-Class_id');
                urlPath = "/AdminPortal/DeleteClass";
                if (Class_Id != '') {
                    $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Class_Id: Class_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayClassMessages', result.messagedata, true, 'alert alert-success');
                                Classjs.fn_ReloadClassGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayClassMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#Class").find("#dvClassList").on("click", ".clsEditClass", function () {
           
            var Class_Id, data,urlPath;
            data = $(this).parents('tr');
            Class_Id = $(data).attr('data-Class_id');
            urlPath = "/AdminPortal/GetClassByClassId";
            if (Class_Id != '') {
                $('.clsEditClass ,.clsDeleteClass').css('display', 'none');
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Class_Id: Class_Id
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
                        var row = $("#MasterRowEdit_Class").clone();
                        $(row).find('.clsClass').val(result.Class_Name);
                        $(row).removeAttr("style");
                        $(row).attr("data-Class_Id", Class_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewClass").on('click', function () {
            var oTable = $('#tblClassList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_Class").clone();
            $(row).removeAttr("style");
            $(row).find('.clsClass').val('');
            $("#tblClassList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $("#Class").find("#dvClassList").on("click", ".clsCancelClassUpdate", function () {
           
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditClass,.clsDeleteClass').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#Class").find("#dvClassList").on("click", ".clsAddUpdateClass", function () {
         
            var Class_Id, Class_Name, data,urlPath;
            var strValidationMsglists = "";
           
            data = $(this).parents('tr');
            Class_Id = $(data).attr('data-Class_Id');
            Class_Name = $(data).find(".clsClass").val();
            //put validation here
          
            if ((Class_Name == "") || ((fn_namevalidation(Class_Name)))) {
                strValidationMsglists = strValidationMsglists + "<li>Class Name is required and it shouldn’t be numeric.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayClassMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateClass";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Class_Id: Class_Id,
                       Class_Name: Class_Name
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayClassMessages', result.messagedata, true, 'alert alert-success');
                            Classjs.fn_ReloadClassGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayClassMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadClassGrid: function () {
   
        var urlPath = "/AdminPortal/GetClassPartial";
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
                    Classjs.ReinitiateDataTable('tblClassList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvClassList").html(result);
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
