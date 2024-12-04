$(document).ready(function () {
    const apiUrl = "http://localhost:5050/greenShadow/api/v1/crop";

    // Save Crop
    $("#saveCropBtn").on("click", function () {
        const cropCommonName = $("#CropCommonNameField").val();
        const cropScientificName = $("#CropCommonScientificNameField").val();
        const cropCategory = $("#CropCategoryField").val();
        const cropSeason = $("#CropSeasonField").val();
        const cropImage = $("#CropImage")[0].files[0];


        if (!cropCommonName || !cropScientificName || !cropCategory || !cropSeason || !cropImage) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill out all required fields correctly.',
            });
            return;
        }

        const formData = new FormData();
        formData.append("cropCommonName", cropCommonName);
        formData.append("cropScientificName", cropScientificName);
        formData.append("category", cropCategory);
        formData.append("cropSeason", cropSeason);
        formData.append("cropImage", cropImage);

        $.ajax({
            url: apiUrl,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Crop Saved',
                    text: 'The crop was successfully saved.',
                });
                loadCrops(); // Refresh the crops table
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
                        text: 'Failed to save the crop. Please try again.',
                    });
                }
            }
        });
    });

    // Update Crop
    $("#updateCropBtn").on("click", function () {
        const cropId = $("#cropIdField").val();
        const cropCommonName = $("#CropCommonNameField").val();
        const cropScientificName = $("#CropCommonScientificNameField").val();
        const cropCategory = $("#CropCategoryField").val();
        const cropSeason = $("#CropSeasonField").val();
        const cropFieldId = $("#CropFieldIdField").val() || '';
        const cropImage = $("#CropImage")[0].files[0];

        // Check if required fields are filled
        if (!cropId || !cropCommonName || !cropScientificName || !cropCategory || !cropSeason) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill out all required fields correctly.',
            });
            return;
        }

        const formData = new FormData();
        formData.append("cropCommonName", cropCommonName);
        formData.append("cropScientificName", cropScientificName);
        formData.append("category", cropCategory);
        formData.append("cropSeason", cropSeason);
        formData.append("fieldId", cropFieldId);
        if (cropImage) {
            formData.append("cropImage", cropImage);
        }

        $.ajax({
            url: `${apiUrl}/${cropId}`,
            type: "PUT",
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Crop Updated',
                    text: 'The crop was successfully updated.',
                });
                loadCrops(); // Refresh the crops table
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
                        text: 'Failed to update the crop. Please try again.',
                    });
                }
            }
        });
    });

    // Delete Crop
    $("#deleteCropBtn").on("click", function () {
        const cropId = $("#cropIdField").val();

        if (!cropId) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please provide a valid Crop ID to delete.',
            });
            return;
        }

        $.ajax({
            url: `${apiUrl}/${cropId}`,
            type: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Crop Deleted',
                    text: 'The crop was successfully deleted.',
                });
                loadCrops(); // Refresh the crops table
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
                        text: 'Failed to delete the crop. Please try again.',
                    });
                }
            }
        });
    });


    $("#clearCropBtn").on("click", function () {
        $("#CropCommonNameField").val('');
        $("#CropCommonScientificNameField").val('');
        $("#CropCategoryField").val('');
        $("#CropImage").val('');
        $("#CropSeasonField").val('');
        $("#CropFieldIdField").val('');
        $("#cropIdField").val('');
    });


    function loadCrops() {
        $.ajax({
            url: apiUrl,
            type: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function (crops) {
                let cropTableRows = '';
                crops.forEach(crop => {
                    cropTableRows += `
                    <tr>
                        <td>${crop.cropId}</td>
                        <td>${crop.cropCommonName}</td>
                        <td>${crop.cropScientificName}</td>
                        <td>${crop.category}</td>
                        <td><img src="data:image/jpeg;base64,${crop.cropImage}" alt="${crop.cropCommonName}" width="50" height="50"></td>
                        <td>${crop.cropSeason}</td>
                        <td>${crop.fieldId}</td>
                    </tr>`;
                });

                $("#CropTable tbody").html(cropTableRows);
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load crops data. Please try again.',
                });
            }
        });
    }

    $('#CropTable tbody').on('click', 'tr', function () {
        // Toggle selected class
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            clearFields();
        } else {
            $('#CropTable tbody tr').removeClass('selected');
            $(this).addClass('selected');


            var data = $(this).children("td").map(function () {
                return $(this).text();
            }).get();


            $("#cropIdField").val(data[0]);
            $("#CropCommonNameField").val(data[1]);
            $("#CropCommonScientificNameField").val(data[2]);
            $("#CropCategoryField").val(data[3]);
            $("#CropSeasonField").val(data[5]);
            $("#CropFieldIdField").val(data[6]);
        }
    });

    // Initial load of crops when the page is ready
    loadCrops();
});
