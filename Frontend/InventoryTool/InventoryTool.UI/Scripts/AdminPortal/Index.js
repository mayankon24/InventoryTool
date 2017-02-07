function fn_TabManage() {

    var urlPath = "/AdminPortal/Manage";
    if (true) {
         $.ajax({
            type: "Get",
            cache: false,
            url: urlPath,
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
                $("#divAdminPortalContent").html('');
                $("#divAdminPortalContent").html(result);
            },
            error: function (ex) {
                alert(ex.responseText);
            }
        });
    }
}

function fn_TabGroup() {
    var urlPath = "/AdminPortal/Group";
    if (true) {
        $.ajax({
            type: "Get",
            cache: false,
            url: urlPath,
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
                $("#divAdminPortalContent").html('');
                $("#divAdminPortalContent").html(result);
            },
            error: function (ex) {
                alert(ex.responseText);
            }
        });
    }
}

function fn_TabTeam() {
    var urlPath = "/AdminPortal/Team";
    if (true) {
        $.ajax({
            type: "Get",
            cache: false,
            url: urlPath,
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
                $("#divAdminPortalContent").html('');
                $("#divAdminPortalContent").html(result);
            },
            error: function (ex) {
                alert(ex.responseText);
            }
        });
    }
}

function fn_TabProject() {
    var urlPath = "/AdminPortal/Project";
    if (true) {
         $.ajax({
            type: "Get",
            cache: false,
            url: urlPath,
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
                $("#divAdminPortalContent").html('');
                $("#divAdminPortalContent").html(result);
            },
            error: function (ex) {
                alert(ex.responseText);
            }
        });
    }
}
function fn_TabSubProject() {
    var urlPath = "/AdminPortal/SubProject";
    if (true) {
         $.ajax({
            type: "Get",
            cache: false,
            url: urlPath,
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
                $("#divAdminPortalContent").html('');
                $("#divAdminPortalContent").html(result);
            },
            error: function (ex) {
                alert(ex.responseText);
            }
        });
    }
}

function fn_TabField1() {
    var urlPath = "/AdminPortal/Field1";
    if (true) {
         $.ajax({
            type: "Get",
            cache: false,
            url: urlPath,
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
                $("#divAdminPortalContent").html('');
                $("#divAdminPortalContent").html(result);
            },
            error: function (ex) {
                alert(ex.responseText);
            }
        });
    }
}

function fn_TabField2() {
    var urlPath = "/AdminPortal/Field2";
    if (true) {
         $.ajax({
            type: "Get",
            cache: false,
            url: urlPath,
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
                $("#divAdminPortalContent").html('');
                $("#divAdminPortalContent").html(result);
            },
            error: function (ex) {
                alert(ex.responseText);
            }
        });
    }
}