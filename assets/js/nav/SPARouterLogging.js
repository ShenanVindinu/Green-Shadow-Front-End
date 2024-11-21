$("#loginPage").css({display: 'block'});
$("#signupPage").css({display: 'none'});



$("#signupBtn").eq(0).on('click', () => {
    $("#loginPage").css({display: 'none'});
    $("#signupPage").css({display: 'block'});
});

$("#SignupBack").eq(0).on('click', () => {
    $("#loginPage").css({display: 'block'});
    $("#signupPage").css({display: 'none'});
});



