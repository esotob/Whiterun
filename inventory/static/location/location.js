$( document ).ready(function() {
    $("#search").click();
});

$("#search").click(function(){
    var locationHTML = "";

    $.ajax({
        url: "/apis/location/?search=" + $("#input_search").val(),
        success: function(res){
            res.forEach(function(r){
                //location table
                locationHTML += "<tr>"; 
                locationHTML += "<th scope='row'>" + r.coordinate + "</th>"; 
                locationHTML += "<td>" + r.available + "</td>"; 
                if (r.hasOwnProperty("product_sku")){
                    locationHTML += "<td>" + r.product_sku + "</td>";
                } else {
                    locationHTML += "<td> Unassigned </td>";
                }
                locationHTML += "<td>" + r.type + "</td>";
                locationHTML += "<td>" + r.location_qty + "</td>";
                locationHTML += "</tr>";
                
            });

            $("#location-table").html(locationHTML);
            
        },
        error: function(res) {
            alert("queee");
            alert(res);
        }
    })  
});

$(".close").click(function(){
    $("#location_modal").modal("hide");
});

$(".add").click(function(){
    $("#location_modal").modal("show");
    $("#coordinate").val("");
    $("#barcode").val("");
    $("#type").val("");
    $("#quantity").val("");
})

$("#create_location").click(function(){
    $("#coordinate").removeClass("is-invalid");
    $("#invalid-text1").addClass("d-none");
    $("#barcode").removeClass("is-invalid");
    $("#invalid-text2").addClass("d-none");
    $("#type").removeClass("is-invalid");
    $("#invalid-text3").addClass("d-none");
    $("#quantity").removeClass("is-invalid");
    $("#invalid-text4").addClass("d-none");

    //Validations for location
    coordinate = $("#coordinate").val();
    if (coordinate == undefined || coordinate == ""){
        $("#coordinate").addClass("is-invalid");
        $("#invalid-text1").html("This field may not be blank.");
        $("#invalid-text1").removeClass("d-none");
        return false;
    } else if ($("#coordinate").val().length > 5){
        $("#coordinate").addClass("is-invalid");
        $("#invalid-text1").html("Ensure this field has no more than 5 characters.");
        $("#invalid-text1").removeClass("d-none");
        return false;
    }

    barcode = $("#barcode").val();
    if (barcode == undefined){
        $("#barcode").addClass("is-invalid");
        $("#invalid-text2").html("This field must be valid.");
        $("#invalid-text2").removeClass("d-none");
        return false;
    } else if (!$.isNumeric(barcode)){
        $("#barcode").addClass("is-invalid");
        $("#invalid-text2").html("A valid number is required.");
        $("#invalid-text2").removeClass("d-none");
        return false;
    } else if ($("#barcode").val().length > 10){
        $("#barcode").addClass("is-invalid");
        $("#invalid-text2").html("Ensure this field has no more than 10 characters.");
        $("#invalid-text2").removeClass("d-none");
        return false;
    }

    type = $("#type").val();
    if (type == undefined || type == ""){
        $("#type").addClass("is-invalid");
        $("#invalid-text3").html("This field may not be blank.");
        $("#invalid-text3").removeClass("d-none");
        return false;
    } else if ($("#type").val().length > 10){
        $("#type").addClass("is-invalid");
        $("#invalid-text3").html("Ensure this field has no more than 10 characters.");
        $("#invalid-text3").removeClass("d-none");
        return false;
    }

    quantity = $("#quantity").val();
    if (quantity == undefined || quantity == ""){
        $("#quantity").addClass("is-invalid");
        $("#invalid-text4").html("This field may not be blank.");
        $("#invalid-text4").removeClass("d-none");
        return false;
    } else if (!$.isNumeric(quantity)){
        $("#quantity").addClass("is-invalid");
        $("#invalid-text4").html("A valid number is required.");
        $("#invalid-text4").removeClass("d-none");
        return false;
    }

    available = $("#available").prop("checked");

    //JSON
    location_params = {
        "coordinate": coordinate,
        "product_sku": barcode,
        "type": type,
        "location_qty": quantity,
        "available": available
        }

    //Ajax call
    $.ajax({
        type: "POST",
        url: "/apis/location/",
        data: location_params,
        dataType: "json",
        success: function(res) {
            var new_location = "";
            new_location += "<tr>"; 
            new_location += "<th scope='row'>" + res.coordinate + "</th>"; 
            new_location += "<td>" + res.available + "</td>";
            new_location += "<td>" + res.product_sku + "</td>"; 
            new_location += "<td>" + res.type + "</td>";
            new_location += "<td>" + res.location_qty + "</td>";
            
            new_location += "</tr>";
            $("#location-table").append(new_location);
            
            //Show toaster 
            $(".toast-body").html("Location" + res.coordinate + "succesfully created.");
            $("#toast-icon").removeClass("fa-times");
            $("#toast-icon").addClass("fa-check");
            $("#toast-icon").removeClass("toaster-red");
            $("#toast-icon").addClass("toaster-green");
            $(".toast").addClass("toast-ok");
            $(".toast").removeClass("toast-nok");
            $(".toast").toast("show");
            
        },
        error: function(res) {
            $(".toast-body").html(res.responseText);
            $("#toast-icon").removeClass("fa-check");
            $("#toast-icon").addClass("fa-times");
            $("#toast-icon").removeClass("toaster-green");
            $("#toast-icon").addClass("toaster-red");
            $("#toast-location").addClass("toast-nok");
            $("#toast-location").removeClass("toast-ok");
            $(".toast").toast("show");
            
        }
    })
})
