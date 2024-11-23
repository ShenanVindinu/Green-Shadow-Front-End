$("#dashboardSection").css({display: 'block'});
$("#staffSection").css({display: 'none'});
$("#vehicleSection").css({display: 'none'});
$("#equipmentSection").css({display: 'none'});
$("#FieldSection").css({display: 'none'});
$("#cropSectionS").css({display: 'none'});

$("#staffBtn").eq(0).on('click', () => {
    $("#dashboardSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSectionS").css({display: 'none'});
    $("#staffSection").css({display: 'block'});
});

$("#dashboardBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSectionS").css({display: 'none'});
    $("#dashboardSection").css({display: 'block'});
});

$("#vehicleBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSectionS").css({display: 'none'});
    $("#vehicleSection").css({display: 'block'});
})

$("#equipmentBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSectionS").css({display: 'none'});
    $("#equipmentSection").css({display: 'block'});
})

$("#fieldBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#cropSectionS").css({display: 'none'});
    $("#FieldSection").css({display: 'block'});
})

$("#cropBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSectionS").css({display: 'block'});
})





