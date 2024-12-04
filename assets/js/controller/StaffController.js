$(document).ready(function () {

    getAllStaff();

    // Save staff member
    $("#saveStaffMember").on("click", function () {
        const firstName = $("#firstNameField").val();
        const lastName = $("#lastNameField").val();
        const role = $("#roleSelect").val();
        const designation = $("#designationField").val();
        const gender = $("#genderSelect").val();
        const joinedDate = $("#joinedDateField").val();
        const dob = $("#dobField").val();
        const addressLine1 = $("#addressField1").val();
        const addressLine2 = $("#addressField2").val();
        const addressLine3 = $("#addressField3").val();
        const addressLine4 = $("#addressField4").val();
        const addressLine5 = $("#addressField5").val();
        const contactNumber = $("#contactNumberField").val();
        const email = $("#EmailField").val();

        if (!firstName || !lastName || !role || !designation || !gender || !joinedDate || !dob || !contactNumber || !email) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill out all fields correctly.',
            });
            return;
        }

        const formattedJoinedDate = convertDateFormat(joinedDate); // Convert the format
        const formattedDob = convertDateFormat(dob);

        const staffData = {
            firstName: firstName,
            lastName: lastName,
            role: role,
            designation: designation,
            gender: gender,
            joinedDate: formattedJoinedDate,
            dob: formattedDob,
            address: {
                line1: addressLine1,
                line2: addressLine2,
                line3: addressLine3,
                line4: addressLine4,
                line5: addressLine5,
            },
            contactNumber: contactNumber,
            email: email,
        };

        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/staff",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(staffData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Staff Member Saved',
                    text: 'The staff member was successfully saved.',
                });
                getAllStaff(); // Refresh the staff list
            },
            error: function (xhr, status, error) {
                console.error("Error saving staff member:", error);
                console.log(staffData)
                Swal.fire({
                    icon: 'error',
                    title: 'Save Failed',
                    text: 'Failed to save staff member. Please try again.',
                });
            },
        });
    });

    // Update staff member
    $("#updateStaffMember").on("click", function () {
        const staffId = $("#StaffIdField").val();
        const firstName = $("#firstNameField").val();
        const lastName = $("#lastNameField").val();
        const role = $("#roleSelect").val();
        const designation = $("#designationField").val();
        const gender = $("#genderSelect").val();
        const joinedDate = $("#joinedDateField").val();
        const dob = $("#dobField").val();
        const addressLine1 = $("#addressField1").val();
        const addressLine2 = $("#addressField2").val();
        const addressLine3 = $("#addressField3").val();
        const addressLine4 = $("#addressField4").val();
        const addressLine5 = $("#addressField5").val();
        const contactNumber = $("#contactNumberField").val();
        const email = $("#EmailField").val();
        const vehicle = $("#vehicleField").val();

        if (!staffId || !firstName || !lastName || !role || !designation || !gender || !joinedDate || !dob || !contactNumber || !email) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill out all fields correctly.',
            });
            return;
        }

        const formattedJoinedDate = convertDateFormat(joinedDate); // Convert the format
        const formattedDob = convertDateFormat(dob);

        const staffData = {
            firstName: firstName,
            lastName: lastName,
            role: role,
            designation: designation,
            gender: gender,
            joinedDate: formattedJoinedDate,
            dob: formattedDob,
            address: {
                line1: addressLine1,
                line2: addressLine2,
                line3: addressLine3,
                line4: addressLine4,
                line5: addressLine5,
            },
            contactNumber: contactNumber,
            email: email,
            vehicle: vehicle,
        };

        $.ajax({
            url: `http://localhost:5050/greenShadow/api/v1/staff/${staffId}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(staffData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Staff Member Updated',
                    text: 'The staff member was successfully updated.',
                });
                getAllStaff(); // Refresh the staff list
            },
            error: function (xhr, status, error) {
                console.error("Error updating staff member:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'Failed to update staff member. Please try again.',
                });
            },
        });
    });

    // Delete staff member
    $("#deleteStaffMember").on("click", function () {
        const staffId = $("#StaffIdField").val();

        if (!staffId) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please provide a staff ID for deletion.',
            });
            return;
        }

        $.ajax({
            url: `http://localhost:5050/greenShadow/api/v1/staff/${staffId}`,
            type: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Staff Member Deleted',
                    text: 'The staff member was successfully deleted.',
                });
                getAllStaff(); // Refresh the staff list
            },
            error: function (xhr, status, error) {
                console.error("Error deleting staff member:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Delete Failed',
                    text: 'Failed to delete staff member. Please try again.',
                });
            },
        });
    });

    // Fetch all staff members
    function getAllStaff() {
        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/staff",
            type: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            success: function (data) {
                const tableBody = $("#staffTable tbody");
                tableBody.empty();
                data.forEach(function (staff) {
                    tableBody.append(`
                        <tr>
                            <td>${staff.staffId}</td>
                            <td>${staff.firstName} ${staff.lastName}</td>
                            <td>${staff.gender}</td>
                            <td>${staff.designation}</td>
                            <td>${staff.role}</td>
                            <td>${staff.joinedDate}</td>
                            <td>${staff.vehicle || "N/A"}</td>
                        </tr>
                    `);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching staff members:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Fetch Failed',
                    text: 'Failed to fetch staff members. Please try again.',
                });
            },
        });
    }

    // Select staff member from the table
    $('#staffTable tbody').on('click', 'tr', function() {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            clearFields();
        } else {
            $('#staffTable tbody tr').removeClass('selected');
            $(this).addClass('selected');

            const data = $(this).children("td").map(function() {
                return $(this).text();
            }).get();

            $("#StaffIdField").val(data[0]);
            $("#firstNameField").val(data[1].split(' ')[0]);
            $("#lastNameField").val(data[1].split(' ')[1]);
            $("#genderSelect").val(data[2]);
            $("#designationField").val(data[3]);
            $("#roleSelect").val(data[4]);
            $("#joinedDateField").val(data[5]);
            $("#vehicleField").val(data[6]);
        }
    });

    function convertDateFormat(date) {
        if (!date) return ''; // Handle empty or invalid date
        const [year, month, day] = date.split('-'); // Split the yyyy-MM-dd format
        return `${day}-${month}-${year}`; // Return the formatted date
    }

    $("#clearStaffMember").on("click", function () {
        clearFields();
    });

    function clearFields() {
        $("#firstNameField").val("");
        $("#lastNameField").val("");
        $("#roleSelect").val("Choose Role");
        $("#designationField").val("");
        $("#genderSelect").val("Choose Gender");
        $("#joinedDateField").val("");
        $("#dobField").val("");
        $("#addressField1").val("");
        $("#addressField2").val("");
        $("#addressField3").val("");
        $("#addressField4").val("");
        $("#addressField5").val("");
        $("#contactNumberField").val("");
        $("#EmailField").val("");
        $("#vehicleField").val("");
        $("#StaffIdField").val("");
    }
});
