$(document).ready(function () {
    const apiUrl = 'http://localhost:5050/greenShadow/api/v1/field';
    const token = localStorage.getItem("jwtToken");


    $("#saveFieldBtn").click(function () {
        const fieldName = $("#FieldNameField").val();
        const fieldLocation = $("#FieldLocationField").val();
        const extentSize = $("#extentSizeField").val();
        const fieldImage1 = $("#fieldImage1")[0].files[0];
        const fieldImage2 = $("#fieldImage2")[0].files[0];


        let formData = new FormData();
        formData.append("fieldName", fieldName);
        formData.append("fieldLocation", fieldLocation);
        formData.append("extentSizeOfTheField", extentSize);
        formData.append("fieldImage1", fieldImage1);
        formData.append("fieldImage2", fieldImage2);

        $.ajax({
            url: apiUrl,
            type: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Field Saved',
                    text: 'The field has been saved successfully.',
                });
                loadFields();
            },
            error: function (xhr) {
                if (xhr.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Unauthorized',
                        text: 'You do not have permission to save this field.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to save the field. Please try again.',
                    });
                }
            }
        });
    });

    $("#updateFieldBtn").click(function () {
        const fieldName = $("#FieldNameField").val();
        const fieldLocation = $("#FieldLocationField").val();
        const extentSize = $("#extentSizeField").val();
        const fieldImage1 = $("#fieldImage1")[0].files[0];
        const fieldImage2 = $("#fieldImage2")[0].files[0];
        const fieldId = $("#FieldIdField").val();


        let formData = new FormData();
        formData.append("fieldId", fieldId);
        formData.append("fieldName", fieldName);
        formData.append("fieldLocation", fieldLocation);
        formData.append("extentSizeOfTheField", extentSize);
        formData.append("fieldImage1", fieldImage1);
        formData.append("fieldImage2", fieldImage2);

        $.ajax({
            url: `${apiUrl}/${fieldId}`,
            type: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Field Updated',
                    text: 'The field has been updated successfully.',
                });
                loadFields();
            },
            error: function (xhr) {
                if (xhr.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Unauthorized',
                        text: 'You do not have permission to update this field.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to update the field. Please try again.',
                    });
                }
            }
        });
    });

    $("#deleteFieldBtn").click(function () {
        const fieldId = $("#FieldIdField").val();

        $.ajax({
            url: `${apiUrl}/${fieldId}`,
            type: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Field Deleted',
                    text: 'The field has been deleted successfully.',
                });
                loadFields();
            },
            error: function (xhr) {
                if (xhr.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Unauthorized',
                        text: 'You do not have permission to delete this field.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to delete the field. Please try again.',
                    });
                }
            }
        });
    });

    $("#clearFieldBtn").click(function () {
        clearFields();
    });

    function loadFields() {
        $.ajax({
            url: apiUrl,
            type: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function (fields) {
                const table = $('#FieldTable').DataTable();
                table.clear();

                const fieldTableRows = fields.map(field => [
                    field.fieldId,
                    field.fieldName,
                    field.fieldLocation,
                    field.extentSizeOfTheField,
                    `<img src="data:image/jpeg;base64,${field.fieldImage1}" alt="${field.fieldName}" width="50" height="50">`,
                    `<img src="data:image/jpeg;base64,${field.fieldImage2}" alt="${field.fieldName}" width="50" height="50">`
                ]);

                table.rows.add(fieldTableRows).draw();
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load fields data. Please try again.',
                });
            }
        });
    }



    // Load fields on page load
    loadFields();


    $('#FieldTable tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            clearFields();
        } else {
            $('#FieldTable tbody tr').removeClass('selected');
            $(this).addClass('selected');

            var data = $(this).children("td").map(function () {
                return $(this).text();
            }).get();


            $("#FieldIdField").val(data[0]);
            $("#FieldNameField").val(data[1]);
            $("#FieldLocationField").val(data[2]);
            $("#extentSizeField").val(data[3]);


            const imageSrc1 = $(this).find("td:eq(4) img").attr("src");
            const imageSrc2 = $(this).find("td:eq(5) img").attr("src");

            $("#fieldImage1Preview").attr("src", imageSrc1);
            $("#fieldImage2Preview").attr("src", imageSrc2);
        }
    });


    function clearFields() {
        $("#FieldIdField").val('');
        $("#FieldNameField").val('');
        $("#FieldLocationField").val('');
        $("#extentSizeField").val('');
        $("#fieldImage1Preview").attr("src", "");
        $("#fieldImage2Preview").attr("src", "");
    }
});
