$(document).ready(function () {

    $("#loginBtn").on("click", function () {

        const email = $("#InputEmail").val();
        const password = $("#InputPassword").val();


        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }


        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/auth/signing",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email: email, password: password }),
            success: function (response) {

                const token = response.token;

                if (token) {

                    localStorage.setItem("jwtToken", token);


                    window.location.href = "pages/dashboard.html";
                } else {
                    alert("Login failed. No token received.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error during login:", error);
                alert("Login failed. Please check your credentials and try again.");
            },
        });
    });

    $("#submitSignupBtn").on("click", function (e) {
        e.preventDefault();

        const email = $("#InputSignupEmail").val();
        const password = $("#InputSignupPassword").val();

        console.log(email)
        console.log(password)

        // Create a FormData object to handle multipart/form-data
        const formData = new FormData();

        // Append email and password to the FormData object
        formData.append("email", email);
        formData.append("password", password);


        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }


        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/auth/signup",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {

                const token = response.token;

                if (token) {

                    localStorage.setItem("jwtToken", token);


                    window.location.href = "pages/dashboard.html";
                } else {
                    alert("Signup successful, but no token received.");
                }
            },
            error: function (xhr, status, error) {

                alert("Signup failed. Please check your input and try again.");
            },
        });
    });

});