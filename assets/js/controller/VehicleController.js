$(document).ready(function () {

    // Save vehicle
    $("#saveVehicleBtn").on("click", function () {
        const licensePlateNumber = $("#licensePlateNumberField").val();
        const vehicleCategory = $("#vehicleCategoryField").val();
        const fuelType = $("#fuelTypeField").val();
        const vehicleStatus = $("#vehicleStatusSelect").val();
        const remarks = $("#remarksField").val();

        // Validate fields
        if (!licensePlateNumber || !vehicleCategory || !fuelType || !vehicleStatus || !remarks) {
            Swal.fire({
                icon: "warning",
                title: "Incomplete Form",
                text: "Please fill out all fields correctly.",
            });
            return;
        }

        const vehicleData = {
            licensePlateNumber: licensePlateNumber,
            vehicleCategory: vehicleCategory,
            fuelType: fuelType,
            status: vehicleStatus,
            remarks: remarks,
        };

        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/vehicle",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(vehicleData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: "success",
                    title: "Vehicle Saved",
                    text: "Vehicle saved successfully!",
                });
                getAllVehicles();  // Refresh the table
            },
            error: function (xhr, status, error) {
                if (xhr.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: "Access Denied",
                        text: "You don't have authorization for this action.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Save Failed",
                        text: "Failed to save vehicle. Please try again.",
                    });
                }
            }
        });
    });

    // Update vehicle
    $("#updateVehicleBtn").on("click", function () {
        const vehicleId = $("#vehicleIdField").val();
        const licensePlateNumber = $("#licensePlateNumberField").val();
        const vehicleCategory = $("#vehicleCategoryField").val();
        const fuelType = $("#fuelTypeField").val();
        const vehicleStatus = $("#vehicleStatusSelect").val();
        const remarks = $("#remarksField").val();

        if (!vehicleId || !licensePlateNumber || !vehicleCategory || !fuelType || !vehicleStatus || !remarks) {
            Swal.fire({
                icon: "warning",
                title: "Incomplete Form",
                text: "Please fill out all fields correctly.",
            });
            return;
        }

        const vehicleData = {
            licensePlateNumber: licensePlateNumber,
            vehicleCategory: vehicleCategory,
            fuelType: fuelType,
            vehicleStatus: vehicleStatus,
            remarks: remarks,
        };

        $.ajax({
            url: `http://localhost:5050/greenShadow/api/v1/vehicle/${vehicleId}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(vehicleData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: "success",
                    title: "Vehicle Updated",
                    text: "Vehicle updated successfully!",
                });
                getAllVehicles();  // Refresh the table
            },
            error: function (xhr, status, error) {
                if (xhr.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: "Access Denied",
                        text: "You don't have authorization for this action.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Update Failed",
                        text: "Failed to update vehicle. Please try again.",
                    });
                }
            }
        });
    });

    // Delete vehicle
    $("#deleteVehicleBtn").on("click", function () {
        const vehicleId = $("#vehicleIdField").val();

        if (!vehicleId) {
            Swal.fire({
                icon: "warning",
                title: "Missing Vehicle ID",
                text: "Please provide a Vehicle ID to delete.",
            });
            return;
        }

        $.ajax({
            url: `http://localhost:5050/greenShadow/api/v1/vehicle/${vehicleId}`,
            type: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: "success",
                    title: "Vehicle Deleted",
                    text: "Vehicle deleted successfully!",
                });
                getAllVehicles();  // Refresh the table
            },
            error: function (xhr, status, error) {
                if (xhr.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: "Access Denied",
                        text: "You don't have authorization for this action.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Delete Failed",
                        text: "Failed to delete vehicle. Please try again.",
                    });
                }
            }
        });
    });

    // Clear fields
    $("#clearVehicleBtn").on("click", function () {
        $("#licensePlateNumberField").val("");
        $("#vehicleCategoryField").val("");
        $("#fuelTypeField").val("");
        $("#vehicleStatusSelect").val("Select");
        $("#remarksField").val("");
        $("#vehicleIdField").val("");
    });

    // Function to get all vehicles and populate the table
    function getAllVehicles() {
        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/vehicle",
            type: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function (response) {
                const table = $('#UserTable').DataTable();
                table.clear();

                const vehicles = response;
                let tableContent = "";
                vehicles.forEach(function (vehicle) {
                    tableContent += `
                        <tr>
                            <td>${vehicle.vehicleId}</td>
                            <td>${vehicle.licensePlateNumber}</td>
                            <td>${vehicle.vehicleCategory}</td>
                            <td>${vehicle.fuelType}</td>
                            <td>${vehicle.vehicleStatus}</td>
                            <td>${vehicle.remarks}</td>
                        </tr>
                    `;
                });
                $("#vehicleTable tbody").html(tableContent);
            },
            error: function (xhr, status, error) {
                if (xhr.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: "Access Denied",
                        text: "You don't have authorization to view vehicles.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Fetch Failed",
                        text: "Failed to fetch vehicles. Please try again.",
                    });
                }
            }
        });
    }

    $('#vehicleTable tbody').on('click', 'tr', function() {
        if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            clearFields();
        } else {
            $('#vehicleTable tbody tr').removeClass('selected');
            $(this).addClass('selected');

            var data = $(this).children("td").map(function() {
                return $(this).text();
            }).get();

            $("#vehicleIdField").val(data[0]);
            $("#licensePlateNumberField").val(data[1]);
            $("#vehicleCategoryField").val(data[2]);
            $("#fuelTypeField").val(data[3]);
            $("#vehicleStatusSelect").val(data[4]);
            $("#remarksField").val(data[5]);
        }
    });

    // Call the function to populate the table on page load
    getAllVehicles();

});
