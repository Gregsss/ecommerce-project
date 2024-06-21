var lengthofmap = 0;
var sum = 0;
var user;

$(document).ready(function () {
    var product_id;
    $(window).ready(function () {
        if(sessionStorage.user === undefined ){
        window.location.replace("login.html");
        }
        loadData();
        manipulate();
    })
    //? GOGO SPINNER!
    const iconRef = document.getElementById("getData");
    iconRef.addEventListener('click', () => {
        iconRef.classList.add('spin');
        setTimeout(() => {
            iconRef.style.fill = '#fc7405';
        }, 1000)
        loadData();
    });
    iconRef.addEventListener('animationend', () => {
        iconRef.classList.remove('spin');
        iconRef.style.fill = '#000';
    })
    $("#logOut").click(function(){
        sessionStorage.clear();
        window.location.replace("login.html");
    })
    //View Cart
    $("#cartButton").click(function () {
        document.getElementById("sideBar").style.width = "500px";
        document.getElementById("main").style.marginRight = "500px";

        if ($("li.cartContainer").length > 0) {
            document.getElementById("cartEmpty").style.display = "none";
            document.getElementById("totalRow").style.display = "block";
        }
    })
    //Close Side Bar Button
    $("#closeSideBtn").click(function () {
        document.getElementById("sideBar").style.width = "0px";
        document.getElementById("main").style.marginRight = "0px";
    })
    //Remove Cart item sidebar
    $(document).on("click", "#removeIcon", function (event) {
        var price = $(this).closest("li.cartContainer").find("#cartProdPrice").text().replace('R', '').trim();
        totalSubt(price);
        $(this).closest("li.cartContainer").remove();
        if ($("li.cartContainer").length < 1) {
            document.getElementById("cartEmpty").style.display = "block";
            document.getElementById("totalRow").style.display = "none";
        }
    })
    //Add to cart Sidebar
    $(document).on("click", "#addCart", function (event) {
        var prodInfo = $(this).closest('.productContainer');
        product_id = prodInfo.find('#prodId').text();
        var product_name = prodInfo.find('#prodName').text();
        var product_image = prodInfo.find('#prodImage').attr('src');
        var product_decription = prodInfo.find('#producDesc').text();
        var product_price = prodInfo.find('#prodPrice').text().replace('R', '').trim();
        $("#cartList").append(
            "<li class='cartContainer'>" +
            "<div class='cartContent'>" +
            "<a id=removeIcon class=material-icons>&#xe872;</a>" +
            "<img id='cartImage' class='product-image' src='" + product_image + "'>" +
            "<div class='product-details'>" +
            // "<p id='prodId'>" + product_id + "</p>"+
            "<div id=cartProdHeader><h2 id='cartProdName'>" + product_name + "</h2></div>" +
            "<p id='cartProducDescHeader'>Description: " + product_decription + "</p>" +
            "<p id='cartProdPrice'>R" + product_price + "</p>" +
            "</div>" +
            "</div>" +
            "</li>"
        );
        document.getElementById("sideBar").style.width = "500px";
        document.getElementById("main").style.marginRight = "500px";
        if ($("li.cartContainer").length > 0) {
            document.getElementById("cartEmpty").style.display = "none";
            document.getElementById("totalRow").style.display = "block";
            total(product_price);
        }
    })
    //Add a product to the json file
    $("#addProduct").click(function (event) {
        event.preventDefault();
        popup.style.display = "block";
    })
    //Close button for popup
    $("#closeButton").click(function () {
        popup.style.display = "none";
        document.getElementById("form").reset();
    })
    //Edit Product close button
    $("#editClose").click(function () {
        editProductContainer.style.display = "none";
        document.getElementById("editForm").reset();
    })
    //Save new product
    $("#saveForm").click(function (event) {
        event.preventDefault()
        var formFile = document.getElementById("image");
        var file = formFile.files[0];
        if (file) {
            var formName = $('#name').val();
            var formImage = file;
            var formDescription = $("#description").val();
            var formPrice = $("#price").val();

            var formData = new FormData();
            formData.append('id', lengthofmap + 1);
            formData.append('name', formName);
            formData.append('image', formImage);
            formData.append('description', formDescription);
            formData.append('price', formPrice);

            $.ajax({
                type: "POST",
                url: "./functions/create.php",
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    alert("Success");
                    document.getElementById("form").reset();
                    popup.style.display = "none";
                    loadData();
                },
                error: function (data) {
                    alert("Error");
                },

            });
        }
    })
    //Edit the product information
    $(document).on("click", "#editListItem", function (event) {
        var prodInfo = $(this).closest('.productContainer');
        product_id = prodInfo.find('#prodId').text();
        var product_name = prodInfo.find('#prodName').text();
        var product_description = prodInfo.find('#producDesc').text();
        var product_price = prodInfo.find('#prodPrice').text().replace('R', '').trim();
        editProductContainer.style.display = "block";
        $('#editName').val(product_name);
        $("#editDescription").val(product_description);
        $("#editPrice").val(parseFloat(product_price));
    })
    //Save the edited product
    $("#saveEdit").click(function (event) {
        event.preventDefault();
        var formFile = document.getElementsByClassName("image");
        if (formFile > 0) {
            var file = formFile.files[0];
        }
        //Get form data
        var formName = $('#editName').val();
        var formDescription = $("#editDescription").val();
        var formPrice = $("#editPrice").val();
        var formData = new FormData();

        //get image if it exists
        var formImage = $(".editImage")[0].files[0];
        formData.append('id', product_id);
        formData.append('name', formName);
        formData.append('image', formImage);
        formData.append('description', formDescription);
        formData.append('price', formPrice);

        $.ajax({
            type: "POST",
            url: "./functions/update.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                alert("Success");
                document.getElementById("editForm").reset();
                editProductContainer.style.display = "none";
                loadData();
            },
            error: function (data) {
                alert("Error");
            },

        });
    })
    //Remove the product
    $(document).on("click", "#removeListItem", function (event) {
        var prodtoremove = $(this).closest('.productContainer').find('#prodId').text();
        // var productId = prodtoremove.find("#prodId");

        $.ajax({
            type: "POST",
            url: "./functions/delete.php",
            data: { 'id': prodtoremove },
            success: function (data) {
                alert("Success");
                loadData();
            },
            error: function (data) {
                alert("Error");
            },
        })
    })
}); // END OF DOCUMENT READY 

//* START OF LOAD FUNCTION
function loadData() {
    $.getJSON("http://localhost/Project/product_page/functions/read.php", function (data) {
        var map = Object.keys(data);
        lengthofmap = map.length;
        //Clear the list before adding new data to stop duplication
        $("#productList").empty();
        //Loop through the list to add each item
        $.each(data, function (index, product) {
            //Append can be used to add data to a class or id
            $("#productList").append(
                "<li class = productContainer>" +
                "<p id=prodId>" + product.id + "</p>" +
                "<h2 id=prodName>" + product.name + "</h2>" +
                "<img id=prodImage src= ./" + product.image + " >" +
                "<p id=producDescHeader>Description:</p>" +
                "<p id=producDesc>" + product.description + "</p>" +
                "<p id=prodPrice>R" + product.price + "</p>" +
                "<div id=buttonBar>" +
                "<button id=removeListItem class=cardBtn >Remove </button>" +
                "<svg xmlns='http://www.w3.org/2000/svg' id='addCart' viewBox='0 -960 960 960'><path d='M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z'/></svg>" +
                "<button id=editListItem class=cardBtn >Edit </button>" +
                "</div>" +
                "</li>"
            )
        });
        manipulate();
    });
}
//* END OF LOAD FUNCTION
//* START OF MATH + FUNCTION
function total(price) {
    sum = sum + parseFloat(price)
    document.getElementById("cartTotalVal").textContent = "R" + sum.toFixed(2);
}
//* END OF MATH + FUNCTION
//* START OF MATH - FUNCTION
function totalSubt(price) {
    sum = sum - parseFloat(price)
    document.getElementById("cartTotalVal").textContent = "R" + sum.toFixed(2);
}
//* END OF MATH - FUNCTION
//* START OF GET USER
function manipulate(){
    user = sessionStorage.getItem("user");
    document.getElementById("user").textContent = user;
    if (user == "Guest") {
        // setTimeout(() => {
            document.getElementById("addProduct").style.display = "none";
            document.getElementById("buttonBar").style.justifyContent = "end";
            var cardButtons = document.getElementsByClassName("cardBtn");
            for (var i = 0; i < cardButtons.length; i++) {
                cardButtons[i].style.display = "none";
            }
        // }, 100)
    }
}
//* END OF GET USER