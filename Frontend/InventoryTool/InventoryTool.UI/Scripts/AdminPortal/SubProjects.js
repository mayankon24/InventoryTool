/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
var subprojectsjs = {
    init: function () {

        var obj = subprojectsjs;
        obj.LoadSubProjects();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadSubProjects: function () {
        //initial load the Datatable setting.
        subprojectsjs.ReinitiateDataTable('tblSubProjectList');

        $("#SubProjects").find("#dvSubProjectList").on("click", ".clsDeleteSubProject", function () {
            var data, Sub_project_Id;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action.');
            if (promptdelete) {
                data = $(this).parents('tr');
                Sub_project_Id = $(data).attr('data-Sub_project_Id');
                urlPath = "/AdminPortal/DeleteSubProject";
                if (Sub_project_Id != '') {
                     $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Sub_project_Id: Sub_project_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySubProjectMessages', result.messagedata, true, 'alert alert-success');
                                subprojectsjs.fn_ReloadSubProjectGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySubProjectMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#SubProjects").find("#dvSubProjectList").on("click", ".clsEditSubProject", function () {
            var  Sub_project_Id,  data,urlPath;
            data = $(this).parents('tr');
            Sub_project_Id = $(data).attr('data-Sub_project_Id');
            urlPath = "/AdminPortal/GetSubProjectBySubProjectId";
            if (Sub_project_Id != '') {
                $('.clsEditSubProject ,.clsDeleteSubProject').css('display', 'none');
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Sub_project_Id: Sub_project_Id
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
                        var row = $("#MasterRowEdit_SubProject").clone();
                        $(row).find('.clsGroup ').val(result.Group_Id);
                        $(row).find('.clsTeam ').val(result.Team_Id);
                        $(row).find('.clsProject ').val(result.Project_Id);
                        $(row).find('.clsSubProject').val(result.Sub_Project_Name);
                        $(row).find('.clsDelay').val(result.Delay_Factor);
                        $(row).removeAttr("style");
                        $(row).attr("data-Sub_project_Id", Sub_project_Id);

                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewSubProject").on('click', function () {

            var oTable = $('#tblSubProjectList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_SubProject").clone();
            $(row).removeAttr("style");
            $(row).find('.clsSubProject').val('');
            $(row).find('.clsDelay').val('');
            $("#tblSubProjectList >tbody").prepend(row);// now will append the clone row to table.
            $('.clsTeam').prop("disabled", true);
            $('.clsProject').prop("disabled", true)
        });
        ///Handle the Cancel update functionality
        $("#SubProjects").find("#dvSubProjectList").on("click", ".clsCancelSubProjectUpdate", function () {
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditSubProject,.clsDeleteSubProject').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#SubProjects").find("#dvSubProjectList").on("click", ".clsAddUpdateSubProject", function () {

            var  Project_Id, Sub_Project_Name, Sub_project_Id,Delay_Factor, data,urlPath;
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            Sub_project_Id = $(data).attr('data-Sub_project_Id');
            Project_Id = $(data).find(".clsProject :selected").val();
            Sub_Project_Name = $(data).find(".clsSubProject").val();
            Delay_Factor = $(data).find(".clsDelay").val();

            //put validation here
            //if (Group_Id < 1) {
            //    strValidationMsglists = strValidationMsglists + "<li>Select a valid Group before saving SubProject.</li>";
            //}
            //if (Team_Id < 1) {
            //    strValidationMsglists = strValidationMsglists + "<li>Select a valid Team before saving SubProject.</li>";
            //}

            if (Project_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid Project before saving SubProject.</li>";
            }
            if ((Sub_Project_Name == "") || (fn_namevalidation(Sub_Project_Name))) {
                strValidationMsglists = strValidationMsglists + "<li>SubProject Name is required and it shouldn’t be numeric.</li>";
            }
            if ((Delay_Factor == "") || (fn_numbervalidation(Delay_Factor))) {
                strValidationMsglists = strValidationMsglists + "<li>Delay Factor is required and it should be numeric.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySubProjectMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }

            urlPath = "/AdminPortal/AddUpdateSubProject";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Sub_project_Id: Sub_project_Id,
                        Project_Id: Project_Id,
                        Sub_Project_Name: Sub_Project_Name,
                        Delay_Factor:Delay_Factor

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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySubProjectMessages', result.messagedata, true, 'alert alert-success');
                            subprojectsjs.fn_ReloadSubProjectGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplaySubProjectMessages', result.messagedata, true, 'alert alert-danger');
                        }
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }
        });
        //Handle Group Dropdown
        $("#SubProjects").find("#dvSubProjectList").on("change", ".clsGroup", function () {
            var selected, params = [];
            selected = $(this).find("option:selected").val();
            if ((selected == "") || (selected == "0")) {
                selected = -1;
            }
            params.Group_Id = selected;
            params.beforeSend = subprojectsjs.TeambeforeSend;
            params.success = subprojectsjs.TeamSuccess
            commonjs.fn_GetTeam(params);
           
        });
        // handle team dropdown
        $("#SubProjects").find("#dvSubProjectList").on("change", ".clsTeam", function () {
            var selected, params = [];
            selected = $(this).find("option:selected").val();
            if ((selected == "") || (selected == "0")) {
                selected = -1;
            }
            params.Team_Id = selected;
            params.beforeSend = subprojectsjs.ProjectbeforeSend;
            params.success = subprojectsjs.ProjectSuccess
            commonjs.fn_GetProject(params);

        });
    },

    ///This function refresh the grid data.
    fn_ReloadSubProjectGrid: function () {

        var urlPath = "/AdminPortal/GetSubProjectPartial";
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
                    subprojectsjs.ReinitiateDataTable('tblSubProjectList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvSubProjectList").html(result);
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
            bFilter: false, bInfo: false, bLengthChange: false, "order": [3, 'asc'],
            "aoColumnDefs": [
             {
                 'bSortable': false,
                 'aTargets': ['action-col', 'text-holder']
             }]
        }
          );
     },

    TeambeforeSend: function () {
        var procemessage = "<option value='-1'> Please wait...</option>";
        $('.clsTeam').html(procemessage).show();
        $('.clsProject').empty();
    },
    TeamSuccess: function (result) {
        var listItems;
        $('.clsTeam').empty();
        listItems = "<option value='0'>--Select Team--</option>";
        if (result.length > 0) {
            for (var i = 0; i < result.length; i++) {
                listItems += "<option value='" +
                    result[i].Team_Id + "'>" +
                    result[i].Team_Name + "</option>";
            }
        }
        $('.clsTeam').html(listItems);
        $('.clsTeam').removeAttr('disabled');

    },

      ProjectbeforeSend: function ()
    {
          var procemessage = "<option value='-1'> Please wait...</option>";
          $('.clsProject').html(procemessage).show();
    },
    ProjectSuccess: function (result)
    {
        var listItems;
        $('.clsProject').empty();
        listItems = "<option value='0'>--Select Project--</option>";
        if (result.length > 0) {
            for (i = 0; i < result.length; i++) {
                listItems += "<option value='" +
                    result[i].Project_Id + "'>" +
                    result[i].Project_Name + "</option>";
            }
        }
        $('.clsProject').html(listItems);
        $('.clsProject').removeAttr('disabled');

    }
 

};
