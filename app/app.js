console.log("app");
// =============================

var navbar_toggler = document.querySelector(".navbar_toggler")
var navbar_collapse = document.querySelector(".navbar_collapse")
var cart_btn = document.querySelector(".cart_btn")

const cart_container = document.querySelector(".cart_container")
const product_list = document.querySelector(".product_list")

const cart_list = document.querySelector(".cart_list")
const cart_total_value = document.querySelector(".cart_total_value")
const cart_count_info = document.querySelector(".cart_count_info")

event_Listeners()
function event_Listeners() {

    window.addEventListener("DOMContentLoaded", function () {
        load_json()
    })

    navbar_toggler.addEventListener("click", function () {
        navbar_collapse.classList.toggle("show_navbar")
    })

    cart_btn.addEventListener("click", function () {
        cart_container.classList.toggle("show_cart_container")
    })

}

function load_json() {
    fetch("furniture.json")
        .then(response => response.json())
        .then(data => {
            let html = ""
            data.forEach(product => {
                html +=
                    `
                <div class="product_item">
                    <div class="product_img">
                        <img src="${product.imgSrc}" alt="product image">
                        <button type="button" class="add_to_cart_btn">
                            <i class="fas fa-shopping-cart"></i>
                            Add To Cart
                        </button>
                    </div>

                    <div class="product_content">
                        <h3 class="product_name">${product.name}</h3>
                        <span class="product_category">${product.category}</span>
                        <p class="product_price">$${product.price}</p>
                    </div>
                </div>
                    `

            });
            product_list.innerHTML = html
        })
        .catch(error => {
            alert(`User live server or local server`);
        })
}

