/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
var projectsjs = {
    init: function () {

        var obj = projectsjs;
        obj.LoadProjects();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadProjects: function () {
        //initial load the Datatable setting.
        projectsjs.ReinitiateDataTable('tblProjectList');
        $("#projects").find("#dvProjectList").on("click", ".clsDeleteProject", function () {
            var data, Project_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action.');
            if (promptdelete) {
                data = $(this).parents('tr');
                Project_Id = $(data).attr('data-Project_id');
                urlPath = "/AdminPortal/DeleteProject";
                if (Project_Id != '') {
                    $.ajax({
                        type: "Get",
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
                            if (result.operationstatuscode == 3) {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayProjectMessages', result.messagedata, true, 'alert alert-success');
                                projectsjs.fn_ReloadProjectGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayProjectMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#projects").find("#dvProjectList").on("click", ".clsEditProject", function () {

            var  Project_Id, data,urlPath;
            data = $(this).parents('tr');
            Project_Id = $(data).attr('data-Project_id');
            
            urlPath = "/AdminPortal/GetProjectByProjectId";
            if (Project_Id != '') {
                $('.clsEditProject ,.clsDeleteProject').css('display', 'none');
                 $.ajax({
                    type: "Get",
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
                        $(data).hide();
                        var row = $("#MasterRowEdit_Project").clone();
                        $(row).find('.clsGroup').val(result.Group_Id);
                        $(row).find('.clsTeam').val(result.Team_Id);
                        $(row).find('.clsProject').val(result.Project_Name);
                        $(row).find('.clsProjectDescription').val(result.Project_description);
                        $(row).find('.clsBusinessWin').val(result.Business_win);
                        $(row).removeAttr("style");
                        $(row).attr("data-Project_Id", Project_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewProject").on('click', function () {

            var oTable = $('#tblProjectList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_Project").clone();
            $(row).removeAttr("style");
            $(row).find('.clsTeam').empty();
            $(row).find('.clsTeam').attr('disabled', 'disabled');
            $(row).find('.clsProject').val('');
            $("#tblProjectList >tbody").prepend(row);// now will append the clone row to table.

        });
        ///Handle the Cancel update functionality
        $("#projects").find("#dvProjectList").on("click", ".clsCancelProjectUpdate", function () {
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditProject,.clsDeleteProject').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#projects").find("#dvProjectList").on("click", ".clsAddUpdateProject", function () {
            var Project_Id, Group_Id, Project_Name, Team_Id, Project_Description, Business_Win, data,urlPath;
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            Project_Id = $(data).attr('data-Project_Id');
            Group_Id = $(data).find(".clsGroup :selected").val();
            Team_Id = $(data).find(".clsTeam :selected").val();
            Project_Name = $(data).find(".clsProject").val();
            Project_Description = $(data).find(".clsProjectDescription").val();
            Business_Win = $(data).find(".clsBusinessWin").val();

            //put validation here
            if (Group_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid group before saving Project.</li>";
            }
            if (Team_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid team before saving Project.</li>";
            }
            if ((Project_Name == "") || (fn_namevalidation(Project_Name))) {

                strValidationMsglists = strValidationMsglists + "<li>Project Name is required and it shouldn’t be numeric.</li>";
            }
            if ((Project_Description == "") || (fn_namevalidation(Project_Description))) {

                strValidationMsglists = strValidationMsglists + "<li>Project Description is required and it shouldn’t be numeric.</li>";
            }
            if ((Business_Win == "") || (fn_namevalidation(Business_Win))) {

                strValidationMsglists = strValidationMsglists + "<li>Business win is required and it shouldn’t be numeric.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayProjectMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }

            urlPath = "/AdminPortal/AddUpdateProject";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Project_Id: Project_Id,
                        Group_Id: Group_Id,
                        Team_Id: Team_Id,
                        Project_Name: Project_Name,
                        Project_Description: Project_Description,
                        Business_Win: Business_Win
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayProjectMessages', result.messagedata, true, 'alert alert-success');
                            projectsjs.fn_ReloadProjectGrid();
                            //projectsjs.fn_ReloadTeam();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayProjectMessages', result.messagedata, true, 'alert alert-danger');
                        }
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }
        });

        //Handle Group Dropdown
        $("#projects").find("#dvProjectList").on("change", ".clsGroup", function () {
            var selected, params = [];
            selected = $(this).find("option:selected").val();
            params.Group_Id = selected;
            params.beforeSend = projectsjs.TeambeforeSend;
            params.success = projectsjs.TeamSuccess
            commonjs.fn_GetTeam(params);

        });
    },

    ///This function refresh the grid data.
    fn_ReloadProjectGrid: function () {

        var urlPath = "/AdminPortal/GetProjectPartial";
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
                    projectsjs.ReinitiateDataTable('tblProjectList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvProjectList").html(result);
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
            bFilter: false, bInfo: false, bLengthChange: false, "order": [2, 'asc'],
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

    }
   
};
