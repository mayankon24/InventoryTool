/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert*/
var Common = {
    init: function () {
        
    },
    setAttributeList: function (instance) {

        var obj, list, prop, el, i;
        obj = instance;
        list = obj.getAttributeList();
        if (!obj.Attributes) {
            obj.Attributes = {};
        }
        for (i = 0; el = list[i]; i++) {
            prop = el[0];
            obj[prop] = (typeof obj.Attributes[prop] === el[1]) ? obj.Attributes[prop] : el[2];
        }
    },
    initTable: function (selector) {
         $(selector).DataTable();
    },
    showDialog: (function () {
      var $dialog = $(
                '<div class="modal fade" data-backdrop="static" data-keyboard="false"' +
                    'tabindex="-1" role="dialog" aria-hidden="true"' +
                    'style="padding-top:15%; overflow-y:visible;">' +
                    '<div class="modal-dialog modal-m">' +
                    '<div class="modal-body">' +
                      '<img src="/Content/Images/loading.gif" alt="Loading" style="position:absolute; top:50%; left:35%; z-index:99999;width:120px;height:120px" />' +
                    '</div>' + '</div></div>'
            );


        return {
            show: function (message, options) {
                // Assigning defaults
                var settings = $.extend({
                    dialogSize: 'm',
                    progressType: ''
                }, options);
                if (typeof message === 'undefined') {
                    message = 'Loading';
                }
                if (typeof options === 'undefined') {
                    options = {};
                }
                // Configuring dialog
                $dialog.find('.modal-dialog').attr('class', 'modal-dialog')
                    .addClass('modal-' + settings.dialogSize);
                $dialog.find('.progress-bar').attr('class', 'progress-bar');
                if (settings.progressType) {
                    $dialog.find('.progress-bar')
                        .addClass('progress-bar-' + settings.progressType);
                }
                $dialog.find('h3').text(message);
                // Opening dialog
                $dialog.modal();
            },
            hide: function () {
                $dialog.modal('hide');
            }
        }
    })(),
};

///This will Delete the Row.
function fn_RemoveRow(obj) {
    $(obj).closest("tr").remove();
}

//function to show / hide the message div start
//function is used to display error,warning and message div in the screen
//divId= will be string and message div Id
//strDisplayMsg= will be string and user message
//IsShowHideFlag= will be boolean and will be true/false
//strClassName=will be string and will be 'message error','message warning','message success'
function fn_ShowHideUserMessageDivWithCssClass_common(divId, strDisplayMsg, IsShowHideFlag, strClassName) {
    var objdivId = $("#" + divId);
    objdivId.html("<a href='#' class='close' onclick='fn_closeMe(this)' aria-label='close'>&times;</a>"+ strDisplayMsg);
    if (IsShowHideFlag == true)//show / hide the div
    {
        objdivId.show();
    }
    else {
        objdivId.hide();
    }

    try {
        objdivId.removeAttr("class");
    } catch (e) { }
    if (strClassName != "") {
        objdivId.attr("class", strClassName);
    }

    objdivId.focus();//focusing the div
}

commonjs = {
    init: function () {
        var obj = commonjs;
        obj.DeleteModal();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['DeleteTeamUrl', 'string', ''],
            ['DeleteProjectUrl', 'string', '']
           
        ];
    },
    DeleteModal: function () {
        var obj = commonjs;
        var dataTableConfig = {
            "order": [],
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false,
                "searchable": false,
                "visible": true,
                
            }],
            bFilter: false, bInfo: false, bLengthChange: false,
        };

        $("#deleteconfirm").click(function () {
            var Id, urlPath, IsError, ajaxRequest, name, tblList, dvList, url;
            Id = $("#deleteModel")
                .find('.modal-footer')
                .attr('data-id');
            name = $("#deleteModel")
                .find('.modal-footer')
                .attr('data-name');

            if (name === 'Team') {
                urlPath = obj.DeleteTeamUrl;
            } else if (name === 'Project') {
                urlPath = obj.DeleteProjectUrl;
            }
            else if (name === 'Trio') {
                urlPath = obj.DeleteProjectUrl;
            }
            tblList = '#tbl' + name + 'List';
            dvList = '#dv' + name + 'List';

            url = urlPath + "/" + Id;
            IsError = false;
            if (Id !== '') {
                ajaxRequest = $.ajax({
                    type: "Post",
                    cache: false,
                    url: url,
                    beforeSend: function () {
                        Common.showDialog.show('Please wait....',
                            {
                                dialogSize: 'sm',
                                progressType: 'warning'
                            });
                    },
                    complete: function () {
                        $('.edit-mode').hide();
                        Common.showDialog.hide();
                        //if (!IsError) {
                            $(tblList).dataTable(dataTableConfig);
                            $('#deleteModel').modal('hide');
                        //    $("#deleteAlert").attr("hidden", "hidden");
                        //}
                    },
                    success: function (result) {
                        if (result.indexOf('Already Associated') !== -1) {
                            IsError = true;
                            $("#deleteAlert").removeAttr("hidden");
                            $('#deleteAlert').html(" " +
                                "<div class='alert alert-danger'> " +
                                "<a href='#' class='close' data-dismiss='alert' " +
                                "aria-label='close'>&times;</a> " +
                                "<strong>Error!</strong>" + result + "</div>");
                            $('#deleteAlert').show();
                        } else {
                            alert("Record delete sucessfully.")
                            $(dvList).html(result);
                        }
                    },
                    error: function (ex) {
                        console.log(ex.toString());
                    }
                });
            }
        });

        $("#deletecancel").click(function () {
            $("#deleteAlert").attr("hidden", "hidden");
        });

        $("#deleteclose").click(function () {
            $("#deleteAlert").attr("hidden", "hidden");
        });
    },

    
   
    fn_GetPart: function (params) {

        urlPath = "/Part/GetPartByPartType";
        ajaxRequest = $.ajax({
            type: "Post",
            cache: false,
            async: false,
            url: urlPath,
            data: {
                Group_ID: params.Group_Id
            },
            beforeSend: params.beforeSend,
            complete: params.complete,
            success: function(data){
                if (params.Part_Id != undefined) {
                    params.success(data,params.Part_Id);
                }
                else {
                    params.success(data);
                }
            }, 
            error: function () {
                //alert("An error has occured!!!" + ex.responseText);
            }
        });
    },
};

function fn_closeMe(obj)
{
    $(obj).parent('div').hide();
}

// common name validation

function fn_textvalidation(name) {
    var value
    var condition = /^[0-9]+$/;
    value = condition.test(name);
    return value;
}

// common number validation
function fn_numbervalidation(name) {
    var value
    var condition = /^[0-9]+$/;
    value = !condition.test(name);  
    return value;
}
// common Decimal validation
function fn_Decimalvalidation(name) {
    var value
   // var condition =/^\s*\d*\.?\d{0,2}\s*$/
 var condition = /^[0-9]+\.?[0-9]*$/;
    value = !condition.test(name);
    return value;
}

// Removing commas and converting to integer
function fn_RemovingCommas(number)
{
    if (number != "")
    {
    var Integer = parseInt(number.replace(/\,/g, ''));
    return Integer;
    }
    else
    {
        return 0;
    }
}

//Keeping commas
function fn_KeepingCommas(x) {
    
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}


