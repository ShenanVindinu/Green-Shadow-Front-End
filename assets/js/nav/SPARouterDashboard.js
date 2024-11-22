$("#staff-section").css({display: 'none'});

$("#staffBtn").eq(0).on('click', () => {
    $("#dashboard-section").css({display: 'none'});
    $("#staff-section").css({display: 'block'});
});

$("#dashboardBtn").eq(0).on('click', () => {
    $("#dashboard-section").css({display: 'block'});
    $("#staff-section").css({display: 'none'});
});



