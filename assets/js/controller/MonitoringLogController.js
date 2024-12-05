$(document).ready(function () {


    function convertDateFormat(dateString) {
        var date = new Date(dateString);
        var day = String(date.getDate()).padStart(2, '0');
        var month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        var year = date.getFullYear();
        return day + '-' + month + '-' + year;
    }


    $("#saveMonitoringLogBtn").on("click", function () {
        const logDate = convertDateFormat($("#MonitoringLogDateField").val());
        const logDetails = $("#MonitoringLogDetailsField").val();

        if (!logDate || !logDetails) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill out all required fields correctly.',
            });
            return;
        }

        const formData = new FormData();
        formData.append("logDate", logDate);
        formData.append("logDetails", logDetails);

        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/Mlog",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Log Saved',
                    text: 'The monitoring log was successfully saved.',
                });
                loadLogs();
            },
            error: function (xhr) {
                if (xhr.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Forbidden',
                        text: "You don't have authorization for this action.",
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Save Failed',
                        text: 'Failed to save the log. Please try again.',
                    });
                }
            }
        });
    });


    $("#updateMonitoringLogBtn").on("click", function () {
        const logId = $("#monitoringLogIdField").val();
        const logDate = convertDateFormat($("#MonitoringLogDateField").val());
        const logDetails = $("#MonitoringLogDetailsField").val();
        const fieldId = $("#MonitoringLogFieldIdField").val() || '';
        const staffId = $("#MonitoringLogStaffId").val() || '';

        if (!logId || !logDate || !logDetails) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill out all required fields correctly.',
            });
            return;
        }

        const formData = new FormData();
        formData.append("logDate", logDate);
        formData.append("logDetails", logDetails);
        formData.append("field", fieldId);
        formData.append("staff", staffId);

        $.ajax({
            url: `http://localhost:5050/greenShadow/api/v1/Mlog/${logId}`,
            type: "PUT",
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Log Updated',
                    text: 'The monitoring log was successfully updated.',
                });
                loadLogs();
            },
            error: function (xhr) {
                if (xhr.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Forbidden',
                        text: "You don't have authorization for this action.",
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Update Failed',
                        text: 'Failed to update the log. Please try again.',
                    });
                }
            }
        });
    });


    // Delete Log
    $("#deleteMonitoringLogBtn").on("click", function () {
        const logId = $("#monitoringLogIdField").val();

        // Check if logId is provided
        if (!logId) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please provide a log ID for deletion.',
            });
            return;
        }

        $.ajax({
            url: `http://localhost:5050/greenShadow/api/v1/Mlog/${logId}`, // Direct API URL with logId
            type: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Log Deleted',
                    text: 'The monitoring log was successfully deleted.',
                });
                loadLogs(); // Refresh the logs
            },
            error: function (xhr) {
                if (xhr.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Forbidden',
                        text: "You don't have authorization for this action.",
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Delete Failed',
                        text: 'Failed to delete the log. Please try again.',
                    });
                }
            }
        });
    });


    function loadLogs() {
        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/Mlog",
            type: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function (logs) {
                const table = $('#MonitoringLogTable').DataTable(); // Get DataTable instance
                table.clear(); // Clear existing rows

                // Map logs data to an array format
                const logRows = logs.map(log => [
                    log.logId,
                    log.logDate,
                    log.logDetails,
                    log.field || 'N/A',
                    log.staff || 'N/A'
                ]);

                // Add rows and redraw the table
                table.rows.add(logRows).draw();
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Fetch Failed',
                    text: 'Failed to fetch monitoring logs. Please try again.',
                });
            }
        });
    }


    // Select log from the table
    $('#MonitoringLogTable tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            clearFields();
        } else {
            $('#MonitoringLogTable tbody tr').removeClass('selected');
            $(this).addClass('selected');

            const data = $(this).children("td").map(function () {
                return $(this).text();
            }).get();

            $("#monitoringLogIdField").val(data[0]);
            $("#MonitoringLogDateField").val(data[1]);
            $("#MonitoringLogDetailsField").val(data[2]);
            $("#MonitoringLogFieldIdField").val(data[3]);
            $("#MonitoringLogStaffId").val(data[4]);
        }
    });

    // Clear form fields
    $("#clearMonitoringLogBtn").on("click", function () {
        clearFields();
    });

    function clearFields() {
        $("#MonitoringLogDateField").val("");
        $("#MonitoringLogDetailsField").val("");
        $("#MonitoringLogFieldIdField").val("");
        $("#MonitoringLogStaffId").val("");
        $("#monitoringLogIdField").val("");
    }

    // Initial load of logs
    loadLogs();
});
