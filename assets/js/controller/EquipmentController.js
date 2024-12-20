$(document).ready(function () {
    // Fetch all equipment on page load
    getAllEquipment();

    // Save equipment
    $("#saveEquipmentBtn").on("click", function () {
        const equipmentName = $("#equipmentNameField").val();
        const equipmentType = $("#equipmentTypeSelect").val();
        const equipmentStatus = $("#equipmentStatusSelect").val();
        const equipmentStaffId = $("#equipmentStaffIdField").val();

        if (!equipmentName || !equipmentType || !equipmentStatus) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill out all fields correctly.',
            });
            return;
        }

        const equipmentData = {
            equipmentName: equipmentName,
            equipmentType: equipmentType,
            equipmentStatus: equipmentStatus,
            staffId: equipmentStaffId,
        };

        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/equipment",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(equipmentData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Equipment Saved',
                    text: 'The equipment was successfully saved.',
                });
                getAllEquipment(); // Refresh the equipment list
            },
            error: function (xhr, status, error) {
                console.error("Error saving equipment:", error);
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
                        text: 'Failed to save equipment. Please try again.',
                    });
                }
            },
        });
    });

    // Update equipment
    $("#updateEquipmentBtn").on("click", function () {
        const equipmentId = $("#equipmentIdField").val();
        const equipmentName = $("#equipmentNameField").val();
        const equipmentType = $("#equipmentTypeSelect").val();
        const equipmentStatus = $("#equipmentStatusSelect").val();
        const equipmentStaffId = $("#equipmentStaffIdField").val();

        if (!equipmentId || !equipmentName || !equipmentType || !equipmentStatus) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill out all fields correctly.',
            });
            return;
        }

        const equipmentData = {
            equipmentName: equipmentName,
            equipmentType: equipmentType,
            equipmentStatus: equipmentStatus,
            staffId: equipmentStaffId,
        };

        $.ajax({
            url: `http://localhost:5050/greenShadow/api/v1/equipment/${equipmentId}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(equipmentData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Equipment Updated',
                    text: 'The equipment was successfully updated.',
                });
                getAllEquipment(); // Refresh the equipment list
            },
            error: function (xhr, status, error) {
                console.error("Error updating equipment:", error);
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
                        text: 'Failed to update equipment. Please try again.',
                    });
                }
            },
        });
    });

    // Delete equipment
    $("#deleteEquipmentBtn").on("click", function () {
        const equipmentId = $("#equipmentIdField").val();

        if (!equipmentId) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please provide an equipment ID for deletion.',
            });
            return;
        }

        $.ajax({
            url: `http://localhost:5050/greenShadow/api/v1/equipment/${equipmentId}`,
            type: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Equipment Deleted',
                    text: 'The equipment was successfully deleted.',
                });
                getAllEquipment(); // Refresh the equipment list
            },
            error: function (xhr, status, error) {
                console.error("Error deleting equipment:", error);
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
                        text: 'Failed to delete equipment. Please try again.',
                    });
                }
            },
        });
    });


    function getAllEquipment() {
        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/equipment",
            type: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function (data) {
                const table = $('#EquipmentTable').DataTable(); // Initialize or get DataTable instance
                table.clear(); // Clear existing rows

                // Map data to an array format
                const equipmentRows = data.map(equipment => [
                    equipment.equipmentId,
                    equipment.equipmentName,
                    equipment.equipmentType,
                    equipment.equipmentStatus,
                    equipment.staffId,
                ]);

                // Add rows and redraw the table
                table.rows.add(equipmentRows).draw();
            },
            error: function (xhr, status, error) {
                console.error("Error fetching equipment:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Fetch Failed',
                    text: 'Failed to fetch equipment. Please try again.',
                });
            },
        });
    }


    $('#EquipmentTable tbody').on('click', 'tr', function() {
        if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            clearFields();
        } else {
            $('#EquipmentTable tbody tr').removeClass('selected');
            $(this).addClass('selected');

            var data = $(this).children("td").map(function() {
                return $(this).text();
            }).get();

            $("#equipmentIdField").val(data[0]);
            $("#equipmentNameField").val(data[1]);
            $("#equipmentTypeSelect").val(data[2]);
            $("#equipmentStatusSelect").val(data[3]);
            $("#equipmentStaffIdField").val(data[4]);
        }
    });

    // Clear the form fields
    $("#clearEquipmentBtn").on("click", function () {
        $("#equipmentNameField").val("");
        $("#equipmentTypeSelect").val("Select");
        $("#equipmentStatusSelect").val("Select");
        $("#equipmentStaffIdField").val("");
        $("#equipmentIdField").val("");
    });
});
