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

var product_img_img = document.querySelector(".product_img img")

let cart_item_ID = 1;

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

    product_list.addEventListener("click", purchase_Product)
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

function purchase_Product(e) {

    if (e.target.classList.contains("add_to_cart_btn")) {
        let product = e.target.parentElement.parentElement;
        get_Product_Info(product)
    }
}

function get_Product_Info(product) {
    let product_info = {
        id: cart_item_ID,
        imgSrc: product.querySelector(".product_img img").src,
        name: product.querySelector(".product_name").textContent,
        category: product.querySelector(".product_category").textContent,
        price: product.querySelector(".product_price").textContent,
    }
    console.log(product_info)
    cart_item_ID++;
    add_To_Cart_List(product_info)
}

function add_To_Cart_List() { }

