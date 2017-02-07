/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
//For Category
var Categoryjs = {
    init: function () {
        var obj = Categoryjs;
        obj.LoadCategory();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadCategory: function () {
       // var obj = Categoryjs;
        //initial load the Datatable setting.
        Categoryjs.ReinitiateDataTable('tblCategoryList');

        $("#Category").find("#dvCategoryList").on("click", ".clsDeleteCategory", function () {
           
            var data, Category_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action');
            if (promptdelete) {
                data = $(this).parents('tr');
                Category_Id = $(data).attr('data-Category_id');
                urlPath = "/AdminPortal/DeleteCategory";
                if (Category_Id != '') {
                    $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Category_Id: Category_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayCategoryMessages', result.messagedata, true, 'alert alert-success');
                                Categoryjs.fn_ReloadCategoryGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayCategoryMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#Category").find("#dvCategoryList").on("click", ".clsEditCategory", function () {
            var data = $(this).parents('tr');
            var Category_Id = $(data).attr('data-Category_id');
            var urlPath = "/AdminPortal/GetCategoryByCategoryId";
            if (Category_Id != '') {
                $('.clsEditCategory ,.clsDeleteCategory').css('display', 'none');
                $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Category_Id: Category_Id
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
                        var row = $("#MasterRowEdit_Category").clone();
                        $(row).find('.clsCategoryName').val(result.Category_Name);
                        $(row).find('.clsCategoryType').val(result.Category_Type_Id);
                        $(row).find('.clsDelay').val(result.Delay_Factor);
                        $(row).removeAttr("style");
                        $(row).attr("data-Category_Id", Category_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewCategory").on('click', function () {
            var oTable = $('#tblCategoryList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_Category").clone();
            $(row).removeAttr("style");
            $(row).find('.clsCategoryName').val('');
            $(row).find('.clsCategoryType').val('');
            $(row).find('.clsDelay').val('');
            $("#tblCategoryList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $("#Category").find("#dvCategoryList").on("click", ".clsCancelCategoryUpdate", function () {
            var data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditCategory,.clsDeleteCategory').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#Category").find("#dvCategoryList").on("click", ".clsAddUpdateCategory", function () {
           
            var Category_Id, Category_Type_Id, Category_Name,Delay_Factor, data,urlPath;
            var strValidationMsglists = "";
           
            data = $(this).parents('tr');
            Category_Id = $(data).attr('data-Category_Id');
            Category_Name = $(data).find(".clsCategoryName").val();
            Category_Type_Id = $(data).find(".clsCategoryType :selected").val();
            Delay_Factor = $(data).find(".clsDelay").val();
            
            //put validation here
           
            if ((Category_Name == "") || ((fn_namevalidation(Category_Name)))) {
                strValidationMsglists = strValidationMsglists + "<li>Category Name is required and it shouldn’t be numeric.</li>";
            }
            if (Category_Type_Id == "") {
                strValidationMsglists = strValidationMsglists + "<li>Category Type is Requried.</li>";
            }
            if ((Delay_Factor == "") || ((fn_numbervalidation(Delay_Factor)))) {
                strValidationMsglists = strValidationMsglists + "<li>Delay Factor is required and it should be numeric.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>";
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayCategoryMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateCategory";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Category_Id: Category_Id,
                        Category_Name: Category_Name,
                        Category_Type_Id: Category_Type_Id,
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayCategoryMessages', result.messagedata, true, 'alert alert-success');
                            Categoryjs.fn_ReloadCategoryGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayCategoryMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadCategoryGrid: function () {
       
        var urlPath = "/AdminPortal/GetCategoryPartial";
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
                    Categoryjs.ReinitiateDataTable('tblCategoryList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvCategoryList").html(result);
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
