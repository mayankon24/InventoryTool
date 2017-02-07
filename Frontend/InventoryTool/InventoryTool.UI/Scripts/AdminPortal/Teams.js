/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, Common*/
var teamsjs = {
    init: function () {
        var obj = teamsjs;
        obj.LoadTeams();
        Common.setAttributeList(obj);
    },
    getAttributeList: function () {
        return [
            ['', 'string', '']

        ];
    },

    LoadTeams: function () {
        //initial load the Datatable setting.
        teamsjs.ReinitiateDataTable('tblTeamList');

        $("#teams").find("#dvTeamList").on("click", ".clsDeleteTeam", function () {
            var data, Team_Id,urlPath;
            var promptdelete = confirm('Are you sure you want to delete this record? There could be dependent budget requests which may get impacted based on this action.');
            if (promptdelete) {
                data = $(this).parents('tr');
                Team_Id = $(data).attr('data-team_id');
                urlPath = "/AdminPortal/DeleteTeam";
                if (Team_Id != '') {
                    $.ajax({
                        type: "Get",
                        cache: false,
                        url: urlPath,
                        data: {
                            Team_Id: Team_Id
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
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayTeamMessages', result.messagedata, true, 'alert alert-success');
                                teamsjs.fn_ReloadTeamGrid();
                            }
                            else {
                                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayTeamMessages', result.messagedata, true, 'alert alert-danger');
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
        $("#teams").find("#dvTeamList").on("click", ".clsEditTeam", function () {
            var  Team_Id, data,urlPath;
            data = $(this).parents('tr');
            Team_Id = $(data).attr('data-Team_Id');
            urlPath = "/AdminPortal/GetTeamByTeamId";
            if (Team_Id != '') {
                $('.clsEditTeam ,.clsDeleteTeam').css('display', 'none');
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Team_Id: Team_Id
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
                        var row = $("#MasterRowEdit_Team").clone();
                        $(row).find('.clsGroup').val(result.Group_Id);
                        $(row).find('.clsTeam').val(result.Team_Name);
                        $(row).removeAttr("style");
                        $(row).attr("data-Team_Id", Team_Id);
                        $(data).after(row);
                    },
                    error: function (ex) {
                        alert(ex.responseText);
                    }
                });
            }

        });
        $("#lnkAddNewTeam").on('click', function () {
            var oTable = $('#tblTeamList').dataTable();
            oTable.fnPageChange('first');
            //get the clone row.
            var row = $("#MasterRow_Team").clone();
            $(row).removeAttr("style");
            $(row).find('.clsTeam').val('');
            $("#tblTeamList >tbody").prepend(row);// now will append the clone row to table.
        });
        ///Handle the Cancel update functionality
        $("#teams").find("#dvTeamList").on("click", ".clsCancelTeamUpdate", function () {
            var data;
            data = $(this).parents('tr');
            $(data).closest('tr.edit-mode').hide();
            $(data).closest('tr').prev('tr.display-mode').show();
            $('.clsEditTeam,.clsDeleteTeam').removeAttr('style');
        });
        ///Handle the Add/update functionality
        $("#teams").find("#dvTeamList").on("click", ".clsAddUpdateTeam", function () {
            var Team_Id, Group_Id, Team_Name, data,urlPath;
            var strValidationMsglists = "";
            data = $(this).parents('tr');
            Team_Id = $(data).attr('data-Team_Id');
            Group_Id = $(data).find(".clsGroup :selected").val();
            Team_Name = $(data).find(".clsTeam").val();
            //put validation here
            if (Group_Id < 1) {
                strValidationMsglists = strValidationMsglists + "<li>Select a valid group before saving Team.</li>";
            }
            if ((Team_Name == "") || (fn_namevalidation(Team_Name))) {
                strValidationMsglists = strValidationMsglists + "<li>Team Name is required and it shouldn’t be numeric.</li>";
            }
            if (strValidationMsglists != "") {
                strValidationMsglists = "<ol>" + strValidationMsglists + "</ol>"
                fn_ShowHideUserMessageDivWithCssClass_common('divDisplayTeamMessages', strValidationMsglists, true, 'alert alert-danger'); //common function to display error message.
                return false;
            }
            urlPath = "/AdminPortal/AddUpdateTeam";
            if (true) {
                 $.ajax({
                    type: "Get",
                    cache: false,
                    url: urlPath,
                    data: {
                        Team_Id: Team_Id,
                        Group_Id: Group_Id,
                        Team_Name: Team_Name
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
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayTeamMessages', result.messagedata, true, 'alert alert-success');
                            teamsjs.fn_ReloadTeamGrid();
                        }
                        else {
                            fn_ShowHideUserMessageDivWithCssClass_common('divDisplayTeamMessages', result.messagedata, true, 'alert alert-danger');
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
    fn_ReloadTeamGrid: function () {
        
        var urlPath = "/AdminPortal/GetTeamPartial";
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
                    teamsjs.ReinitiateDataTable('tblTeamList');
                    Common.showDialog.hide();

                },
                success: function (result) {
                    $("#dvTeamList").html(result);
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
              bFilter: false, bInfo: false, bLengthChange: false, "order": [1, 'asc'],
              "aoColumnDefs": [
      {
          'bSortable': false,
          'aTargets': ['action-col', 'text-holder']
      }]
          }
            );
    }


};
