$("#dashboardSection").css({display: 'block'});
$("#staffSection").css({display: 'none'});
$("#vehicleSection").css({display: 'none'});
$("#equipmentSection").css({display: 'none'});
$("#FieldSection").css({display: 'none'});
$("#cropSection").css({display: 'none'});
$("#monitoringLogSection").css({display: 'none'});
$("#userSection").css({display: 'none'});

$("#staffBtn").eq(0).on('click', () => {
    $("#dashboardSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#staffSection").css({display: 'block'});
});

$("#dashboardBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'block'});
});

$("#vehicleBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'block'});
})

$("#equipmentBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'block'});
})

$("#fieldBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#FieldSection").css({display: 'block'});
});

$("#cropBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#cropSection").css({display: 'block'});
});

$("#monitoringLogBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#userSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'block'});
});

$("#UserBtn").eq(0).on('click', () => {
    $("#staffSection").css({display: 'none'});
    $("#dashboardSection").css({display: 'none'});
    $("#vehicleSection").css({display: 'none'});
    $("#equipmentSection").css({display: 'none'});
    $("#FieldSection").css({display: 'none'});
    $("#cropSection").css({display: 'none'});
    $("#monitoringLogSection").css({display: 'none'});
    $("#userSection").css({display: 'block'});
});





