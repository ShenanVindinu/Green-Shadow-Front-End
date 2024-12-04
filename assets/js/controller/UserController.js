$(document).ready(function () {
    $("#updateUserBtn").on("click", function () {
        // Collect input data
        const email = $("#UserEmailField2").val();
        const password = $("#UserPasswordField2").val();
        const role = $("#UserRoleSelect").val();

        // Validate input fields
        if (!email || !password || role === "Choose Role") {
            Swal.fire({
                icon: "warning",
                title: "Incomplete Form",
                text: "Please fill out all fields correctly.",
            });
            return;
        }

        // Create FormData object for multipart/form-data
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);

        // Send update request to the server
        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/user/userUpdate",
            type: "PUT",
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: "success",
                    title: "User Updated",
                    text: "User updated successfully!",
                });
                // Fetch updated users and populate the table
                getAllUsers();
            },
            error: function (xhr, status, error) {
                console.error("Error updating user:", error);

                if (xhr.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: "Access Denied",
                        text: "You don't have access to update this user.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Update Failed",
                        text: "Failed to update user. Please try again.",
                    });
                }
            },
        });
    });


    function getAllUsers() {
        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/user/getAllUsers",
            type: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function (response) {
                const table = $('#UserTable').DataTable(); // Get DataTable instance
                table.clear();


                response.forEach((user) => {
                    table.row.add([
                        user.email,
                        user.role,
                    ]);
                });


                table.draw();
            },
            error: function (xhr, status, error) {
                console.error("Error fetching users:", error);
                Swal.fire({
                    icon: "error",
                    title: "Fetch Failed",
                    text: "Failed to fetch users. Please try again.",
                });
            },
        });
    }

    $('#UserTable tbody').on('click', 'tr', function() {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            clearFields();
        } else {
            $('#UserTable tbody tr').removeClass('selected');
            $(this).addClass('selected');

            var data = $(this).children("td").map(function() {
                return $(this).text();
            }).get();

            $("#UserEmailField2").val(data[0]);
            $("#UserRoleSelect").val(data[1]);
        }
    });

    // Initial load of users into the table
    getAllUsers();
});