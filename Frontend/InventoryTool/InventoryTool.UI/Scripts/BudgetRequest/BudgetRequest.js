/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
var budgetrequestjs = {
    init: function () {
        var obj = budgetrequestjs;
        obj.LoadBudgetRequest();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadBudgetRequest: function () {
        $("#UserId").hide();
        $("#ddlTeam").attr('disabled', 'disabled');
        $("#ddlProject").attr('disabled', 'disabled');
        $("#ddlSubProject").attr('disabled', 'disabled');
       
        budgetrequestjs.UserAliasOnChangeHandler();
        budgetrequestjs.Fn_StatusDropDown();
        budgetrequestjs.GetApprovalLabels();
        budgetrequestjs.Fn_HidingPastFiscalMonths();
        budgetrequestjs.Fn_EditBudgetRequest();
        budgetrequestjs.GetRequestHistory();
        //Handle the Group dropdown change event.
        $('#ddlGroup').on('change', function () {
            budgetrequestjs.DisabledControls(1);
            var selected, params = [];
            selected = $(this).find("option:selected").val();
            if (selected >= 1) {
                params.Group_Id = selected;
                params.beforeSend = budgetrequestjs.TeambeforeSend;
                params.success = budgetrequestjs.TeamSuccess
                commonjs.fn_GetTeam(params);
            }
        });

        //Handle the Team dropdown change event.
        $('#ddlTeam').on('change', function () {
            var selected, params = [];
            budgetrequestjs.DisabledControls(2);
            selected = $(this).find("option:selected").val();
            if (selected >= 1) {
                params.Team_Id = selected;
                params.beforeSend = budgetrequestjs.ProjectbeforeSend;
                params.success = budgetrequestjs.ProjectSuccess
                commonjs.fn_GetProject(params);
            }
        });

        //Handle the Project dropdown change event.
        $('#ddlProject').on('change', function () {
            var selected, params = [];
            budgetrequestjs.DisabledControls(3);
            selected = $(this).find("option:selected").val();
            if (selected >= 1) {
                params.Project_Id = selected;
                params.beforeSend = budgetrequestjs.SubProjectbeforeSend;
                params.success = budgetrequestjs.SubProjectSuccess
                commonjs.fn_GetSubProject(params);
                budgetrequestjs.Fn_ProjectDescription(selected);
            }
            
        });

        //Handle Category drop down
        $('#ddlCategory').on('change', function () {
            var selected;
            selected = $(this).find("option:selected").val();
            budgetrequestjs.Fn_CategoryDropdown(selected);
        });

        //Handle the position title dropdown change event
        $('#ddlPosition').on('change', function () {
            var Position_Id;
            Position_Id = $(this).find("option:selected").val();
            budgetrequestjs.Fn_PositionRate(Position_Id);
        });

        //Onchange for Purchase month dropdown
        $('#ddlPurchaseMonth').on('change', function () {
            var selected,BudgetRequest_Id;       
            selected = $(this).find("option:selected").val();
            budgetrequestjs.Fn_OnChangeDropdown();
       
            //controls selection of historical months
            BudgetRequest_Id = $('#hdnbudgetrequest').val();
            if (BudgetRequest_Id > 0) {
                var currentDate, day, month;
                currentDate = new Date()
                day = currentDate.getDate()
                month = currentDate.getMonth() + 1;
                if (month <= 6) {
                    month = Number(month) + 6;
                }
                else {
                    month = month - 6;
                  
                }
                if (selected <= 6)
                {
                    selected = Number(selected) + 6;
                }
                else {        
                     selected = selected - 6;
                }
                if(month > selected)
                {
                    fn_ShowHideUserMessageDivWithCssClass_common('divDisplayBudgetMessages', "select a valid month that shouldn't be historical fiscal month", true, 'alert alert-danger');
                    $('#ddlPurchaseMonth').val('');
                    //scrolling to success message
                    window.scrollTo(0, 0);
                 }


            }
        });
      
        //onchange Lab Device Type Dropdown to get Depreciation month value for opex/capex calculation
        $('#ddlLabDevice').on('change', function () {
            var selected;
            selected = $(this).find("option:selected").val();
            budgetrequestjs.Fn_DepreciationbyDevice(selected);
        });

        //onchange Seasonality Type Dropdown
        $('#ddlSeasonality').on('change', function () {
            budgetrequestjs.Fn_SeasonalityType();
        });

        //onchange remaining months
        $('#ddlStartMonth').on('change', function () {
            var selected, month, currentDate, day,RemainingMonths1,Months,RemainingMonths2;
            currentDate = new Date();
            day = currentDate.getDate();
            month = currentDate.getMonth() + 1;
            selected = $(this).find("option:selected").val();
            if(selected > 0){
            if (selected>6)
            {
                Months = (19 - selected);
                RemainingMonths1 = document.getElementById("RemainingMonthsRate");
                RemainingMonths1.placeholder = "(maximum allowed value is " + Months+")";
                //  budgetrequestjs.Fn_AskAmountForContainerExternal();
           
           
            }
            else if(selected<=6)
            {
                Months = (7 - selected);
                RemainingMonths2 = document.getElementById("RemainingMonthsRate");
                RemainingMonths2.placeholder = "(maximum allowed value is " + Months + ")";
                // budgetrequestjs.Fn_AskAmountForContainerExternal();
          
            }
           
            }
            else  {
                RemainingMonths2 = document.getElementById("RemainingMonthsRate");
                RemainingMonths2.placeholder = "";
                $('#AskAmountContainerExternal').val('');
                $('#FYImpact').val('');
                $('#RemainingMonthsRate').val('');
                
            }
            budgetrequestjs.Fn_AskAmountForContainerExternal();

            //controls selection of historical months
           var BudgetRequest_Id = $('#hdnbudgetrequest').val();
            if (BudgetRequest_Id > 0) {
                currentDate = new Date();
                day = currentDate.getDate();
                month = currentDate.getMonth() + 1;
                if (month <= 6) {
                    month = Number(month) + 6;
                }
                else {
                    month = month - 6;

                }
                if (selected <= 6) {
                    selected = Number(selected) + 6;
                }
                else {
                    selected = selected - 6;
                }
                if (month > selected) {
                    fn_ShowHideUserMessageDivWithCssClass_common('divDisplayBudgetMessages', "select a valid month that shouldn't be historical fiscal month", true, 'alert alert-danger');
                    $('#ddlStartMonth').val('');
                    //scrolling to success message
                    window.scrollTo(0, 0);
                }


            }

        });


        //Point of Contact
        $("#source").autocomplete({
            autoFocus: true,
            selectFirst: true,
            source: function (request, response) {
                $.ajax({
                    url: "/BudgetRequest/GetUsers",
                    data: { 'term': request.term },
                    dataType: "json",
                    type: "GET",
                    beforeSend: function () {
                        //var procemessage = "<option value='-1'> Please wait...</option>";
                        //$("#ddlGroup").html(procemessage).show();
                    },
                    complete: function () {

                    },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return {
                                User_FirstName: item.User_FirstName,
                                User_LastName: item.User_LastName,
                                label: item.User_DisplayName,
                                val: item.User_Alias
                            }
                        }))
                    },
                    error: function (response) {
                        alert(response.responseText);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    }
                });
            },
            select: function (e, i) {
                $("#source").val(i.item.val);
                $("#hidefirst").val(i.item.User_FirstName);
                $("#hidelast").val(i.item.User_LastName);
                $("#hidedisplay").val(i.item.label);
                $("#hidealias").val(i.item.val);
                

               

            },
             minLength: 3
       
        });

        //This function Clean the Auto complete Text box
        $("#source").keyup(function (e) {
            if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 88) {
                if ($(this).val()) {
                    $(this).val('');
                    $(this).val('');
                }
                else {
                    $(this).val('');
                }
            }
        });

        //Handle the save as draft functionality 
        $("#btnFindBudgetDraft").on("click", function () {
            var IsSubmitted, Approval_Status_Id,DraftFlag,urlPath;
            IsSubmitted = false;
            DraftFlag = 1;
            Approval_Status_Id = 1;
            var ResultData = budgetrequestjs.Fn_BudgetRequestCommon(DraftFlag, IsSubmitted, Approval_Status_Id);
            var strValidationMsglists = ResultData.ValidationMessage;
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>";
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayBudgetMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                window.scrollTo(0, 0);
                return false;
            }     
            var promptsavedraft = confirm('Save budget request as draft. Don’t submit it for approval. Are you sure?');
            if (promptsavedraft){

            urlPath = "/BudgetRequest/AddUpdateBudgetRequest";
            if (true) {
                $.ajax({
                    type: "POST",
                    cache: false,
                    url: urlPath,
                    data: ResultData.data
                   ,
                    beforeSend: function () {
                        Common.showDialog.show('Please wait....', {
                            dialogSize: 'sm',
                            progressType: 'warning'
                        });
                    },
                    complete: function () {
                        Common.showDialog.hide();
                    },
                    success: function () {
                          fn_ShowHideUserMessageDivWithCssClass_common('divDisplayBudgetMessages', "Budget Request is successfully saved as a draft", true, 'alert alert-success');
                          window.scrollTo(0, 0);
                          location.replace("/BudgetSummary/Index");
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }
            }
        });

        //Handle the submit & close functionality
        $("#btnFindBudgetSubmitClose").on("click", function () {
            var IsSubmitted, Approval_Status_Id,urlPath;
            IsSubmitted = true;
            Approval_Status_Id = 2;
            var ResultData = budgetrequestjs.Fn_BudgetRequestCommon(null,IsSubmitted,Approval_Status_Id);
            var strValidationMsglists = ResultData.ValidationMessage; 
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>";
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayBudgetMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                window.scrollTo(0, 0);
                return false;
            }

            var promptsubmitclose = confirm('Submit budget request for approval and close the request window. Are you sure?');
            if (promptsubmitclose) {

                urlPath = "/BudgetRequest/AddUpdateBudgetRequest";
                if (true) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: urlPath,
                        data: ResultData.data

                        ,
                        beforeSend: function () {
                            Common.showDialog.show('Please wait....', {
                                dialogSize: 'sm',
                                progressType: 'warning'
                            });
                        },
                        complete: function () {
                            Common.showDialog.hide();
                        },
                        success: function () {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayBudgetMessages', "Budget Request is successfully submitted", true, 'alert alert-success');
                            window.scrollTo(0, 0);
                            location.replace("/BudgetSummary/Index");


                        },
                        error: function (ex) {
                            alert(ex.responseText);
                        }
                    });
                }
            }
        });

        //handle the submit and copy functionality
        $("#btnFindBudgetSubmitCopy").on("click", function () {
          var IsSubmitted, Approval_Status_Id,urlPath;
          IsSubmitted = true;
          Approval_Status_Id = 2;
          var ResultData = budgetrequestjs.Fn_BudgetRequestCommon(null,IsSubmitted,Approval_Status_Id);
          var strValidationMsglists = ResultData.ValidationMessage;
          if (strValidationMsglists != "") {
              strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>";
              fn_ShowHideUserMessageDivWithCssClass_common('divDisplayBudgetMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
              window.scrollTo(0, 0);
              return false;
          }          
            var promptsubmitcopy = confirm('Submit budget request for approval and start a new request for the same project. Are you sure?');
            if (promptsubmitcopy) {
                urlPath = "/BudgetRequest/AddUpdateBudgetRequest";
                if (true) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: urlPath,
                        data: ResultData.data
                        ,
                        beforeSend: function () {
                            Common.showDialog.show('Please wait....', {
                                dialogSize: 'sm',
                                progressType: 'warning'
                            });
                        },
                        complete: function () {
                            $('#HistoryConatiner').hide();
                            Common.showDialog.hide();
                        },
                        success: function () {                           
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayBudgetMessages', "Budget Request is successfully submitted", true, 'alert alert-success');
                            window.scrollTo(0, 0);
                            $('#hdnbudgetrequest').val('');
                            $('#StatusDisplay').val('');
                            $('#BudgetDisplayId').hide();
                            $('#StatusDisplay').hide('');
                            $("#ddlClass1").val('');
                            $("#ddlInvestment1").val('');
                            $("#ddlLabCompany1").val('');
                            $("#ddlRelease1").val('');
                            Device_Type_Id = $("#ddlLabDevice").val('');
                            $('#Quantity1').val('');
                            $("#ddlSeasonality").val('');
                            $("#ddlPurchaseMonth").val('');
                            $('#AskAmount').val('');
                            $("#ddlClass2").val('');
                            $("#ddlInvestment2").val('');
                            $("#ddlLabCompany2").val('');
                            $("#ddlRelease2").val('');
                            $("#ExistingExtPo").val('');
                            $("#ddlResourceType").val('');
                            var Position_Id = $("#ddlPosition").val('');
                            $('#Quantity').val('');
                            $("#ddlStartMonth").val('');
                            $('#RemainingMonthsRate').val('');
                            $("#ddlClass3").val('');
                            $("#ddlInvestment3").val('');
                            $("#ddlLabCompany3").val('');
                            $("#ddlRelease3").val('');
                            $("#ExistingProdPO").val('');
                            $('#July').val('');
                            $('#August').val('');
                            $('#September').val('');
                            $('#October').val('');
                            $('#November').val('');
                            $('#December').val('');
                            $('#January').val('');
                            $('#February').val('');
                            $('#March').val('');
                            $('#April').val('');
                            $('#May').val('');
                            $('#June').val('');
                            $('#RequestorComment').val('');
                            $("#ProdPo").hide();
                            $("#ExternalPO").hide();
                            var Category_Id = $("#ddlCategory").val('');
                            budgetrequestjs.Fn_OnChangeProd();
                            budgetrequestjs.Fn_DepreciationbyDevice(Device_Type_Id);
                            budgetrequestjs.Fn_PositionRate(Position_Id);
                            budgetrequestjs.Fn_CategoryDropdown(Category_Id);
                            var url = window.location.href;
                            if (url.indexOf("IsOwner") > -1)
                             {
                                var value = url.substring(url.lastIndexOf('?') + 1);
                                var refinedurl = value.replace(value, "");
                                window.history.pushState("object or string", "Title", "BudgetRequest" + refinedurl);
                            }
                            budgetrequestjs.Fn_HidingPastFiscalMonths();
                            $("#ddlClass4").val('');
                            $("#ddlInvestment4").val('');
                            $("#ddlLabCompany4").val('');
                            $("#ddlRelease4").val('');
                            $('#AskAmountCloud').val('');
                           
                            
                            
                        },
                        error: function (ex) {
                            alert(ex.responseText);
                        }
                    });
                }
            }
        });

        //handles the clear functionality
        $('#btnBudgetRequestCancel').on('click', function () {
       
            var promptcancel = confirm('This will clear the form and discard the current request. Are you sure about this?');
            if (promptcancel) {

                $("#topcontainer").load(location.href + " #topcontainer");
                $("#middlecontainer").load(location.href + " #middlecontainer");
                // $("#lab").load(location.href + " #lab");
                // $("#ext").load(location.href + " #ext");
                //$("#ext").load(location.href + " #ext>*", "");
                // $("#prod").load(location.href + " #prod");
                $("#RequestorComment").load(location.href + " #RequestorComment");
                $("#ContainerLab").hide();
                $("#ContainerExternal").hide();
                $("#ContainerProd").hide();
                $("#ContainerCloud").hide();

                location.replace("/BudgetSummary/Index");
            }
        });
       
        //handles submission of approval part
        $("#btnapprovalsubmit").on("click", function () {
       
            var IsSubmitted, Approval_Status_Id,urlPath;
            IsSubmitted = true;
            Approval_Status_Id = $("#ddlLineitemstatus :selected").val();
            var ResultData = budgetrequestjs.Fn_BudgetRequestCommon(null,IsSubmitted, Approval_Status_Id);
            var strValidationMsglists = ResultData.ValidationMessage;
            if (Approval_Status_Id <= 0)
            {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid status.</li>";

            }
            if ((ResultData.data.Approver_Reduction_Percentage == "") || (fn_numbervalidation(ResultData.data.Approver_Reduction_Percentage)) || (ResultData.data.Approver_Reduction_Percentage % 1 != 0)) {
                strValidationMsglists = strValidationMsglists + "<li>Reduction percentage is required field and it should be whole number</li>";

            }
            if ((ResultData.data.Approved_Amount == "") || (fn_numbervalidation(ResultData.data.Approved_Amount))) {
                strValidationMsglists = strValidationMsglists + "<li>Approved_Amount is Required.</li>";

            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayBudgetMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                window.scrollTo(0, 0);
                return false;
            }

            var promptsubmitapproval = confirm('Submit Your Approval. Are you sure?');
            if (promptsubmitapproval) {

                urlPath = "/BudgetRequest/AddUpdateBudgetRequest";
                if (true) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: urlPath,
                        data: ResultData.data
                        ,
                        beforeSend: function () {
                            Common.showDialog.show('Please wait....', {
                                dialogSize: 'sm',
                                progressType: 'warning'
                            });
                        },
                        complete: function () {
                            Common.showDialog.hide();
                            
                        },
                        success: function () {
                           alert('Budget Request Approval is successfully submitted');
                           location.reload(true);


                        },
                        error: function (ex) {
                            alert(ex.responseText);
                        }
                    });
                }
            }
        });

        //handles Undo Last Action Functionality
        $("#btnapprovalundo").on("click", function () {
        var ajaxRequest, BudgetRequest_Id,urlPath;
        BudgetRequest_Id = $('#hdnbudgetrequest').val();
        var promptundo = confirm('Undo Your Last Submitted Approval. Are you sure?');
        if (promptundo) {
            urlPath = "/BudgetRequest/UndoLastAction";
            if (BudgetRequest_Id > 0) {
                $.ajax({
                    type: "POST",
                    cache: false,
                    url: urlPath,
                    data: {
                        BudgetRequest_Id: BudgetRequest_Id
                        , IsSingleRequest: true
                    },
                    beforeSend: function () {
                        Common.showDialog.show('Please wait....', {
                            dialogSize: 'sm',
                            progressType: 'warning'
                        });
                    },
                    complete: function () {
                        //budgetrequestjs.Fn_EditBudgetRequest();
                        //budgetrequestjs.GetRequestHistory();
         
                        Common.showDialog.hide();
                    },
                    success: function (result) {
                        if (result.messagedata == "success")
                        {
                            //fn_ShowHideUserMessageDivWithCssClass_common('divDisplayBudgetMessages', result.message, true, 'alert alert-success');
                            //setTimeout(function () {
                            //    location.reload(true);
                            //}, 1000);
                            alert(result.message);
                            location.reload(true);

                        }
                        else
                        {
                            window.scrollTo(0, 0);
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayBudgetMessages', result.message, true, 'alert alert-danger');
                        }
                        
                        

                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }
        }
        });

        //handles automatic adding of commas while user entering amount in text box
        $('input.autocommas').keyup(function (event) {

            // skip for arrow keys
            if (event.which >= 37 && event.which <= 40) return;

            // format number
            $(this).val(function (index, value) {
                return value
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                ;
               
                
            });
        });
        
 },
    DisabledControls: function (step)
{
    if (step == 1)
{
    $("#ddlTeam").empty();
    $("#ddlProject").empty();
    $("#ddlSubProject").empty();
    $("#ddlTeam").attr('disabled', 'disabled');
    $("#ddlProject").attr('disabled', 'disabled');
    $("#ddlSubProject").attr('disabled', 'disabled');
    $("#ProjectDescription").val('');
    $("#BusinessWin").val('');
}
else if (step == 2)
{
        
    $("#ddlProject").empty();
    $("#ddlSubProject").empty();
    $("#ddlProject").attr('disabled', 'disabled');
    $("#ddlSubProject").attr('disabled', 'disabled');
    $("#ProjectDescription").val('');
    $("#BusinessWin").val('');

}
else if (step == 3) {

    $("#ddlSubProject").empty();
    $("#ddlSubProject").attr('disabled', 'disabled');
    $("#ProjectDescription").val('');
    $("#BusinessWin").val('');
}
else {

//for clear and disabled all the filter dropdown
       
$("#ddlTeam").empty();
$("#ddlProject").empty();
$("#ddlSubProject").empty();

$("#ddlTeam").attr('disabled', 'disabled');
$("#ddlProject").attr('disabled', 'disabled');
$("#ddlSubProject").attr('disabled', 'disabled');
$("#ProjectDescription").val('');
$("#BusinessWin").val('');

}
    
    },
    
    //Automatically fills description column based on select project
    Fn_ProjectDescription: function (Project_Id) {
        var urlPath = "/AdminPortal/GetProjectByProjectId";
        if (Project_Id >= 1) {
            $.ajax({
                type: "POST",
                cache: false,
                url: urlPath,
                data: {
                    Project_Id: Project_Id
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
                  $('#ProjectDescription').val(result.Project_description);
                  $('#BusinessWin').val(result.Business_win);
                   
                },
                error: function (ex) {
                    alert(ex.responseText);
                }
            });
        }
        else
        {
            $('#ProjectDescription').empty();
            $('#BusinessWin').empty();
        }

    },

    //Fills status dropdown in approval workflow
    Fn_StatusDropDown: function () {
        var urlPath = "/Common/GetApprovalStatus";
         $.ajax({
            type: "Post",
            cache: false,
            url: urlPath,
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (result) {
                $('.clsStatus').empty();
                var listItems = "<option value='0'>--Select Status--</option>";
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].ActionCategory_Id == 2) {
                            listItems += "<option value='" +
                                result[i].Approval_Status_Id + "'>" +
                                result[i].Approval_Status_Name + "</option>";
                        }
                    }
                }
                $('.clsStatus').html(listItems);
            },
            error: function () {
                //alert("An error has occured!!!" + ex.responseText);
            }
        });
    },

    //handles on-change of amount entered in Ask Amount box
    Fn_OnChange: function (Txt) {
        var SeasonalityType, AskAmount, PurchaseMonth, DepreciationMonth;
        SeasonalityType = $('#ddlSeasonality').find("option:selected").text();
        PurchaseMonth = $('#ddlPurchaseMonth').find("option:selected").val();
        DepreciationMonth = $('#hidedepreciation').val();
        AskAmount = Txt.value;     
        if ((PurchaseMonth > 0) && (AskAmount != '') && (DepreciationMonth != 0) && (SeasonalityType != ''))
        {
            budgetrequestjs.Fn_SeasonalityType();
        }
        else
        {
            budgetrequestjs.Fn_HideEmptyFutureFyvalues();
        }

    },

    //handles on-change event for purchase month
    Fn_OnChangeDropdown: function () {
       var SeasonalityType,AskAmount,PurchaseMonth,DepreciationMonth;
        SeasonalityType = $('#ddlSeasonality').find("option:selected").text();
        PurchaseMonth = $('#ddlPurchaseMonth').find("option:selected").val();
        DepreciationMonth = $('#hidedepreciation').val();
        AskAmount = $('#AskAmount').val();    
        if ((PurchaseMonth > 0) && (AskAmount != '') && (DepreciationMonth != 0) && (SeasonalityType != ''))
        {
            budgetrequestjs.Fn_SeasonalityType();
        }
        else
        {
            budgetrequestjs.Fn_HideEmptyFutureFyvalues();
        }

    },

    //handles calculation based on lab device type
    Fn_ChangeforLab: function () {
        var SeasonalityType, AskAmount, PurchaseMonth, DepreciationMonth;
        SeasonalityType = $('#ddlSeasonality').find("option:selected").text();
        PurchaseMonth = $('#ddlPurchaseMonth').find("option:selected").val();
        DepreciationMonth = $('#hidedepreciation').val();
        AskAmount = $('#AskAmount').val();       
        if ((PurchaseMonth > 0) && (AskAmount != '') && (DepreciationMonth != 0) && (SeasonalityType != ''))
        {
            budgetrequestjs.Fn_SeasonalityType();
        }
        else {
            budgetrequestjs.Fn_HideEmptyFutureFyvalues();
        }

    },

    //Get depreciation month based on Lab Device Type
    Fn_DepreciationbyDevice: function (selected) {
        if (selected >= 1) {
            var urlPath = "/AdminPortal/GetDeviceByDeviceId";
             $.ajax({
                type: "Post",
                cache: false,
                url: urlPath,
                data: {
                    Device_Type_Id: selected
                },
                beforeSend: function () {
                },
                complete: function () {
                },
                success: function (result) {
                    $('#hidedepreciation').val(result.Depreciation_Month);
                    budgetrequestjs.Fn_ChangeforLab();
                },
                error: function (ex) {
                    alert("An error has occured!!!" + ex.responseText);
                }
            });
        }
        else {
            $('#hidedepreciation').val('');
            $('#FY17').val('');
            $('#FY18').val('');
            $('#FY19').val('');
            $('#FY20').val('');
            $('#FY21').val('');
            $('#FY22').val('');
            $('#FY23').val('');
            $('#FY24').val('');
            $('#FY25').val('');
            $('#FY26').val('');
            $('#FY27').val('');
            $('#FY28').val('');
            $('#FY29').val('');
            $('#FY30').val('');
            $('#FY31').val('');
            $('#FY32').val('');
            $("#divFY18").hide();
            $("#divFY19").hide();
            $("#divFY20").hide();
            $("#divFY21").hide();
            $("#divFY22").hide();
            $("#divFY23").hide();
            $("#divFY24").hide();
            $("#divFY25").hide();
            $("#divFY26").hide();
            $("#divFY27").hide();
            $("#divFY28").hide();
            $("#divFY29").hide();
            $("#divFY30").hide();
            $("#divFY31").hide();
            $("#divFY32").hide();


        }

    },

    //handles calculation based on seasonality type
    Fn_SeasonalityType: function () {
        var selected,PurchaseMonth, AskAmount, Years, DepreciationMonth,FiscalMonth;
        selected = $('#ddlSeasonality').find("option:selected").text();
        PurchaseMonth = $('#ddlPurchaseMonth').find("option:selected").val();
        if(PurchaseMonth <= 6)
        {
             FiscalMonth = Number(PurchaseMonth) + 6;
        }
        else
        {
           FiscalMonth = PurchaseMonth - 6;
        }
        FiscalMonth = FiscalMonth;
        DepreciationMonth = $('#hidedepreciation').val();
        Years = DepreciationMonth / 12;
        AskAmount = $('#AskAmount').val();
        AskAmount = fn_RemovingCommas(AskAmount);
        var PeriodsPerYr,AddsYear1,AddMultiplier,PaymentPeriods,PeriodOpExCost,chargecount,PeriodMultiplier,FirstAnnualCharges,SecondAnnualCharges,SelectedMonth;
        if ((selected == "Monthly") && (PurchaseMonth > 0) && (AskAmount != '') && (DepreciationMonth != 1))
        {
            PeriodsPerYr = 12;
            AddsYear1 = PeriodsPerYr;
            AddMultiplier = PeriodsPerYr * AddsYear1;
            PaymentPeriods = (DepreciationMonth / 12) * AddsYear1 * PeriodsPerYr;
            PeriodOpExCost = (((AskAmount / AddsYear1) / DepreciationMonth) * (12 / PeriodsPerYr));
            chargecount = (AddsYear1 - (FiscalMonth - 1));
             PeriodMultiplier = budgetrequestjs.Fn_PeriodMultiplier(chargecount);
            FirstAnnualCharges = (PeriodOpExCost * PeriodMultiplier).toFixed(0);
            SecondAnnualCharges = (PeriodOpExCost * PeriodsPerYr * AddsYear1).toFixed(0);
            budgetrequestjs.Fn_AnnualChargesDistributing(AddMultiplier,PeriodOpExCost, PeriodMultiplier, selected, DepreciationMonth, Years, PaymentPeriods, chargecount, FirstAnnualCharges, SecondAnnualCharges);

        }
        else if ((selected == "Quarterly") && (PurchaseMonth > 0) && (AskAmount != '') && (DepreciationMonth != 1))
        {           
            PeriodsPerYr = 4;
            AddsYear1 = PeriodsPerYr;
            AddMultiplier = PeriodsPerYr * AddsYear1;
            PaymentPeriods = (DepreciationMonth / 12) * AddsYear1 * PeriodsPerYr;
            PeriodOpExCost = (((AskAmount / AddsYear1) / DepreciationMonth) * (12 / PeriodsPerYr));
            SelectedMonth = Math.floor((FiscalMonth - 1) / 3);
            chargecount = (AddsYear1 - SelectedMonth);
            PeriodMultiplier = budgetrequestjs.Fn_PeriodMultiplier(chargecount);
            FirstAnnualCharges = (PeriodOpExCost * PeriodMultiplier).toFixed(0);
            SecondAnnualCharges = (PeriodOpExCost * PeriodsPerYr * AddsYear1).toFixed(0);
            budgetrequestjs.Fn_AnnualChargesDistributing(AddMultiplier, PeriodOpExCost, PeriodMultiplier, selected, DepreciationMonth, Years, PaymentPeriods, chargecount, FirstAnnualCharges, SecondAnnualCharges);

        }
        else if ((selected == "One Time") && (PurchaseMonth > 0) && (AskAmount != '') && (DepreciationMonth != 1)) {
        
            PeriodsPerYr = 1;
            AddsYear1 = PeriodsPerYr;
            AddMultiplier = PeriodsPerYr * AddsYear1;
            PaymentPeriods = (DepreciationMonth / 12) * AddsYear1 * PeriodsPerYr;
            PeriodOpExCost = (((AskAmount / AddsYear1) / DepreciationMonth) * (12 / PeriodsPerYr));
            chargecount = (12 - FiscalMonth + 1) / 12;          
            PeriodMultiplier = 1;
            FirstAnnualCharges = (PeriodOpExCost * chargecount).toFixed(0);
            SecondAnnualCharges = (PeriodOpExCost * PeriodsPerYr).toFixed(0);
            budgetrequestjs.Fn_AnnualChargesDistributing(AddMultiplier, PeriodOpExCost, PeriodMultiplier, selected, DepreciationMonth, Years, PaymentPeriods, chargecount, FirstAnnualCharges, SecondAnnualCharges);

        }
        else if (((selected == "One Time") ||(selected == "Quarterly") || (selected == "Monthly"))   && (PurchaseMonth > 0) && (AskAmount != '') && (DepreciationMonth == 1)) {
            PeriodsPerYr = 1;
            AddsYear1 = PeriodsPerYr;
            AddMultiplier = PeriodsPerYr * AddsYear1;
            PaymentPeriods = (DepreciationMonth / 12) * AddsYear1 * PeriodsPerYr;
            PeriodOpExCost = AskAmount;
            chargecount = 1;          
            PeriodMultiplier = 1;
            FirstAnnualCharges = (PeriodOpExCost * chargecount).toFixed(0);
            SecondAnnualCharges = FirstAnnualCharges;
            budgetrequestjs.Fn_AnnualChargesDistributing(AddMultiplier, PeriodOpExCost, PeriodMultiplier, selected, DepreciationMonth, Years, PaymentPeriods, chargecount, FirstAnnualCharges, SecondAnnualCharges);

        }
        else
        {
            budgetrequestjs.Fn_HideEmptyFutureFyvalues();
        }
    },

    //Periods Remaining and calculating annual charges
    Fn_PeriodMultiplier:function(chargecount){
        var PeriodMultiplier;
            urlPath = "/Common/GetFiscalMonths";
            ajaxRequest = $.ajax({
                type: "Post",
                cache: false,
                async:false,
                url: urlPath,

                beforeSend: function () {
                },
                complete: function () {
  
                },
                success: function (result) {                
                    PeriodMultiplier = result[chargecount - 1].Multiplier;      
                },
                
            });
            return PeriodMultiplier;
    },

    //common function for distributing calculated annual charges for Type-1
    Fn_AnnualChargesDistributing: function (AddMultiplier, PeriodOpExCost, PeriodMultiplier, selected, DepreciationMonth, Years, PaymentPeriods, chargecount, FirstAnnualCharges, SecondAnnualCharges)
    {
        //currency formatting
        var strAsk, strSecondAnnual;
        strAsk = fn_KeepingCommas(FirstAnnualCharges);
        strSecondAnnual = fn_KeepingCommas(SecondAnnualCharges);
        var strFY;
        if (((selected == "Monthly") || (selected == "Quarterly")) && DepreciationMonth != 1)
        {
            if(chargecount >= 1)
            {
                if (Years == 1) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $("#divFY18").show();
                    $('#FY18').val(strFY);
                    $("#divFY19").hide();
                    $("#divFY20").hide();
                    $("#divFY21").hide();
                    $("#divFY22").hide();
                    $("#divFY23").hide();
                    $("#divFY24").hide();
                    $("#divFY25").hide();
                    $("#divFY26").hide();
                    $("#divFY27").hide();
                    $("#divFY28").hide();
                    $("#divFY29").hide();
                    $("#divFY30").hide();
                    $("#divFY31").hide();
                    $("#divFY32").hide();

                }
                else if (Years == 2) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - AddMultiplier) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strFY);
                    $("#divFY20").hide();
                    $("#divFY21").hide();
                    $("#divFY22").hide();
                    $("#divFY23").hide();
                    $("#divFY24").hide();
                    $("#divFY25").hide();
                    $("#divFY26").hide();
                    $("#divFY27").hide();
                    $("#divFY28").hide();
                    $("#divFY29").hide();
                    $("#divFY30").hide();
                    $("#divFY31").hide();
                    $("#divFY32").hide();
                }
                else if (Years == 3) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (2 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").hide();
                    $("#divFY22").hide();
                    $("#divFY23").hide();
                    $("#divFY24").hide();
                    $("#divFY25").hide();
                    $("#divFY26").hide();
                    $("#divFY27").hide();
                    $("#divFY28").hide();
                    $("#divFY29").hide();
                    $("#divFY30").hide();
                    $("#divFY31").hide();
                    $("#divFY32").hide();
                
                }
                else if (Years == 4) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (3 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strSecondAnnual);
                    $('#FY21').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").show();
                    $("#divFY22").hide();
                    $("#divFY23").hide();
                    $("#divFY24").hide();
                    $("#divFY25").hide();
                    $("#divFY26").hide();
                    $("#divFY27").hide();
                    $("#divFY28").hide();
                    $("#divFY29").hide();
                    $("#divFY30").hide();
                    $("#divFY31").hide();
                    $("#divFY32").hide();
                  
                }
                else if (Years == 5) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (4 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strSecondAnnual);
                    $('#FY21').val(strSecondAnnual);
                    $('#FY22').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").show();
                    $("#divFY22").show();
                    $("#divFY23").hide();
                    $("#divFY24").hide();
                    $("#divFY25").hide();
                    $("#divFY26").hide();
                    $("#divFY27").hide();
                    $("#divFY28").hide();
                    $("#divFY29").hide();
                    $("#divFY30").hide();
                    $("#divFY31").hide();
                    $("#divFY32").hide();
                   
                }
                else if (Years == 6) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (5 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strSecondAnnual);
                    $('#FY21').val(strSecondAnnual);
                    $('#FY22').val(strSecondAnnual);
                    $('#FY23').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").show();
                    $("#divFY22").show();
                    $("#divFY23").show();
                    $("#divFY24").hide();
                    $("#divFY25").hide();
                    $("#divFY26").hide();
                    $("#divFY27").hide();
                    $("#divFY28").hide();
                    $("#divFY29").hide();
                    $("#divFY30").hide();
                    $("#divFY31").hide();
                    $("#divFY32").hide();
                   
                }
                else if (Years == 7) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (6 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strSecondAnnual);
                    $('#FY21').val(strSecondAnnual);
                    $('#FY22').val(strSecondAnnual);
                    $('#FY23').val(strSecondAnnual);
                    $('#FY24').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").show();
                    $("#divFY22").show();
                    $("#divFY23").show();
                    $("#divFY24").show();
                    $("#divFY25").hide();
                    $("#divFY26").hide();
                    $("#divFY27").hide();
                    $("#divFY28").hide();
                    $("#divFY29").hide();
                    $("#divFY30").hide();
                    $("#divFY31").hide();
                    $("#divFY32").hide();
                  
                }
                else if (Years == 8) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (7 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strSecondAnnual);
                    $('#FY21').val(strSecondAnnual);
                    $('#FY22').val(strSecondAnnual);
                    $('#FY23').val(strSecondAnnual);
                    $('#FY24').val(strSecondAnnual);
                    $('#FY25').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").show();
                    $("#divFY22").show();
                    $("#divFY23").show();
                    $("#divFY24").show();
                    $("#divFY25").show();
                    $("#divFY26").hide();
                    $("#divFY27").hide();
                    $("#divFY28").hide();
                    $("#divFY29").hide();
                    $("#divFY30").hide();
                    $("#divFY31").hide();
                    $("#divFY32").hide();
                 
                }
                else if (Years == 9) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (8 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strSecondAnnual);
                    $('#FY21').val(strSecondAnnual);
                    $('#FY22').val(strSecondAnnual);
                    $('#FY23').val(strSecondAnnual);
                    $('#FY24').val(strSecondAnnual);
                    $('#FY25').val(strSecondAnnual);
                    $('#FY26').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").show();
                    $("#divFY22").show();
                    $("#divFY23").show();
                    $("#divFY24").show();
                    $("#divFY25").show();
                    $("#divFY26").show();
                    $("#divFY27").hide();
                    $("#divFY28").hide();
                    $("#divFY29").hide();
                    $("#divFY30").hide();
                    $("#divFY31").hide();
                    $("#divFY32").hide();
                  
                }
                else if (Years == 10) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (9 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strSecondAnnual);
                    $('#FY21').val(strSecondAnnual);
                    $('#FY22').val(strSecondAnnual);
                    $('#FY23').val(strSecondAnnual);
                    $('#FY24').val(strSecondAnnual);
                    $('#FY25').val(strSecondAnnual);
                    $('#FY26').val(strSecondAnnual);
                    $('#FY27').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").show();
                    $("#divFY22").show();
                    $("#divFY23").show();
                    $("#divFY24").show();
                    $("#divFY25").show();
                    $("#divFY26").show();
                    $("#divFY27").show();
                    $("#divFY28").hide();
                    $("#divFY29").hide();
                    $("#divFY30").hide();
                    $("#divFY31").hide();
                    $("#divFY32").hide();
                   
                }
                else if (Years == 11) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (10 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strSecondAnnual);
                    $('#FY21').val(strSecondAnnual);
                    $('#FY22').val(strSecondAnnual);
                    $('#FY23').val(strSecondAnnual);
                    $('#FY24').val(strSecondAnnual);
                    $('#FY25').val(strSecondAnnual);
                    $('#FY26').val(strSecondAnnual);
                    $('#FY27').val(strSecondAnnual);
                    $('#FY28').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").show();
                    $("#divFY22").show();
                    $("#divFY23").show();
                    $("#divFY24").show();
                    $("#divFY25").show();
                    $("#divFY26").show();
                    $("#divFY27").show();
                    $("#divFY28").show();
                    $("#divFY29").hide();
                    $("#divFY30").hide();
                    $("#divFY31").hide();
                    $("#divFY32").hide();
                  
                }
                else if (Years == 12) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (11 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strSecondAnnual);
                    $('#FY21').val(strSecondAnnual);
                    $('#FY22').val(strSecondAnnual);
                    $('#FY23').val(strSecondAnnual);
                    $('#FY24').val(strSecondAnnual);
                    $('#FY25').val(strSecondAnnual);
                    $('#FY26').val(strSecondAnnual);
                    $('#FY27').val(strSecondAnnual);
                    $('#FY28').val(strSecondAnnual);
                    $('#FY29').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").show();
                    $("#divFY22").show();
                    $("#divFY23").show();
                    $("#divFY24").show();
                    $("#divFY25").show();
                    $("#divFY26").show();
                    $("#divFY27").show();
                    $("#divFY28").show();
                    $("#divFY29").show();
                    $("#divFY30").hide();
                    $("#divFY31").hide();
                    $("#divFY32").hide();
  
                }
                else if (Years == 13) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (12 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strSecondAnnual);
                    $('#FY21').val(strSecondAnnual);
                    $('#FY22').val(strSecondAnnual);
                    $('#FY23').val(strSecondAnnual);
                    $('#FY24').val(strSecondAnnual);
                    $('#FY25').val(strSecondAnnual);
                    $('#FY26').val(strSecondAnnual);
                    $('#FY27').val(strSecondAnnual);
                    $('#FY28').val(strSecondAnnual);
                    $('#FY29').val(strSecondAnnual);
                    $('#FY30').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").show();
                    $("#divFY22").show();
                    $("#divFY23").show();
                    $("#divFY24").show();
                    $("#divFY25").show();
                    $("#divFY26").show();
                    $("#divFY27").show();
                    $("#divFY28").show();
                    $("#divFY29").show();
                    $("#divFY30").show();
                    $("#divFY31").hide();
                    $("#divFY32").hide();
                
                }
                else if (Years == 14) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (13 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strSecondAnnual);
                    $('#FY21').val(strSecondAnnual);
                    $('#FY22').val(strSecondAnnual);
                    $('#FY23').val(strSecondAnnual);
                    $('#FY24').val(strSecondAnnual);
                    $('#FY25').val(strSecondAnnual);
                    $('#FY26').val(strSecondAnnual);
                    $('#FY27').val(strSecondAnnual);
                    $('#FY28').val(strSecondAnnual);
                    $('#FY29').val(strSecondAnnual);
                    $('#FY30').val(strSecondAnnual);
                    $('#FY31').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").show();
                    $("#divFY22").show();
                    $("#divFY23").show();
                    $("#divFY24").show();
                    $("#divFY25").show();
                    $("#divFY26").show();
                    $("#divFY27").show();
                    $("#divFY28").show();
                    $("#divFY29").show();
                    $("#divFY30").show();
                    $("#divFY31").show();
                    $("#divFY32").hide();

                }
                else if (Years == 15) {
                    strFY = fn_KeepingCommas(((PaymentPeriods - PeriodMultiplier - (14 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                    $('#FY17').val(strAsk);
                    $('#FY18').val(strSecondAnnual);
                    $('#FY19').val(strSecondAnnual);
                    $('#FY20').val(strSecondAnnual);
                    $('#FY21').val(strSecondAnnual);
                    $('#FY22').val(strSecondAnnual);
                    $('#FY23').val(strSecondAnnual);
                    $('#FY24').val(strSecondAnnual);
                    $('#FY25').val(strSecondAnnual);
                    $('#FY26').val(strSecondAnnual);
                    $('#FY27').val(strSecondAnnual);
                    $('#FY28').val(strSecondAnnual);
                    $('#FY29').val(strSecondAnnual);
                    $('#FY30').val(strSecondAnnual);
                    $('#FY31').val(strSecondAnnual);
                    $('#FY32').val(strFY);
                    $("#divFY18").show();
                    $("#divFY19").show();
                    $("#divFY20").show();
                    $("#divFY21").show();
                    $("#divFY22").show();
                    $("#divFY23").show();
                    $("#divFY24").show();
                    $("#divFY25").show();
                    $("#divFY26").show();
                    $("#divFY27").show();
                    $("#divFY28").show();
                    $("#divFY29").show();
                    $("#divFY30").show();
                    $("#divFY31").show();
                    $("#divFY32").show();
                   
                }

            }

        }

        else if ((selected == "One Time") && DepreciationMonth != 1) {
            var value;
            if (Years == 1) {                       
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strFY);
                value = $('#FY18').val();
                if (value != 0) {
                    $("#divFY18").show();
                }
                else {
                    $("#divFY18").hide();
                }
                $("#divFY19").hide();
                $("#divFY20").hide();
                $("#divFY21").hide();
                $("#divFY22").hide();
                $("#divFY23").hide();
                $("#divFY24").hide();
                $("#divFY25").hide();
                $("#divFY26").hide();
                $("#divFY27").hide();
                $("#divFY28").hide();
                $("#divFY29").hide();
                $("#divFY30").hide();
                $("#divFY31").hide();
                $("#divFY32").hide();

            }
            else if (Years == 2) {               
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - AddMultiplier) * PeriodOpExCost).toFixed(0));  
                $('#FY17').val(strAsk);
                $("#divFY18").show();               
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strFY);
                value = $('#FY19').val();
                if (value != 0) {
                    $("#divFY19").show();
                }
                else {
                    $("#divFY19").hide();
                }
                $("#divFY20").hide();
                $("#divFY21").hide();
                $("#divFY22").hide();
                $("#divFY23").hide();
                $("#divFY24").hide();
                $("#divFY25").hide();
                $("#divFY26").hide();
                $("#divFY27").hide();
                $("#divFY28").hide();
                $("#divFY29").hide();
                $("#divFY30").hide();
                $("#divFY31").hide();
                $("#divFY32").hide();
            }
            else if (Years == 3) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (2 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                value = $('#FY20').val();
                if (value != 0) {
                    $("#divFY20").show();
                }
                else
                {
                    $("#divFY20").hide();
                }
                $("#divFY21").hide();
                $("#divFY22").hide();
                $("#divFY23").hide();
                $("#divFY24").hide();
                $("#divFY25").hide();
                $("#divFY26").hide();
                $("#divFY27").hide();
                $("#divFY28").hide();
                $("#divFY29").hide();
                $("#divFY30").hide();
                $("#divFY31").hide();
                $("#divFY32").hide();

            }
            else if (Years == 4) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (3 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strSecondAnnual);
                $('#FY21').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                $("#divFY20").show();
                value = $('#FY21').val();
                if (value != 0) {
                    $("#divFY21").show();
                }
                else {
                    $("#divFY21").hide();
                }        
                $("#divFY22").hide();
                $("#divFY23").hide();
                $("#divFY24").hide();
                $("#divFY25").hide();
                $("#divFY26").hide();
                $("#divFY27").hide();
                $("#divFY28").hide();
                $("#divFY29").hide();
                $("#divFY30").hide();
                $("#divFY31").hide();
                $("#divFY32").hide();

            }
            else if (Years == 5) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (4 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strSecondAnnual);
                $('#FY21').val(strSecondAnnual);
                $('#FY22').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                $("#divFY20").show();
                $("#divFY21").show();
                value = $('#FY22').val();
                if (value != 0) {
                    $("#divFY22").show();
                }
                else {
                    $("#divFY22").hide();
                }
                
                $("#divFY23").hide();
                $("#divFY24").hide();
                $("#divFY25").hide();
                $("#divFY26").hide();
                $("#divFY27").hide();
                $("#divFY28").hide();
                $("#divFY29").hide();
                $("#divFY30").hide();
                $("#divFY31").hide();
                $("#divFY32").hide();

            }
            else if (Years == 6) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (5 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strSecondAnnual);
                $('#FY21').val(strSecondAnnual);
                $('#FY22').val(strSecondAnnual);
                $('#FY23').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                $("#divFY20").show();
                $("#divFY21").show();
                $("#divFY22").show();
                value = $('#FY23').val();
                if (value != 0) {
                    $("#divFY23").show();
                }
                else {
                    $("#divFY23").hide();
                }
               
                $("#divFY24").hide();
                $("#divFY25").hide();
                $("#divFY26").hide();
                $("#divFY27").hide();
                $("#divFY28").hide();
                $("#divFY29").hide();
                $("#divFY30").hide();
                $("#divFY31").hide();
                $("#divFY32").hide();

            }
            else if (Years == 7) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (6 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strSecondAnnual);
                $('#FY21').val(strSecondAnnual);
                $('#FY22').val(strSecondAnnual);
                $('#FY23').val(strSecondAnnual);
                $('#FY24').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                $("#divFY20").show();
                $("#divFY21").show();
                $("#divFY22").show();
                $("#divFY23").show();
                value = $('#FY24').val();
                if (value != 0) {
                    $("#divFY24").show();
                }
                else {
                    $("#divFY24").hide();
                }
                
                $("#divFY25").hide();
                $("#divFY26").hide();
                $("#divFY27").hide();
                $("#divFY28").hide();
                $("#divFY29").hide();
                $("#divFY30").hide();
                $("#divFY31").hide();
                $("#divFY32").hide();

            }
            else if (Years == 8) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (7 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strSecondAnnual);
                $('#FY21').val(strSecondAnnual);
                $('#FY22').val(strSecondAnnual);
                $('#FY23').val(strSecondAnnual);
                $('#FY24').val(strSecondAnnual);
                $('#FY25').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                $("#divFY20").show();
                $("#divFY21").show();
                $("#divFY22").show();
                $("#divFY23").show();
                $("#divFY24").show();
                value = $('#FY25').val();
                if (value != 0) {
                    $("#divFY25").show();
                }
                else {
                    $("#divFY25").hide();
                }
               
                $("#divFY26").hide();
                $("#divFY27").hide();
                $("#divFY28").hide();
                $("#divFY29").hide();
                $("#divFY30").hide();
                $("#divFY31").hide();
                $("#divFY32").hide();

            }
            else if (Years == 9) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (8 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strSecondAnnual);
                $('#FY21').val(strSecondAnnual);
                $('#FY22').val(strSecondAnnual);
                $('#FY23').val(strSecondAnnual);
                $('#FY24').val(strSecondAnnual);
                $('#FY25').val(strSecondAnnual);
                $('#FY26').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                $("#divFY20").show();
                $("#divFY21").show();
                $("#divFY22").show();
                $("#divFY23").show();
                $("#divFY24").show();
                $("#divFY25").show();
                value = $('#FY26').val();
                if (value != 0) {
                    $("#divFY26").show();
                }
                else {
                    $("#divFY26").hide();
                }
               
                $("#divFY27").hide();
                $("#divFY28").hide();
                $("#divFY29").hide();
                $("#divFY30").hide();
                $("#divFY31").hide();
                $("#divFY32").hide();

            }
            else if (Years == 10) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (9 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strSecondAnnual);
                $('#FY21').val(strSecondAnnual);
                $('#FY22').val(strSecondAnnual);
                $('#FY23').val(strSecondAnnual);
                $('#FY24').val(strSecondAnnual);
                $('#FY25').val(strSecondAnnual);
                $('#FY26').val(strSecondAnnual);
                $('#FY27').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                $("#divFY20").show();
                $("#divFY21").show();
                $("#divFY22").show();
                $("#divFY23").show();
                $("#divFY24").show();
                $("#divFY25").show();
                $("#divFY26").show();
                value = $('#FY27').val();
                if (value != 0) {
                    $("#divFY27").show();
                }
                else {
                    $("#divFY27").hide();
                }
                
                $("#divFY28").hide();
                $("#divFY29").hide();
                $("#divFY30").hide();
                $("#divFY31").hide();
                $("#divFY32").hide();

            }
            else if (Years == 11) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (10 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strSecondAnnual);
                $('#FY21').val(strSecondAnnual);
                $('#FY22').val(strSecondAnnual);
                $('#FY23').val(strSecondAnnual);
                $('#FY24').val(strSecondAnnual);
                $('#FY25').val(strSecondAnnual);
                $('#FY26').val(strSecondAnnual);
                $('#FY27').val(strSecondAnnual);
                $('#FY28').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                $("#divFY20").show();
                $("#divFY21").show();
                $("#divFY22").show();
                $("#divFY23").show();
                $("#divFY24").show();
                $("#divFY25").show();
                $("#divFY26").show();
                $("#divFY27").show();
                value = $('#FY28').val();
                if (value != 0) {
                    $("#divFY28").show();
                }
                else {
                    $("#divFY28").hide();
                }
               
                $("#divFY29").hide();
                $("#divFY30").hide();
                $("#divFY31").hide();
                $("#divFY32").hide();

            }
            else if (Years == 12) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (11 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strSecondAnnual);
                $('#FY21').val(strSecondAnnual);
                $('#FY22').val(strSecondAnnual);
                $('#FY23').val(strSecondAnnual);
                $('#FY24').val(strSecondAnnual);
                $('#FY25').val(strSecondAnnual);
                $('#FY26').val(strSecondAnnual);
                $('#FY27').val(strSecondAnnual);
                $('#FY28').val(strSecondAnnual);
                $('#FY29').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                $("#divFY20").show();
                $("#divFY21").show();
                $("#divFY22").show();
                $("#divFY23").show();
                $("#divFY24").show();
                $("#divFY25").show();
                $("#divFY26").show();
                $("#divFY27").show();
                $("#divFY28").show();
                value = $('#FY29').val();
                if (value != 0) {
                   $("#divFY29").show();
                }
                else {
                    $("#divFY29").hide();
                }
                
                $("#divFY30").hide();
                $("#divFY31").hide();
                $("#divFY32").hide();

            }
            else if (Years == 13) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (12 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strSecondAnnual);
                $('#FY21').val(strSecondAnnual);
                $('#FY22').val(strSecondAnnual);
                $('#FY23').val(strSecondAnnual);
                $('#FY24').val(strSecondAnnual);
                $('#FY25').val(strSecondAnnual);
                $('#FY26').val(strSecondAnnual);
                $('#FY27').val(strSecondAnnual);
                $('#FY28').val(strSecondAnnual);
                $('#FY29').val(strSecondAnnual);
                $('#FY30').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                $("#divFY20").show();
                $("#divFY21").show();
                $("#divFY22").show();
                $("#divFY23").show();
                $("#divFY24").show();
                $("#divFY25").show();
                $("#divFY26").show();
                $("#divFY27").show();
                $("#divFY28").show();
                $("#divFY29").show();
                value = $('#FY30').val();
                if (value != 0) {
                    $("#divFY30").show();
                }
                else {
                    $("#divFY30").hide();
                }
                
                $("#divFY31").hide();
                $("#divFY32").hide();

            }
            else if (Years == 14) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (13 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strSecondAnnual);
                $('#FY21').val(strSecondAnnual);
                $('#FY22').val(strSecondAnnual);
                $('#FY23').val(strSecondAnnual);
                $('#FY24').val(strSecondAnnual);
                $('#FY25').val(strSecondAnnual);
                $('#FY26').val(strSecondAnnual);
                $('#FY27').val(strSecondAnnual);
                $('#FY28').val(strSecondAnnual);
                $('#FY29').val(strSecondAnnual);
                $('#FY30').val(strSecondAnnual);
                $('#FY31').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                $("#divFY20").show();
                $("#divFY21").show();
                $("#divFY22").show();
                $("#divFY23").show();
                $("#divFY24").show();
                $("#divFY25").show();
                $("#divFY26").show();
                $("#divFY27").show();
                $("#divFY28").show();
                $("#divFY29").show();
                $("#divFY30").show();
                value = $('#FY31').val();
                if (value != 0) {
                    $("#divFY31").show();
                }
                else {
                    $("#divFY31").hide();
                }
                
                $("#divFY32").hide();

            }
            else if (Years == 15) {
                strFY = fn_KeepingCommas(((PaymentPeriods - chargecount - (14 * AddMultiplier)) * PeriodOpExCost).toFixed(0));
                $('#FY17').val(strAsk);
                $('#FY18').val(strSecondAnnual);
                $('#FY19').val(strSecondAnnual);
                $('#FY20').val(strSecondAnnual);
                $('#FY21').val(strSecondAnnual);
                $('#FY22').val(strSecondAnnual);
                $('#FY23').val(strSecondAnnual);
                $('#FY24').val(strSecondAnnual);
                $('#FY25').val(strSecondAnnual);
                $('#FY26').val(strSecondAnnual);
                $('#FY27').val(strSecondAnnual);
                $('#FY28').val(strSecondAnnual);
                $('#FY29').val(strSecondAnnual);
                $('#FY30').val(strSecondAnnual);
                $('#FY31').val(strSecondAnnual);
                $('#FY32').val(strFY);
                $("#divFY18").show();
                $("#divFY19").show();
                $("#divFY20").show();
                $("#divFY21").show();
                $("#divFY22").show();
                $("#divFY23").show();
                $("#divFY24").show();
                $("#divFY25").show();
                $("#divFY26").show();
                $("#divFY27").show();
                $("#divFY28").show();
                $("#divFY29").show();
                $("#divFY30").show();
                $("#divFY31").show();
                value = $('#FY32').val();
                if (value != 0) {
                    $("#divFY32").show();
                }
                else {
                    $("#divFY32").hide();
                }
                

            }

        } else if (((selected == "One Time") || (selected == "Quarterly") || (selected == "Monthly")) && DepreciationMonth == 1)
        {
        strAsk = fn_KeepingCommas(FirstAnnualCharges);
        $('#FY17').val(strAsk);
        $('#FY18').val('');
        $('#FY19').val('');
        $('#FY20').val('');
        $('#FY21').val('');
        $('#FY22').val('');
        $('#FY23').val('');
        $('#FY24').val('');
        $('#FY25').val('');
        $('#FY26').val('');
        $('#FY27').val('');
        $('#FY28').val('');
        $('#FY29').val('');
        $('#FY30').val('');
        $('#FY31').val('');
        $('#FY32').val('');
        $("#divFY18").hide();
        $("#divFY19").hide();
        $("#divFY20").hide();
        $("#divFY21").hide();
        $("#divFY22").hide();
        $("#divFY23").hide();
        $("#divFY24").hide();
        $("#divFY25").hide();
        $("#divFY26").hide();
        $("#divFY27").hide();
        $("#divFY28").hide();
        $("#divFY29").hide();
        $("#divFY30").hide();
        $("#divFY31").hide();
        $("#divFY32").hide();
        }

        else
        {          
            budgetrequestjs.Fn_HideEmptyFutureFyvalues();
        }
    },

    //Hides and empty FY values when any field is empty
    Fn_HideEmptyFutureFyvalues: function()
    { 
        $('#FY17').val('');
        $('#FY18').val('');
        $('#FY19').val('');
        $('#FY20').val('');
        $('#FY21').val('');
        $('#FY22').val('');
        $('#FY23').val('');
        $('#FY24').val('');
        $('#FY25').val('');
        $('#FY26').val('');
        $('#FY27').val('');
        $('#FY28').val('');
        $('#FY29').val('');
        $('#FY30').val('');
        $('#FY31').val('');
        $('#FY32').val('');
        $("#divFY18").hide();
        $("#divFY19").hide();
        $("#divFY20").hide();
        $("#divFY21").hide();
        $("#divFY22").hide();
        $("#divFY23").hide();
        $("#divFY24").hide();
        $("#divFY25").hide();
        $("#divFY26").hide();
        $("#divFY27").hide();
        $("#divFY28").hide();
        $("#divFY29").hide();
        $("#divFY30").hide();
        $("#divFY31").hide();
        $("#divFY32").hide();
    },

    //Get Rate based on selected Position
    Fn_PositionRate: function (Position_Id) {
        if (Position_Id >= 1) {

            var urlPath = "/AdminPortal/GetPositionByPositionId";
           $.ajax({
                type: "Post",
                cache: false,
                url: urlPath,
                data: {
                    Position_Id: Position_Id
                },
                beforeSend: function () {

                },
                complete: function () {

                },
                success: function (result) {
                    var strRate = fn_KeepingCommas(result.rate);
                    $('#textRate').val(strRate);
                    budgetrequestjs.Fn_AskAmountForContainerExternal();


                },
                error: function (ex) {
                    alert("An error has occured!!!" + ex.responseText);
                }
            });
        } else {
            $('#textRate').val('');
            $('#AskAmountContainerExternal').val('');
            $('#FYImpact').val('');


        }
    },

    //handles calculation part for type-2
    Fn_AskAmountForContainerExternal: function () {
        
        var Rate, Quantity, AskAmount, Month,strValidationMsglists,Months,RemainingMonths1;
        strValidationMsglists = "";
        Month = $('#ddlStartMonth').find("option:selected").val();
        var Remaining = $('#RemainingMonthsRate').val();
        if (Month > 6)
        {
            Months = (19 - Month);
            if (Remaining > Months)
            {
           
                strValidationMsglists = strValidationMsglists + "<li>Selected value is greater than the max. allowed value.</li>";
                if (strValidationMsglists != "") {
                    strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>";
                    fn_ShowHideUserMessageDivWithCssClass_common('divDisplayRateMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                    RemainingMonths1 = document.getElementById("RemainingMonthsRate");
                    RemainingMonths1.placeholder = "(maximum allowed value is " + Months + ")";
                    $('#RemainingMonthsRate').val('');
                    return false;
                }
            }
          }
        if (Month <= 6) {
            Months = (7 - Month);
            if (Remaining > Months) {
                
                strValidationMsglists = strValidationMsglists + "<li>Selected value is greater than the max. allowed value.</li>";
                if (strValidationMsglists != "") {
                    strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>";
                    fn_ShowHideUserMessageDivWithCssClass_common('divDisplayRateMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                   RemainingMonths1 = document.getElementById("RemainingMonthsRate");
                   RemainingMonths1.placeholder = "(maximum allowed value is " + Months + ")";
                   $('#RemainingMonthsRate').val('');
                    return false;
                }
            }
        }
       
        Rate = $('#textRate').val();
        Rate = fn_RemovingCommas(Rate);
        Quantity = $('#Quantity').val();
        var Num = 173.3;
        var Total = (Quantity * Rate * Remaining * Num).toFixed(0);
        var FormattedTotal = fn_KeepingCommas(Total);
         $('#AskAmountContainerExternal').val(FormattedTotal);
        $('#FYImpact').val(FormattedTotal);

    },

    //handles calculation for type-3
    Fn_OnChangeProd: function () {

        var Total, July16, August16, September16, October16, November16, December16, January17, February17, March17, April17, May17, June17;
        July16 = $('#July').val();
        July16 = fn_RemovingCommas(July16);
        August16 = $('#August').val();
        August16 = fn_RemovingCommas(August16);
        September16 = $('#September').val();
        September16 = fn_RemovingCommas(September16);
        October16 = $('#October').val();
        October16 = fn_RemovingCommas(October16);
        November16 = $('#November').val();
        November16 = fn_RemovingCommas(November16);
        December16 = $('#December').val();
        December16 = fn_RemovingCommas(December16);
        January17 = $('#January').val();
        January17 = fn_RemovingCommas(January17);
        February17 = $('#February').val();
        February17 = fn_RemovingCommas(February17);
        March17 = $('#March').val();
        March17 = fn_RemovingCommas(March17);
        April17 = $('#April').val();
        April17 = fn_RemovingCommas(April17);
        May17 = $('#May').val();
        May17 = fn_RemovingCommas(May17);
        June17 = $('#June').val();
        June17 = fn_RemovingCommas(June17);
        var Total = (Number(July16) + Number(August16) + Number(September16) + Number(October16) + Number(November16) + Number(December16) + Number(January17) + Number(February17) + Number(March17) + Number(April17) + Number(May17) + Number(June17));
        var Total1 = Total.toFixed(0);
        fn_KeepingCommas(Total1);
       
    },

     //handles category dropdown change
    Fn_CategoryDropdown: function (Category_Id) {
        if (Category_Id > 1) {
            var urlPath = "/AdminPortal/GetCategoryByCategoryId";
          $.ajax({
                type: "Post",
                cache: false,
                url: urlPath,
                data: {
                    Category_Id: Category_Id
                },
                beforeSend: function () {

                },
                complete: function () {

                },
                success: function (result) {
                    $('#hidecategorytype').val(result.Category_Type_Id);
                    if (result.Category_Type_Id == 0) {
                        $("#ContainerLab").hide();
                        $("#ContainerExternal").hide();
                        $("#ContainerProd").hide();
                        $("#ContainerCloud").hide();
                    }
                    else if (result.Category_Type_Id == 1) {
                        $("#ContainerLab").show();
                        $("#ContainerExternal").hide();
                        $("#ContainerProd").hide();
                        $("#ContainerCloud").hide();
                    }
                    else if (result.Category_Type_Id == 2) {
                        $("#ContainerLab").hide();
                        $("#ContainerExternal").show();
                        $("#ContainerProd").hide();
                        $("#ContainerCloud").hide();
                    }
                    else if (result.Category_Type_Id == 3) {
                        $("#ContainerLab").hide();
                        $("#ContainerExternal").hide();
                        $("#ContainerProd").show();
                        $("#ContainerCloud").hide();
                    }
                    else if (result.Category_Type_Id == 4) {
                        $("#ContainerLab").hide();
                        $("#ContainerExternal").hide();
                        $("#ContainerProd").hide();
                        $("#ContainerCloud").show();
                        $("#ddlInvestment4").attr('disabled', 'disabled');
                        $('#ddlInvestment4 option').map(function () {
                            if ($(this).text() == "[NI] New Investment") return this;
                        }).attr('selected', 'selected');


                    }



                },
                error: function () {
                    // alert("An error has occured!!!" + ex.responseText);
                }
            });
        } else {
            $("#ContainerLab").hide();
            $("#ContainerExternal").hide();
            $("#ContainerProd").hide();
            $("#ContainerCloud").hide();

        }

    },

    //handles edit mode for budget request page from landing page grid
    Fn_EditBudgetRequest: function () {      
        var  BudgetRequest_Id,urlPath;
        BudgetRequest_Id = $('#hdnbudgetrequest').val();
        urlPath = "/BudgetRequest/GetAllBudgetRequest";
        if (BudgetRequest_Id > 0) { 
           $.ajax({
                type: "POST",
                cache: false,
                url: urlPath,
                
                data: {
                    BudgetRequest_Id: BudgetRequest_Id
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
                    $('#ddlTeam').removeAttr('disabled');
                    $('#ddlProject').removeAttr('disabled');  
                    $('#ddlSubProject').removeAttr('disabled');
                    if (result != null) {
           
                                Status = document.getElementById("StatusDisplay");
                                Status.innerText = result.Approval_Status_Name;
                                $('.clsGroup').val(result.Group_Id);
                                var params = [];
                                params.Group_Id = result.Group_Id;
                                params.Team_Id = result.Team_Id;
                                params.beforeSend = budgetrequestjs.TeambeforeSend;
                                params.success = budgetrequestjs.TeamSuccess
                                commonjs.fn_GetTeam(params);
                                params = [];
                                params.Team_Id = result.Team_Id;
                                params.Project_Id = result.Project_Id;
                                params.beforeSend = budgetrequestjs.ProjectbeforeSend;
                                params.success = budgetrequestjs.ProjectSuccess
                                commonjs.fn_GetProject(params);
                                //budgetrequestjs.Fn_ProjectDescription(result.Project_Id);
                                params = [];
                                params.Project_Id = result.Project_Id;
                                params.Sub_Project_Id = result.Sub_Project_Id;
                                params.beforeSend = budgetrequestjs.SubProjectbeforeSend;
                                params.success = budgetrequestjs.SubProjectSuccess
                                commonjs.fn_GetSubProject(params);
                                $("#ProjectDescription").val(result.Project_description);
                                $("#BusinessWin").val(result.Business_win);
                                $('.clsTrio').val(result.Trio_Id);
                                $('.clsPriority').val(result.Priority_Id);
                                //$("#source").val(result[i].Contact_Point);
                                $("#source").val(result.User_DisplayName);
                                $("#hidefirst").val(result.User_FirstName);
                                $("#hidelast").val(result.User_LastName);
                                $("#hidedisplay").val(result.User_DisplayName);
                                $("#hidealias").val(result.User_Alias);
                                $("#LineItemDesc").val(result.Line_item_Description);
                                $("#LineItemBusiness").val(result.Line_item_Business_Impact);
                                $('.clsCategory').val(result.Category_Id);
                                budgetrequestjs.Fn_CategoryDropdown(result.Category_Id);
                                $('.clsClass').val(result.Class_Id);
                                $('.clsInvestmentType').val(result.Investment_Type_Id);
                                $('.clsLabCompany').val(result.LabCompany_Id);
                                $('.clsRelease').val(result.Release_Id);
                                $('#GlobalAskAmount').val((result.Ask_Amount).toFixed(0));

                                if (result.Category_Type_Id == 1)
                                {
                                    $('.clsLabDevice').val(result.Device_Type_Id);
                                    $("#Quantity1").val(result.Quantity);
                                    $('.clsSeasonalityType').val(result.Seasonality_Type_Id);
                                    $('.clsPurchaseMonth').val(result.Purchases_Month_Id);
                                    strAsk = fn_KeepingCommas((result.Ask_Amount).toFixed(0));
                                    $("#AskAmount").val(strAsk);
                                    $("#RequestorComment").val(result.Requestor_Comment);
                                    budgetrequestjs.Fn_DepreciationbyDevice(result.Device_Type_Id);
                                }
                                else if (result.Category_Type_Id == 2)
                                {
                                    $('.clsResorceType').val(result.Resource_Type_Id);
                                    $('.clsPosition').val(result.Position_Id);
                                    $("#Quantity").val(result.Quantity);
                                    $('.clsStartMonth').val(result.Start_month_Id);
                                    $("#RemainingMonthsRate").val(result.No_Of_Month);
                                    strAsk = fn_KeepingCommas((result.Ask_Amount).toFixed(0));
                                    $('#AskAmountContainerExternal').val(strAsk);
                                    $("#RequestorComment").val(result.Requestor_Comment);
                                    budgetrequestjs.Fn_PositionRate(result.Position_Id);

                                }
                                else if (result.Category_Type_Id == 3)
                                {
                                    if (result.July_Amount != null)
                                    {
                                        strJuly = fn_KeepingCommas((result.July_Amount).toFixed(0));
                                        $("#July").val(strJuly);
                                    }
                                    if (result.Aug_Amount != null)
                                    {
                                         strAugust = fn_KeepingCommas((result.Aug_Amount).toFixed(0));
                                         $("#August").val(strAugust);
                                    }
                                    if (result.Sep_Amount != null)
                                    {
                                         strSeptember = fn_KeepingCommas((result.Sep_Amount).toFixed(0));
                                         $("#September").val(strSeptember);
                                    }
                                    if (result.Oct_Amount != null)
                                    {
                                        strOctober = fn_KeepingCommas((result.Oct_Amount).toFixed(0));
                                        $("#October").val(strOctober);
                                    }
                                    if (result.Nov_Amount != null)
                                    {
                                        strNovember = fn_KeepingCommas((result.Nov_Amount).toFixed(0));
                                        $("#November").val(strNovember);
                                    }
                                    if (result.Dec_Amount != null)
                                    {
                                        strDecember = fn_KeepingCommas((result.Dec_Amount).toFixed(0));
                                        $("#December").val(strDecember);
                                    }
                                    if (result.Jan_Amount != null)
                                    {
                                        strJanuary = fn_KeepingCommas((result.Jan_Amount).toFixed(0));
                                        $("#January").val(strJanuary);
                                    }
                                    if (result.Feb_Amount != null)
                                    {
                                        strFebruary = fn_KeepingCommas((result.Feb_Amount).toFixed(0));
                                        $("#February").val(strFebruary);
                                    }
                                    if (result.Mar_Amount != null)
                                    {
                                        strMarch = fn_KeepingCommas((result.Mar_Amount).toFixed(0));
                                        $("#March").val(strMarch);
                                     }
                                    if (result.April_Amount != null)
                                    {
                                        strApril = fn_KeepingCommas((result.April_Amount).toFixed(0));
                                        $("#April").val(strApril);
                                    }
                                    if (result.May_Amount != null)
                                    {
                                        strMay = fn_KeepingCommas((result.May_Amount).toFixed(0));
                                        $("#May").val(strMay);
                                     }
                                    if (result.June_Amount != null)
                                    {
                                        strJune = fn_KeepingCommas((result.June_Amount).toFixed(0));
                                        $("#June").val(strJune);
                                    }
                                    strAsk = fn_KeepingCommas((result.Ask_Amount).toFixed(0));
                                    $('#AskAmountProd').val(strAsk);
                                    $("#RequestorComment").val(result.Requestor_Comment);
                                    budgetrequestjs.Fn_OnChangeProd();
                                }
                                else if (result.Category_Type_Id == 4)
                                {
                                    strAsk = fn_KeepingCommas((result.Ask_Amount).toFixed(0));
                                    $('#AskAmountCloud').val(strAsk);
                                    $("#RequestorComment").val(result.Requestor_Comment);
                                    //Load Category4Type file list grid 
                                    budgetrequestjs.fn_loadCategory4FileList(result.StorageDetail);
                                    //copying ask amount value to FY impact field
                                    FYImpact();
                                }

                               
                                //if (result.Approval_Status_Id > 2) {
                                //    $(".clsStatus").val(result.Approval_Status_Id);
                                //}
                                //if (result.Approver_Reduction_Percentage != null) {
                                //$("#ReductionRequest").val((result.Approver_Reduction_Percentage).toFixed(0));
                                //}
                                //if (result.Approved_Amount != null) {
                                //    $("#ApprovedRequest").val((result.Approved_Amount).toFixed(0));
                            //}

                            //Disabling Approval workflow for draft lineitem

                                if (result.Approval_Status_Name == "Draft")
                                {
                                    $("#ApproverCommentsrequest").val('');
                                    $("#ApprovedRequest").val('');
                                    $("#ReductionRequest").val('');
                                    $(".clsStatus").val(0);                                  
                                    $("#ApprovalFlow").hide();

                                }
                                else
                                {
                                $("#ApproverCommentsrequest").val(result.Approver_Comment);
                                strAsk = fn_KeepingCommas((result.Ask_Amount).toFixed(0));
                                $("#ApprovedRequest").val(strAsk);
                                $("#ReductionRequest").val(0);
                                }
                               
                                
    
                            }
                        


                },
                error: function (ex) {
                    alert(ex.responseText);
                }
            });
        }
   
    },

    fn_loadCategory4FileList:function(data)
    {
       var urlPath = "/BudgetRequest/LoadCategory4FileList";
        $.ajax({
            type: "Post",
            cache: false,
            url: urlPath,
            data: {
                data: data
            },
            beforeSend: function () {

            },
            complete: function () {
               // $("#divOrignalCategory4FileList").find('table tr').find('td:eq(1),th:eq(1)').hide();
            },
            success: function (result) {
                $("#divCategory4FileList").html('');
                $("#divCategory4FileList").html(result);
            }
            ,
            error: function (ex) {
                alert(ex.responseText);
            }
        });

    },

    //common function for submit and draft buttons
    Fn_BudgetRequestCommon: function (DraftFlag, IsSubmitted, Approval_Status_Id) {      
        var  BudgetRequest_Id,  Group_Id, Team_Id, Trio_Id, Project_Id, Sub_Project_Id, Priority_Id, Resource_Type_Id, Position_Id, Contact_Point,
           Line_item_Description, Line_item_Business_Impact, Category_Id, Class_Id, Investment_Type_Id, LabCompany_Id, Release_Id, Device_Type_Id, Seasonality_Type_Id
           , Fisical_Id, Purchases_Month_Id, Start_month_Id, No_Of_Month, Ask_Amount, Approval_Stage_Id, July_Amount, Aug_Amount, Sep_Amount, Oct_Amount, Nov_Amount, Dec_Amount, Jan_Amount, Feb_Amount,
           Mar_Amount, April_Amount, May_Amount, June_Amount, Category_Type, Requestor_Comment, Approver_Reduction_Percentage, Approved_Amount, Approver_Comment, User_FirstName, User_LastName, User_DisplayName, User_Alias, HasQuestion,Year_Impact;
        var strValidationMsglists = "";
        var StorageDetail = "";

        BudgetRequest_Id = $('#hdnbudgetrequest').val();  
        Group_Id = $("#ddlGroup :selected").val();
        Team_Id = $("#ddlTeam :selected").val();
        Trio_Id = $("#ddlTrio :selected").val();
        Project_Id = $("#ddlProject :selected").val();
        Sub_Project_Id = $("#ddlSubProject :selected").val();
        Priority_Id = $("#ddlPriority :selected").val();
        Contact_Point = $("#source").val();        
        User_FirstName = $("#hidefirst").val();
        User_LastName = $("#hidelast").val();
        User_DisplayName = $("#hidedisplay").val();
        User_Alias = $("#hidealias").val();
        Line_item_Description = $('#LineItemDesc').val();
        Line_item_Business_Impact = $('#LineItemBusiness').val();
        Category_Id = $("#ddlCategory :selected").val();
        Fisical_Id = null;
        Approval_Stage_Id = null;
        // LineItem_SubStatus_Id = null;
        Requestor_Comment = $("#RequestorComment").text();
        Approver_Reduction_Percentage = $("#ReductionRequest").val();
        Approved_Amount = $('#ApprovedRequest').val();
        if (Approved_Amount != undefined)
        {
         Approved_Amount = fn_RemovingCommas(Approved_Amount);
        }       
        Approver_Comment = $("#ApproverCommentsrequest").text();
        HasQuestion = null;

        //HasQuestion = $("input:radio[name=Question]:checked").val()
        //if (HasQuestion == 1)
        //    {
        //HasQuestion = true;
        //}
        //else
        //{
        //    HasQuestion = false;
        //}
        //category type selected values
        Category_Type = $('#hidecategorytype').val();
        var Quantity;
        if (Category_Type == 1) {
            
            Class_Id = $("#ddlClass1 :selected").val();
            Investment_Type_Id = $("#ddlInvestment1 :selected").val();
            LabCompany_Id = $("#ddlLabCompany1 :selected").val();
            Release_Id = $("#ddlRelease1 :selected").val();
            Device_Type_Id = $("#ddlLabDevice :selected").val();
            Quantity = $('#Quantity1').val();
            Seasonality_Type_Id = $("#ddlSeasonality :selected").val();
            Purchases_Month_Id = $("#ddlPurchaseMonth :selected").val();          
            Ask_Amount = $('#AskAmount').val().trim();
            Ask_Amount = fn_RemovingCommas(Ask_Amount);
            Year_Impact = $('#FY17').val();
            Year_Impact = fn_RemovingCommas(Year_Impact);
            //Draft Request
            if (DraftFlag == 1)
            {
                if (Purchases_Month_Id == "0")
                {
                    Purchases_Month_Id = null;
                }
                if (Class_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Class before saving budget request.</li>";
                }
                if (Investment_Type_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Investment Type before saving budget request.</li>";
                }
                if (LabCompany_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Lab Company before saving budget request.</li>";
                }
                if (Release_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Release before saving budget request.</li>";
                }

                //if (fn_Decimalvalidation(Quantity)) {
                //    strValidationMsglists = strValidationMsglists + "<li>Quantity should be either Numeric or Decimal number.</li>";
                //}
            
                if ((Ask_Amount % 1 != 0)) {
                    strValidationMsglists = strValidationMsglists + "<li>Ask Amount should be a whole number only. No decimals allowed.</li>";
                }

            }


        //validations for submit button
            else
            {
          
            if (Class_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Class before saving budget request.</li>";
            }
            if (Investment_Type_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Investment Type before saving budget request.</li>";
            }
            if (LabCompany_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Lab Company before saving budget request.</li>";
            }
            if (Release_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Release before saving budget request.</li>";
            }

            if (Device_Type_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Device Type before saving budget request.</li>";
            }
            if ((Quantity == "") || (fn_Decimalvalidation(Quantity))) {
                strValidationMsglists = strValidationMsglists + "<li>Quantity is required and it should be either Numeric or Decimal number.</li>";
            }
            if (Seasonality_Type_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Seasonality Type before saving budget request.</li>";
            }
            if (Purchases_Month_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Purchase Month before saving budget request.</li>";
            }
            if ((Ask_Amount == "") || (fn_numbervalidation(Ask_Amount)) || (Ask_Amount % 1 != 0)) {
                strValidationMsglists = strValidationMsglists + "<li>Ask Amount is mandatory and it should be a whole number only. No decimals allowed.</li>";
            }




            }



        }
        else if (Category_Type == 2) {
            Class_Id = $("#ddlClass2 :selected").val();
            Investment_Type_Id = $("#ddlInvestment2 :selected").val();
            LabCompany_Id = $("#ddlLabCompany2 :selected").val();
            Release_Id = $("#ddlRelease2 :selected").val();
            Resource_Type_Id = $("#ddlResourceType :selected").val();
            Position_Id = $("#ddlPosition :selected").val();
            Quantity = $('#Quantity').val();
            Start_month_Id = $("#ddlStartMonth :selected").val();
            No_Of_Month = $('#RemainingMonthsRate').val();
            Ask_Amount = $('#AskAmountContainerExternal').val();
            Ask_Amount = fn_RemovingCommas(Ask_Amount);
            Year_Impact = $('#FYImpact').val();
            Year_Impact = fn_RemovingCommas(Year_Impact);

           //Draft Request
            if (DraftFlag == 1)
            {
                if (Start_month_Id == "0") {
                    Start_month_Id = null;
                }
                if (Class_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Class before saving budget request.</li>";
                }
                if (Investment_Type_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Investment Type before saving budget request.</li>";
                }
                if (LabCompany_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Lab Company before saving budget request.</li>";
                }
                if (Release_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Release before saving budget request.</li>";
                }
                //if ((fn_Decimalvalidation(Quantity)))
                //{               
                //    strValidationMsglists = strValidationMsglists + "<li>Quantity should be either Numeric or Decimal number.</li>";
                //}
  
            }
            //validations for request submission
            else
            {
            if (Class_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Class before saving budget request.</li>";
            }
            if (Investment_Type_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Investment Type before saving budget request.</li>";
            }
            if (LabCompany_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Lab Company before saving budget request.</li>";
            }
            if (Release_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Release before saving budget request.</li>";
            }
            if (Resource_Type_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Resource Type before saving budget request.</li>";
            }
            if (Position_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Position before saving budget request.</li>";
            }
            if ((Quantity == "") || (fn_Decimalvalidation(Quantity))) {
                strValidationMsglists = strValidationMsglists + "<li>Quantity is required and it should be either Numeric or Decimal number.</li>";
            }
            if (Start_month_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Start Month before saving budget request.</li>";
            }
            if ((No_Of_Month == "") || (fn_numbervalidation(No_Of_Month))) {
                strValidationMsglists = strValidationMsglists + "<li>Number of Months is required and it should be numeric.</li>";
            }
            }

        }
        else if (Category_Type == 3) {          
            Class_Id = $("#ddlClass3 :selected").val();
            Investment_Type_Id = $("#ddlInvestment3 :selected").val();
            LabCompany_Id = $("#ddlLabCompany3 :selected").val();
            Release_Id = $("#ddlRelease3 :selected").val();
            July_Amount = $('#July').val().trim();
            July_Amount = fn_RemovingCommas(July_Amount);
            Aug_Amount = $('#August').val().trim();
            Aug_Amount = fn_RemovingCommas(Aug_Amount);
            Sep_Amount = $('#September').val().trim();
            Sep_Amount = fn_RemovingCommas(Sep_Amount);
            Oct_Amount = $('#October').val().trim();
            Oct_Amount = fn_RemovingCommas(Oct_Amount);
            Nov_Amount = $('#November').val().trim();
            Nov_Amount = fn_RemovingCommas(Nov_Amount);
            Dec_Amount = $('#December').val().trim();
            Dec_Amount = fn_RemovingCommas(Dec_Amount);
            Jan_Amount = $('#January').val().trim();
            Jan_Amount = fn_RemovingCommas(Jan_Amount);
            Feb_Amount = $('#February').val().trim();
            Feb_Amount = fn_RemovingCommas(Feb_Amount);
            Mar_Amount = $('#March').val().trim();
            Mar_Amount = fn_RemovingCommas(Mar_Amount);
            April_Amount = $('#April').val().trim();
            April_Amount = fn_RemovingCommas(April_Amount);
            May_Amount = $('#May').val().trim();
            May_Amount = fn_RemovingCommas(May_Amount);
            June_Amount = $('#June').val().trim();
            June_Amount = fn_RemovingCommas(June_Amount);
            Year_Impact = $('#FY17Impact').val();
            Year_Impact = fn_RemovingCommas(Year_Impact);
            Quantity = "";
            Ask_Amount = $('#AskAmountProd').val();
            Ask_Amount = fn_RemovingCommas(Ask_Amount);
            //draft request
            if (DraftFlag == 1)
            {
                if (Class_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Class before saving budget request.</li>";
                }
                if (Investment_Type_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Investment Type before saving budget request.</li>";
                }
                if (LabCompany_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Lab Company before saving budget request.</li>";
                }
                if (Release_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Release before saving budget request.</li>";
                }

                if (((fn_numbervalidation(July_Amount)) && (July_Amount % 1 != 0)) || ((fn_numbervalidation(Aug_Amount)) && (Aug_Amount % 1 != 0)) || ((fn_numbervalidation(Sep_Amount)) && (Sep_Amount % 1 != 0)) || ((fn_numbervalidation(Oct_Amount)) && (Oct_Amount % 1 != 0)) || ((fn_numbervalidation(Nov_Amount)) && (Nov_Amount % 1 != 0)) || ((fn_numbervalidation(Dec_Amount)) && (Dec_Amount % 1 != 0)) || ((fn_numbervalidation(Jan_Amount)) && (Jan_Amount % 1 != 0)) || ((fn_numbervalidation(Feb_Amount)) && (Feb_Amount % 1 != 0)) && ((fn_numbervalidation(Mar_Amount)) && (Mar_Amount % 1 != 0)) || ((fn_numbervalidation(April_Amount)) && (April_Amount % 1 != 0)) || ((fn_numbervalidation(May_Amount)) && (May_Amount % 1 != 0)) || ((fn_numbervalidation(June_Amount)) && (June_Amount % 1 != 0))) {
                    strValidationMsglists = strValidationMsglists + "<li>Month Amount should be a whole number only. No decimals allowed.</li>";
                }

            }

            //validation for submit
            else
           {
            if (Class_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Class before saving budget request.</li>";
            }
            if (Investment_Type_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Investment Type before saving budget request.</li>";
            }
            if (LabCompany_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Lab Company before saving budget request.</li>";
            }
            if (Release_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Release before saving budget request.</li>";
            }

            if (((July_Amount == "") || (fn_numbervalidation(July_Amount)) || (July_Amount % 1 != 0)) && ((Aug_Amount == "") || (fn_numbervalidation(Aug_Amount)) || (Aug_Amount % 1 != 0)) && ((Sep_Amount == "") || (fn_numbervalidation(Sep_Amount)) || (Sep_Amount % 1 != 0)) && ((Oct_Amount == "") || (fn_numbervalidation(Oct_Amount)) || (Oct_Amount % 1 != 0)) && ((Nov_Amount == "") || (fn_numbervalidation(Nov_Amount)) || (Nov_Amount % 1 != 0)) && ((Dec_Amount == "") || (fn_numbervalidation(Dec_Amount)) || (Dec_Amount % 1 != 0)) && ((Jan_Amount == "") || (fn_numbervalidation(Jan_Amount)) || (Jan_Amount % 1 != 0)) && ((Feb_Amount == "") || (fn_numbervalidation(Feb_Amount)) || (Feb_Amount % 1 != 0)) && ((Mar_Amount == "") || (fn_numbervalidation(Mar_Amount)) || (Mar_Amount % 1 != 0)) && ((April_Amount == "") || (fn_numbervalidation(April_Amount)) || (April_Amount % 1 != 0)) && ((May_Amount == "") || (fn_numbervalidation(May_Amount)) || (May_Amount % 1 != 0)) && ((June_Amount == "") || (fn_numbervalidation(June_Amount)) || (June_Amount % 1 != 0))) {
                strValidationMsglists = strValidationMsglists + "<li>Minimum One Month Amount is required and it should be a whole number only. No decimals allowed.</li>";
            }

            }

        }
        else if (Category_Type == 4) {
            Class_Id = $("#ddlClass4 :selected").val();
            Investment_Type_Id = $("#ddlInvestment4 :selected").val();
            LabCompany_Id = $("#ddlLabCompany4 :selected").val();
            Release_Id = $("#ddlRelease4 :selected").val();
            Ask_Amount = $("#AskAmountCloud").val().trim();
            Ask_Amount = fn_RemovingCommas(Ask_Amount);
            Year_Impact = $('#FY17ImpactCloud').val();
            Year_Impact = fn_RemovingCommas(Year_Impact);
            Quantity = "";
          

            StorageDetail = '<storage>';
            $('#divCategory4FileList').find('table').find('input[name="chkIsDelete"]').each(function () {
                StorageDetail +='<file>'
                StorageDetail += '<name>' + $(this).closest('tr').attr('data-name') + '</name>';
                StorageDetail += '<blob>' + $(this).closest('tr').attr('data-blob') + '</blob>';
                StorageDetail += '<downloadurl>' + $(this).closest('tr').attr('data-downloadurl') + '</downloadurl>';
                if ($(this).prop("checked")){
                    StorageDetail += '<isdeleted>' + 1 + '</isdeleted>';
                }
                StorageDetail += '</file>';
                
            });
            StorageDetail += '</storage>';

            //draft request
            if (DraftFlag == 1)
            {
                if (Class_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Class before saving budget request.</li>";
                }
                if (Investment_Type_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Investment Type before saving budget request.</li>";
                }
                if (LabCompany_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Lab Company before saving budget request.</li>";
                }
                if (Release_Id < 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Release before saving budget request.</li>";
                }
                if ((Ask_Amount % 1 != 0)) {
                    strValidationMsglists = strValidationMsglists + "<li>Ask Amount should be a whole number only. No decimals allowed.</li>";
                }
            }
                //submit validations
            else
            {

                if (Class_Id <= 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Class before saving budget request.</li>";
                }
                if (Investment_Type_Id <= 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Investment Type before saving budget request.</li>";
                }
                if (LabCompany_Id <= 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Lab Company before saving budget request.</li>";
                }
                if (Release_Id <= 1) {
                    strValidationMsglists = strValidationMsglists + "<li>Select a valid Release before saving budget request.</li>";
                }

                if ((Ask_Amount == "") || (fn_numbervalidation(Ask_Amount)) || (Ask_Amount % 1 != 0)) {
                    strValidationMsglists = strValidationMsglists + "<li>Ask Amount is mandatory and it should be a whole number only. No decimals allowed.</li>";
                }
                if ($('#divCategory4FileList').find('table').find('input[name="chkIsDelete"]:not(:checked)').length <= 0) {
                    strValidationMsglists = strValidationMsglists + "<li>Excel file with Azure Budget calculation must be attached with the request.</li>";
                }
            }

        }


        //draft request
        if (DraftFlag == 1) {

         
            if (Group_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Group before saving budget request.</li>";
            }
            if (Team_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Team before saving budget request.</li>";
            }        
            if (Project_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Project before saving budget request.</li>";
            }
            if (Sub_Project_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Sub-Project before saving budget request.</li>";
            }      
            if ((Line_item_Description == "") || (fn_namevalidation(Line_item_Description))) {
                strValidationMsglists = strValidationMsglists + "<li>Line Item Description is required and it shouldn't be numeric.</li>";
            }
            if ((Line_item_Business_Impact == "") || (fn_namevalidation(Line_item_Business_Impact))) {
                strValidationMsglists = strValidationMsglists + "<li>Line Item Business Impact is required and it shouldn't be numeric.</li>";
            }
            if (Category_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Category before saving budget request.</li>";
            }

            if (fn_namevalidation(Requestor_Comment)) {
                strValidationMsglists = strValidationMsglists + "<li>Requestor comment shouldn't be numeric.</li>";
            }
        }
        //validations
        else
        {
           
            if (Group_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Group before saving budget request.</li>";
            }
            if (Team_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Team before saving budget request.</li>";
            }
            if (Trio_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Trio before saving budget request.</li>";
            }
            if (Project_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Project before saving budget request.</li>";
            }
            if (Sub_Project_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Sub-Project before saving budget request.</li>";
            }
            if (Priority_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Priority before saving budget request.</li>";
            }
            if (Contact_Point == "") {
                strValidationMsglists = strValidationMsglists + "<li>Select a Point of Contact before saving budget request.</li>";
            }
            if ((Line_item_Description == "") || (fn_namevalidation(Line_item_Description))) {
                strValidationMsglists = strValidationMsglists + "<li>Line Item Description is required and it shouldn't be numeric.</li>";
            }
            if ((Line_item_Business_Impact == "") || (fn_namevalidation(Line_item_Business_Impact))) {
                strValidationMsglists = strValidationMsglists + "<li>Line Item Business Impact is required and it shouldn't be numeric.</li>";
            }

            if (Category_Id <= 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Category before saving budget request.</li>";
            }
            if (fn_namevalidation(Requestor_Comment)) {
                strValidationMsglists = strValidationMsglists + "<li>Requestor comment shouldn't be numeric.</li>";
            }


}
       

        var ResultData = {
            data: {
                BudgetRequest_Id: BudgetRequest_Id,       
                Group_Id: Group_Id,
                Team_Id: Team_Id,
                Trio_Id: Trio_Id,
                Project_Id: Project_Id,
                Sub_Project_Id: Sub_Project_Id,
                Priority_Id: Priority_Id,
                Resource_Type_Id: Resource_Type_Id,
                Position_Id: Position_Id,
                Contact_Point: Contact_Point,
                Line_item_Description: Line_item_Description,
                Line_item_Business_Impact: Line_item_Business_Impact,
                Category_Id: Category_Id,
                Class_Id: Class_Id,
                Investment_Type_Id: Investment_Type_Id,
                LabCompany_Id: LabCompany_Id,
                Release_Id: Release_Id,
                Quantity: Quantity,
                Device_Type_Id: Device_Type_Id,
                Seasonality_Type_Id: Seasonality_Type_Id,
                Fisical_Id: Fisical_Id,
                Purchases_Month_Id: Purchases_Month_Id,
                Start_month_Id: Start_month_Id,
                No_Of_Month: No_Of_Month,
                Ask_Amount: Ask_Amount,
                Year_Impact: Year_Impact,
                Approval_Stage_Id: Approval_Stage_Id,
                Approval_Status_Id: Approval_Status_Id,
                July_Amount: July_Amount,
                Aug_Amount: Aug_Amount,
                Sep_Amount: Sep_Amount,
                Oct_Amount: Oct_Amount,
                Nov_Amount: Nov_Amount,
                Dec_Amount: Dec_Amount,
                Jan_Amount: Jan_Amount,
                Feb_Amount: Feb_Amount,
                Mar_Amount: Mar_Amount,
                April_Amount: April_Amount,
                May_Amount: May_Amount,
                June_Amount: June_Amount,
                Requestor_Comment: Requestor_Comment,
                IsSubmitted: IsSubmitted,
                Approver_Reduction_Percentage: Approver_Reduction_Percentage,
                Approved_Amount: Approved_Amount,
                Approver_Comment: Approver_Comment,
                HasQuestion:HasQuestion,
                User_FirstName: User_FirstName,
                User_LastName: User_LastName,
                User_DisplayName: User_DisplayName,
                User_Alias: User_Alias,
                StorageDetail: escape(StorageDetail)
                
               

            },
            ValidationMessage: strValidationMsglists
            
        }
        return ResultData;
    },

    //This will Handle the User Alias Selection Change Event.
        UserAliasOnChangeHandler: function () {
           
            var UserAlias, urlPath, ajaxRequest, i;

            UserAlias = $("#UserId").text();  
            urlPath = "/BudgetSummary/GetUserGroup";
            if (UserAlias != '') {
                ajaxRequest = $.ajax({
                    type: "Post",
                    cache: false,
                    url: urlPath,
                    data: {
                        UserAlias: UserAlias
                    },
                    complete: function () {
                        $('#ddlGroup').removeAttr('disabled');
                    },
                    success: function (result) {

                        $("#ddlGroup").empty();

                        var listItems = "<option value='-1'>Select Group</option>";

                        for (i = 0; i < result.length; i++) {
                            listItems += "<option value='" + result[i].Group_Id + "'>" +
                                result[i].Group_name + "</option>";
                        }
                        $("#ddlGroup").html(listItems);
                    },
                    error: function () {
                        // alert("An error has occured!!!" + ex.responseText);
                    }
                });


            }
        },
       
    //Fills Request History Grid based on  budget request ID
        GetRequestHistory: function () {
            var BudgetRequest_Id,urlPath;
            BudgetRequest_Id = $('#hdnbudgetrequest').val();
            if (BudgetRequest_Id > 0) {
            urlPath = "/BudgetRequest/GetBudgetHistory";
             $.ajax({
                type: "Post",
                cache: false,
                url: urlPath,
                data: {
                    BudgetRequest_Id: BudgetRequest_Id
                },
                beforeSend: function () {
                    //Common.showDialog.show('Please wait....', {
                    //    dialogSize: 'sm',
                    //    progressType: 'warning'
                    //});
                },
                complete: function () {
                    budgetrequestjs.ReinitiateDataTable('tblRequestHistory');
                    budgetrequestjs.ReinitiateDataTable('tblApprovalHistory');
                    Common.showDialog.hide();
                },
                success: function (result) {
                    $("#gridviewhistory").html('');
                    $("#gridviewhistory").html(result);
                },
                error: function (ex) {
                    //   Common.showDialog.hide();
                    alert("An error has occured!!!" + ex.responseText);
                }
            });

            }
            

        },   

    //Re-initiates the datatable
        ReinitiateDataTable: function (tableId) {
            $("#" + tableId).DataTable(
              {
                  bFilter: false, bInfo: false, bLengthChange: false, "order": [0, 'desc'],
                  "aoColumnDefs": [
          {
              'bSortable': false,
              'aTargets': ['action-col', 'text-holder']
          }]
    
              }
                );
        },

    //Handles Binding Labels in Approval Workflow
        GetApprovalLabels: function () {
            var ajaxRequest, BudgetRequest_Id,urlPath;
            BudgetRequest_Id = $('#hdnbudgetrequest').val();        
            if (BudgetRequest_Id > 0) {
                urlPath = "/BudgetRequest/GetBudgetRequestLabels";
               $.ajax({
                    type: "Post",
                    cache: false,
                    url: urlPath,
                    data: {
                        BudgetRequest_Id: BudgetRequest_Id
                    },
                    beforeSend: function () {
                        //Common.showDialog.show('Please wait....', {
                        //    dialogSize: 'sm',
                        //    progressType: 'warning'
                        //});
                    },
                    complete: function () {
                       // Common.showDialog.hide();
                    },
                    success: function (result) {
                        $("#ApprovalLabel").html('');
                        $("#ApprovalLabel").html(result);
                    },
                    error: function (ex) {
                        //   Common.showDialog.hide();
                        alert("An error has occured!!!" + ex.responseText);
                    }
                });
            }
        },

    //Hides Past Fiscal Months
        Fn_HidingPastFiscalMonths: function () { 
            BudgetRequest_Id = $('#hdnbudgetrequest').val();
            if (BudgetRequest_Id == 0) {
                var urlPath = "/Common/GetFiscalMonths";
                 $.ajax({
                    type: "Post",
                    cache: false,
                    url: urlPath,

                    beforeSend: function () {
                    },
                    complete: function () {
                    },
                    success: function (result) {
                        $('.clsPurchaseMonth').empty();
                        $('.clsStartMonth').empty();
                        listItems = "<option value='0'>--Select Fiscal Month--</option>";
                        currentDate = new Date();
                        day = currentDate.getDate();
                        month = currentDate.getMonth() + 1;
                        year = currentDate.getFullYear();
                        year = year.toString().substr(2, 2);
                        if (month <= 6) {
                            CurrentFY = parseInt(year);
                        }
                        else {
                            CurrentFY = parseInt(year) + 1;
                        }
                        SelectedFY = $('#CurrentFiscalYear').val().trim();
                        SelectedFY = SelectedFY.substr(2, 2);
                        if (SelectedFY > CurrentFY) {
                            FY = 0;
                        }
                        else if (SelectedFY < CurrentFY) {
                            FY = 12;
                        }
                        else {
                            if (month > 7) {
                                FY = result[month - 8].FiscalOrder;
                            }
                            else if (month <= 6) {
                                FY = result[month + 4].FiscalOrder;
                            }
                            else if (month == 7) {
                                FY = 0;
                            }
                        }
                        if (result.length > 0) {
                            for (i = FY; i < result.length; i++) {
                                listItems += "<option value='" +
                                    result[i].Month_Id + "'>" +
                                    result[i].Month_Fiscal_Year + "</option>";

                            }
                        }
                        $('.clsPurchaseMonth').html(listItems);
                        $('.clsStartMonth').html(listItems);
                    },
                    error: function () {
                        //alert("An error has occured!!!" + ex.responseText);
                    }
                });
            }

          
        },

    //Handles calculation part for Approval Amount
        Fn_ApprovalAmountCalculation: function()
        {          
          var Approver_Reduction_Percentage, Ask_Amount, SubmittedApprovedAmount;
          Approver_Reduction_Percentage = $("#ReductionRequest").val();
            Ask_Amount = $("#GlobalAskAmount").val();
            if (Approver_Reduction_Percentage >= 0 && Approver_Reduction_Percentage <= 100)
            {               
                SubmittedApprovedAmount = Ask_Amount - (Ask_Amount * ((Approver_Reduction_Percentage) / 100));
                $("#ApprovedRequest").val('');
                strApprovedAmount = fn_KeepingCommas((SubmittedApprovedAmount.toFixed(0)));
                $("#ApprovedRequest").val(strApprovedAmount);
            }
            else
            {
                $("#ApprovedRequest").val('');
                $("#ReductionRequest").val('');
             }

        },

    //Handles calulation of Reduction Percentage
        Fn_ReductionPercentageCalculation: function () {           
            var Approved_Amount, Ask_Amount, SubmittedApprovedPercentage;      
            Approved_Amount = $("#ApprovedRequest").val();
            Approved_Amount = fn_RemovingCommas(Approved_Amount);
            Ask_Amount = $("#GlobalAskAmount").val();
            Ask_Amount = Number(Ask_Amount);
            if (Approved_Amount >= 0 && Approved_Amount <= Ask_Amount) {
                SubmittedApprovedPercentage = 100 - (Approved_Amount / Ask_Amount * 100).toFixed(0);
                $("#ReductionRequest").val('');
                $("#ReductionRequest").val((SubmittedApprovedPercentage));
            }
            else
            {
                $("#ReductionRequest").val('');
                $("#ApprovedRequest").val('');         
             }

        },



        //Handles cascading operation for team,project and subproject dropdown
        TeambeforeSend: function () {
            var procemessage = "<option value='-1'> Please wait...</option>";
            $("#ddlTeam").html(procemessage).show();
            $('#ddlProject').empty();
        },
        TeamSuccess: function (result,Team_Id) {
            $("#ddlTeam").empty();
          var listItems = "<option value='0'>--Select Team--</option>";
            if (result.length > 0) {
                for (i = 0; i < result.length; i++) {
                    listItems += "<option value='" +
                        result[i].Team_Id + "'>" +
                        result[i].Team_Name + "</option>";
                }
            }
            $("#ddlTeam").html(listItems);
            $('#ProjectDescription').empty();
            $('#BusinessWin').empty();
            $('#ddlTeam').removeAttr('disabled');
            if (Team_Id != undefined)
            {
                $("#ddlTeam").val(Team_Id);
            }

        },
        TeamComplete:function(TeamId)
        {
            $('.clsTeam').val(TeamId);
        },
        ProjectbeforeSend: function () {
            var procemessage = "<option value='-1'> Please wait...</option>";
            $("#ddlProject").html(procemessage).show();
        },
        ProjectSuccess: function (result,Project_Id) {
            $("#ddlProject").empty();
           var listItems = "<option value='0'>--Select Project--</option>";
            if (result.length > 0) {
                for (i = 0; i < result.length; i++) {
                    listItems += "<option value='" +
                        result[i].Project_Id + "'>" +
                        result[i].Project_Name + "</option>";
                }
            }
            $("#ddlProject").html(listItems);
            $('#ddlProject').removeAttr('disabled');
            if (Project_Id != undefined) {
                $("#ddlProject").val(Project_Id);
            }

        },
        ProjectComplete: function (Project_Id) {
            $('.clsProject').val(Project_Id);
        },
        SubProjectbeforeSend: function () {
        var procemessage = "<option value='-1'> Please wait...</option>";
        $("#ddlSubProject").html(procemessage).show();
},
        SubProjectSuccess: function (result, Sub_Project_Id) {
     $("#ddlSubProject").empty();
     var listItems = "<option value='0'>--Select Sub Project--</option>";
     if (result.length > 0) {
         for (i = 0; i < result.length; i++) {
             listItems += "<option value='" +
                 result[i].Sub_Project_Id + "'>" +
                 result[i].Sub_Project_Name + "</option>";
         }
     }
     $("#ddlSubProject").html(listItems);
     $('#ddlSubProject').removeAttr('disabled');
     if (Sub_Project_Id != undefined) {
         $("#ddlSubProject").val(Sub_Project_Id);
     }
},
        SubProjectComplete: function (SubProject_Id) {
     $('.clsSubProject').val(SubProject_Id);
        }

   

}
