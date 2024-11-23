$("#dashboardSection").css({display: 'block'});
$("#staffSection").css({display: 'none'});
$("#vehicleSection").css({display: 'none'});

$("#staffBtn").eq(0).on('click', () => {
    $("#dashboardSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#staffSection").css({display: 'block'});
});

$("#dashboardBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'block'});
});

$("#vehicleBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'block'});
})



