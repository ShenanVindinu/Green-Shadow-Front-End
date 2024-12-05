$("#staffSection").css({display: 'none'});
$("#vehicleSection").css({display: 'none'});
$("#equipmentSection").css({display: 'none'});
$("#FieldSection").css({display: 'none'});
$("#cropSection").css({display: 'none'});
$("#monitoringLogSection").css({display: 'none'});
$("#userSection").css({display: 'block'});

$("#staffBtn").eq(0).on('click', () => {
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#staffSection").css({display: 'block'});
});

$("#vehicleBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'block'});
})

$("#equipmentBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'block'});
})

$("#fieldBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#FieldSection").css({display: 'block'});
});

$("#cropBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#cropSection").css({display: 'block'});
});

$("#monitoringLogBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'block'});
});

$("#UserBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'block'});
});

$("#signOutBtn").on('click', () => {
    window.location.href = "../index.html";
});





