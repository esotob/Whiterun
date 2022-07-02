$( document ).ready(function() {

//Buttons actions
    $(".close").click(function(){
        $('#sku_modal').modal('hide');
    });

    $(".add").click(function(){
        $(".add-new").removeClass("d-none");
        $(".product-table").hide(500);
        $(".add").hide(500);
        $(".pagination").hide(500);
        $("#input_search").hide(500);
        $("#search").hide(500);
        $("#product-header").removeClass("col-6")
        $("#product-header").addClass("col-12")
    });

    $(".cancel").click(function(){
        $(".add-new").addClass("d-none");
        $(".product-table").show(500);
        $(".add").show(500);
        $(".pagination").show(500);
        $("#input_search").show(500);
        $("#search").show(500);
        $("#product-header").removeClass("col-12")
        $("#product-header").addClass("col-6")
        

        $("#name").val("");
        $("#desc").val("");
        $("#price").val("");
        $("#cost").val("");
    });

    $(".create").click(function(){
        $("#name").removeClass("is-invalid");
        $("#invalid-text1").addClass("d-none");
        $("#desc").removeClass("is-invalid");
        $("#invalid-text2").addClass("d-none");
        $("#price").removeClass("is-invalid");
        $("#invalid-text3").addClass("d-none");
        $("#cost").removeClass("is-invalid");
        $("#invalid-text4").addClass("d-none");

        //Product validations and assignation
        name = $("#name").val();
        if (name == undefined || name == ""){
            $("#name").addClass("is-invalid");
            $("#invalid-text1").html("This field may not be blank.");
            $("#invalid-text1").removeClass("d-none");
            return false;
        }

        desc = $("#desc").val();
        if (desc == undefined || desc == ""){
            $("#desc").addClass("is-invalid");
            $("#invalid-text2").html("This field may not be blank.");
            $("#invalid-text2").removeClass("d-none");
            return false;
        }

        price = $("#price").val();
        if (price == undefined || price == ""){
            $("#price").addClass("is-invalid");
            $("#invalid-text3").html("This field may not be blank.");
            $("#invalid-text3").removeClass("d-none");
            return false;
        } else if (!$.isNumeric(price)){
            $("#price").addClass("is-invalid");
            $("#invalid-text3").html("A valid number is required.");
            $("#invalid-text3").removeClass("d-none");
            return false;
        }

        cost = $("#cost").val();
        if (cost == undefined || cost == 0){
            $("#cost").addClass("is-invalid");
            $("#invalid-text4").html("This field may not be blank.");
            $("#invalid-text4").removeClass("d-none");
            return false;
        } else if (!$.isNumeric(cost)){
            $("#cost").addClass("is-invalid");
            $("#invalid-text4").html("A valid number is required.");
            $("#invalid-text4").removeClass("d-none");
            return false;
        }

        picture = "...";

        is_virtual = $("#is_virtual").prop("checked");

        //JSON
        product_params = {
            "item_name": name,
            "item_description": desc,
            "item_price": price,
            "item_cost": cost,
            "item_pic": picture,
            "is_virtual": is_virtual
            }

        //Ajax call
        $.ajax({
            type: "POST",
            url: "/api/product/",
            data: product_params,
            dataType: "json",
            success: function(res) {
                $(".toast-body").html("Product " + res.item_name + " succesfully created.");
                $("#toast-icon").removeClass("fa-times");
                $("#toast-icon").addClass("fa-check");
                $("#toast-icon").removeClass("toaster-red");
                $("#toast-icon").addClass("toaster-green");
                $(".toast").addClass("toast-ok");
                $(".toast").removeClass("toast-nok");
                $(".toast").toast("show");
                $("#search").click();
                $(".cancel").click();
            },
            error: function(res) {
                $(".toast-body").html(res.responseText);
                $("#toast-icon").removeClass("fa-check");
                $("#toast-icon").addClass("fa-times");
                $("#toast-icon").removeClass("toaster-green");
                $("#toast-icon").addClass("toaster-red");
                $("#toast-all").addClass("toast-nok");
                $("#toast-all").removeClass("toast-ok");
                $(".toast").toast("show");
            }
        })

    });

    $("#create_sku").click(function(){
        $("#product_name").removeClass("is-invalid");
        $("#invalid-text5").addClass("d-none");
        $("#barcode").removeClass("is-invalid");
        $("#invalid-text6").addClass("d-none");
        $("#sku_code").removeClass("is-invalid");
        $("#invalid-text7").addClass("d-none");
        $("#sku_price").removeClass("is-invalid");
        $("#invalid-text8").addClass("d-none");
        $("#color_code").removeClass("is-invalid");
        $("#invalid-text9").addClass("d-none");
        $("#color_desc").removeClass("is-invalid");
        $("#invalid-text10").addClass("d-none");
        $("#size_code").removeClass("is-invalid");
        $("#invalid-text11").addClass("d-none");

        //Sku validations and assignation
        product_name = $("#product_name").val();
        if (product_name == undefined || product_name == ""){
            $("#product_name").addClass("is-invalid");
            $("#invalid-text5").html("This field may not be blank.");
            $("#invalid-text5").removeClass("d-none");
            return false;
        }

        barcode = $("#barcode").val();
        if (barcode == undefined || barcode == ""){
            $("#barcode").addClass("is-invalid");
            $("#invalid-text6").html("This field may not be blank.");
            $("#invalid-text6").removeClass("d-none");
            return false;
        } else if (!$.isNumeric(barcode)){
            $("#barcode").addClass("is-invalid");
            $("#invalid-text6").html("A valid number is required.");
            $("#invalid-text6").removeClass("d-none");
            return false;
        } else if ($("#barcode").val().length > 10){
            $("#barcode").addClass("is-invalid");
            $("#invalid-text6").html("Ensure this field has no more than 10 characters.");
            $("#invalid-text6").removeClass("d-none");
            return false;
        }

        sku_code = $("#sku_code").val();
        if (sku_code == undefined || sku_code == ""){
            $("#sku_code").addClass("is-invalid");
            $("#invalid-text7").html("This field may not be blank.");
            $("#invalid-text7").removeClass("d-none");
            return false;
        } else if (!$.isNumeric(sku_code)){
            $("#sku_code").addClass("is-invalid");
            $("#invalid-text7").html("A valid number is required.");
            $("#invalid-text7").removeClass("d-none");
            return false;
        } else if ($("#sku_code").val().length > 20){
            $("#sku_code").addClass("is-invalid");
            $("#invalid-text7").html("Ensure this field has no more than 20 characters.");
            $("#invalid-text7").removeClass("d-none");
            return false;
        }

        sku_price = $("#sku_price").val();
        if (sku_price == undefined || sku_price == ""){
            $("#sku_price").addClass("is-invalid");
            $("#invalid-text8").html("This field may not be blank.");
            $("#invalid-text8").removeClass("d-none");
            return false;
        } else if (!$.isNumeric(sku_price)){
            $("#sku_price").addClass("is-invalid");
            $("#invalid-text8").html("A valid number is required.");
            $("#invalid-text8").removeClass("d-none");
            return false;
        }

        color_code = $("#color_code").val();
        if (color_code == undefined || color_code == ""){
            $("#color_code").addClass("is-invalid");
            $("#invalid-text9").html("This field may not be blank.");
            $("#invalid-text9").removeClass("d-none");
            return false;
        } else if ($("#color_code").val().length > 3){
            $("#color_code").addClass("is-invalid");
            $("#invalid-text9").html("Ensure this field has no more than 3 characters.");
            $("#invalid-text9").removeClass("d-none");
            return false;
        }

        color_code_desc = $("#color_desc").val();
        if (color_code_desc == undefined || color_code_desc == ""){
            $("#color_code_desc").addClass("is-invalid");
            $("#invalid-text10").html("This field may not be blank.");
            $("#invalid-text10").removeClass("d-none");
            return false;
        }

        size_code = $("#size_code option:selected").val();
        if (size_code == undefined || size_code == "" || $("#size_code option:selected").val().length > 3){
            $("#size_code").addClass("is-invalid");
            $("#invalid-text11").html("This field may not be blank.");
            $("#invalid-text11").removeClass("d-none");
            return false;
        }

        backordereable = $("#backordereable").prop("checked");

        //JSON
        sku_params = {
            "barcode": barcode,
            "sku_code": sku_code,
            "sku_price": sku_price,
            "size_code": size_code,
            "item_name": product_name,
            "color_code": color_code,
            "color_code_desc": color_code_desc,
            "backordereable": backordereable
            }

        //Ajax call
        $.ajax({
            type: "POST",
            url: "/api/product-sku/",
            data: sku_params,
            dataType: "json",
            success: function(res) {
                alert("Yep");
                var temp_id = $("#product_id").val();
                $("#sku-button" + temp_id).prop( "disabled", false );
                var new_sku = "";
                new_sku += "<tr>"; 
                new_sku += "<th scope='row'>" + res.id + "</th>"; 
                new_sku += "<td>" + res.barcode + "</td>"; 
                new_sku += "<td>" + res.sku_code + "</td>";
                new_sku += "<td>" + res.sku_price + "</td>";
                new_sku += "<td>" + res.color_code + "</td>";
                new_sku += "<td>" + res.color_code_desc + "</td>";
                new_sku += "<td>" + res.size_code + "</td>";
                new_sku += "<td>" + res.backordereable + "</td>";
                new_sku += "</tr>";
                $("#sku_body" + temp_id).append(new_sku);
                $("#sku-table"+ temp_id).show(500);
                $("#sku-button"+ temp_id).html("Hide");

                //Show toaster 
                $(".toast-body").html("Product sku in " + res.item_name + " is succesfully created.");
                $("#toast-icon").removeClass("fa-times");
                $("#toast-icon").addClass("fa-check");
                $("#toast-icon").removeClass("toaster-red");
                $("#toast-icon").addClass("toaster-green");
                $(".toast").addClass("toast-ok");
                $(".toast").removeClass("toast-nok");
                $(".toast").toast("show");
            },
            //TODO toaster de error 
            error: function(res) {
                $(".toast-body").html(res.responseText);
                $("#toast-icon").removeClass("fa-check");
                $("#toast-icon").addClass("fa-times");
                $("#toast-icon").removeClass("toaster-green");
                $("#toast-icon").addClass("toaster-red");
                $("#toast-all").addClass("toast-nok");
                $("#toast-all").removeClass("toast-ok");
                $(".toast").toast("show");
            }
        })
    });

    //Dinamic table
    $( document ).ready(function() {
        $("#search").click();
    });

    $("#search").click(function(){
        var innerHTML = "";
        var cpage = $("#current-page").val();

        $.ajax({
            url: "/api/product?page=" + cpage + "&search=" + $("#input_search").val(),
            success: function(res){
                var paginationHTML = "<nav aria-label='Product paginator'><ul class='pagination justify-content-center'>";

                if (res.current_page == 1){
                    paginationHTML += "<li class='page-item disabled' data-page=" + 1 + "><a class='page-link' href='#'>First</a></li>";
                } else {
                    paginationHTML += "<li class='page-item' data-page=" + 1 + "><a class='page-link' href='#'>First</a></li>";
                    paginationHTML += "<li class='page-item' data-page=" + (res.current_page - 1) + "><a class='page-link' href='#'>"+ (res.current_page - 1) +"</a></li>";
                }

                paginationHTML += "<li class='page-item active' data-page=" + (res.current_page) + "><a class='page-link' href='#'>"+ res.current_page +"</a></li>";
                
                if (res.current_page == res.total_pages){
                    paginationHTML += "<li class='page-item disabled' data-page=" + res.total_pages + "><a class='page-link' href='#'>Last</a></li>";
                } else {
                    paginationHTML += "<li class='page-item' data-page=" + (res.current_page + 1) + "><a class='page-link' href='#'>" + (res.current_page + 1) + "</a></li>";
                    paginationHTML += "<li class='page-item' data-page=" + res.total_pages + "><a class='page-link' href='#'>Last</a></li>";
                }

                paginationHTML += "</ul></nav>";

                $("#paginator").html(paginationHTML);
                
                res.results.forEach(function(r){
                    //item table
                    innerHTML += "<tr>"; 
                    innerHTML += "<th scope='row'>" + r.id + "</th>"; 
                    innerHTML += "<td id='product-name" + r.id + "'>" + r.item_name + "</td>"; 
                    innerHTML += "<td>" + r.item_description + "</td>";
                    innerHTML += "<td>" + r.item_price + "</td>";
                    innerHTML += "<td>" + r.item_cost + "</td>";
                    innerHTML += "<td>" + r.is_virtual + "</td>";
                    innerHTML += "<td>";
                    if (r.skus != ("")){
                        innerHTML += "<button id='sku-button" + r.id + "' class='btn btn-primary btn-sm btn-skus'> Show </button>  ";
                    } else {
                        innerHTML += "<button id='sku-button" + r.id + "' class='btn btn-primary btn-sm btn-skus' disabled> Show </button>  ";
                    }
                    innerHTML += "<button id='add-sku-button" + r.id + "' class='btn btn-info btn-sm btn-add-sku'> <i class='fa fa-plus'></i> </button> </td>";
                    innerHTML += "</tr>";

                    //sku table
                    innerHTML += "<tr><td id='sku-table" + r.id + "' colspan=7 style='display:none'>";
                    innerHTML += "<table id='sku-table' class='table table-striped table-hover'>";
                    innerHTML += "<thead class='thead-dark'>";
                    innerHTML += "<tr>";
                    innerHTML += "<th scope='col'>#</th>";
                    innerHTML += "<th scope='col'>Barcode</th>";
                    innerHTML += "<th scope='col'>Sku code</th>";
                    innerHTML += "<th scope='col'>Sku price</th>";
                    innerHTML += "<th scope='col'>Color code</th>";
                    innerHTML += "<th scope='col'>Color description</th>";
                    innerHTML += "<th scope='col'>Sku size</th>";
                    innerHTML += "<th scope='col'>Backordereable</th>";
                    innerHTML += "</tr>";
                    innerHTML += "</thead>";
                    innerHTML += "<tbody id='sku_body" + r.id + "'>";
                    if (r.skus != ("")){
                        //foreach skus
                        r.skus.forEach(function(s){

                            innerHTML += "<tr>"; 
                            innerHTML += "<th scope='row'>" + s.id + "</th>"; 
                            innerHTML += "<td>" + s.barcode + "</td>"; 
                            innerHTML += "<td>" + s.sku_code + "</td>";
                            innerHTML += "<td>" + s.sku_price + "</td>";
                            innerHTML += "<td>" + s.color_code + "</td>";
                            innerHTML += "<td>" + s.color_code_desc + "</td>";
                            innerHTML += "<td>" + s.size_code + "</td>";
                            innerHTML += "<td>" + s.backordereable + "</td>";
                            innerHTML += "</tr>";
                        });
                    };
                    innerHTML += "</tbody>";
                    innerHTML +=  "</table>";
                    innerHTML += "</td></tr>";
                    
                });
                $("#product-table").html(innerHTML);

                $(".btn-skus").click(function(){
                    var id = this.id.substr(10);
                    if ($("#sku-button"+ id).html() == " Show "){
                        $("#sku-table"+ id).show(500);
                        $("#sku-button"+ id).html("Hide");
                    }else {
                        $("#sku-table"+ id).hide(500);
                        $("#sku-button"+ id).html(" Show ");
                    }
                });

                $(".btn-add-sku").click(function(){
                    var id = this.id.substr(14);
                    $("#product_id").val(id);
                    $("#sku_modal").modal("show");
                    $("#product_name").val($("#product-name"+id).text());
                    $("#barcode").val("");
                    $("#sku_code").val("");
                    $("#sku_price").val("");
                    $("#color_code").val("");
                    $("#color_desc").val("");
                    $("#size_code").val("texto");
                    $("#backordereable").prop('checked', false);

                });

                $(".page-item").click(function(){
                    var page = $(this).data("page");
                    $("#current-page").val(page);
                    $("#search").click();
                });
            },
            error: function(res) {
                alert("nop");
                alert(res);
            }
        })  
    });
});