$(document).ready(function () {
    $("#updateUserBtn").on("click", function () {
        // Collect input data
        const email = $("#UserEmailField2").val();
        const password = $("#UserPasswordField2").val();
        const role = $("#UserRoleSelect").val();

        // Validate input fields
        if (!email || !password || role === "Choose Role") {
            alert("Please fill out all fields correctly.");
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
                alert("User updated successfully!");
                // Fetch updated users and populate the table
                getAllUsers();
            },
            error: function (xhr, status, error) {
                console.error("Error updating user:", error);
                alert("Failed to update user. Please try again.");
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
                alert("Failed to fetch users. Please try again.");
            },
        });
    }

    // Initial load of users into the table
    getAllUsers();
});