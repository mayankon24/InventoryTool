/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
//For Product
var Productjs = {
    init: function () {
        var obj = Productjs;
        obj.LoadProduct();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadProduct: function () {
        //  var obj = Productjs;
        //initial load the Datatable setting.
        Productjs.ReinitiateDataTable('tblProductList');

        $("#Product").find("#dvProductList").on("click", ".clsDeleteProduct", function () {

            var data, Product_Id, urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action');
            if (promptdelete) {
                data = $(this).parents('tr');
                Product_Id = $(data).attr('data-Product_id');
                urlPath = "/AdminPortal/DeleteProduct";
                if (Product_Id != '') {
                    $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Product_Id: Product_Id
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
                                fn_ShowHideUserMessageDivWithCssProduct_common('divDisplayProductMessages', result.messagedata, true, 'alert alert-success');
                                Productjs.fn_ReloadProductGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssProduct_common('divDisplayProductMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#Product").find("#dvProductList").on("click", ".clsEditProduct", function () {

            var Product_Id, data, urlPath;
            data = $(this).parents('tr');
            Product_Id = $(data).attr('data-Product_id');
            urlPath = "/AdminPortal/GetProductByProductId";
            if (Product_Id != '') {
                $('.clsEditProduct ,.clsDeleteProduct').css('display', 'none');
                $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Product_Id: Product_Id
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
                        var row = $("#MasterRowEdit_Product").clone();
                        $(row).find('.clsProduct').val(result.Product_Name);
                        $(row).removeAttr("style");
                        $(row).attr("data-Product_Id", Product_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewProduct").on('click', function () {
            var oTable = $('#tblProductList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_Product").clone();
            $(row).removeAttr("style");
            $(row).find('.clsProduct').val('');
            $("#tblProductList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $("#Product").find("#dvProductList").on("click", ".clsCancelProductUpdate", function () {

            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditProduct,.clsDeleteProduct').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#Product").find("#dvProductList").on("click", ".clsAddUpdateProduct", function () {

            var Product_Id, Product_Name, data, urlPath;
            var strValidationMsglists = "";

            data = $(this).parents('tr');
            Product_Id = $(data).attr('data-Product_Id');
            Product_Name = $(data).find(".clsProduct").val();
            //put validation here

            if ((Product_Name == "") || ((fn_namevalidation(Product_Name)))) {
                strValidationMsglists = strValidationMsglists + "<li>Product Name is required and it shouldn’t be numeric.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssProduct_common('divDisplayProductMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateProduct";
            if (true) {
                $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Product_Id: Product_Id,
                        Product_Name: Product_Name
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
                            fn_ShowHideUserMessageDivWithCssProduct_common('divDisplayProductMessages', result.messagedata, true, 'alert alert-success');
                            Productjs.fn_ReloadProductGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssProduct_common('divDisplayProductMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadProductGrid: function () {

        var urlPath = "/AdminPortal/GetProductPartial";
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
                    Productjs.ReinitiateDataTable('tblProductList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvProductList").html(result);
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
