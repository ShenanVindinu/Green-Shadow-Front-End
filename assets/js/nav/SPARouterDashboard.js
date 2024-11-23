$("#staffSection").css({display: 'none'});

$("#staffBtn").eq(0).on('click', () => {
    $("#dashboardSection").css({display: 'none'});
    $("#staffSection").css({display: 'block'});
});

$("#dashboardBtn").eq(0).on('click', () => {
    $("#dashboardSection").css({display: 'block'});
    $("#staffSection").css({display: 'none'});
});



