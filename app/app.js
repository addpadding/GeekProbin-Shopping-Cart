console.log("app");
// =============================

var navbar_toggler = document.querySelector(".navbar_toggler");
var navbar_collapse = document.querySelector(".navbar_collapse");
var cart_btn = document.querySelector(".cart_btn");

const cart_container = document.querySelector(".cart_container");
const product_list = document.querySelector(".product_list");

const cart_list = document.querySelector(".cart_list");
const cart_total_value = document.querySelector(".cart_total_value");
const cart_count_info = document.querySelector(".cart_count_info");

var product_img_img = document.querySelector(".product_img img");

let cart_item_ID = 1;

// =============================
event_Listeners();
function event_Listeners() {
    window.addEventListener("DOMContentLoaded", function () {
        load_json();
        load_Cart();
    });

    navbar_toggler.addEventListener("click", function () {
        navbar_collapse.classList.toggle("show_navbar");
    });

    cart_btn.addEventListener("click", function () {
        cart_container.classList.toggle("show_cart_container");
    });

    product_list.addEventListener("click", purchase_Product);
    cart_list.addEventListener("click", delete_Product);
}

function update_Cart_Info() {
    let car_info = find_Cart_Info();

    cart_count_info.textContent = car_info.productCount;
    cart_total_value.textContent = car_info.total;
}

function load_json() {
    fetch("furniture.json")
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            data.forEach((product) => {
                html += `
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
                    `;
            });
            product_list.innerHTML = html;
        })
        .catch((error) => {
            alert(`User live server or local server`);
        });
}

function purchase_Product(e) {
    if (e.target.classList.contains("add_to_cart_btn")) {
        let product = e.target.parentElement.parentElement;
        get_Product_Info(product);
    }
}

function get_Product_Info(product) {
    let product_info = {
        id: cart_item_ID,
        imgSrc: product.querySelector(".product_img img").src,
        name: product.querySelector(".product_name").textContent,
        category: product.querySelector(".product_category").textContent,
        price: product.querySelector(".product_price").textContent,
    };
    cart_item_ID++;
    add_To_Cart_List(product_info);
    save_Product_In_Storage(product_info);
}

function add_To_Cart_List(product) {
    const cart_item = document.createElement("div");
    cart_item.classList.add("cart_item");
    cart_item.setAttribute("data-id", `${product.id}`);
    cart_item.innerHTML = `

        <img src="${product.imgSrc}" alt="">

        <div class="cart_item_info">
            <h3 class="cart_item_name">${product.name}</h3>
            <span class="cart_item_category">${product.category}</span>
            <span class="cart_item_price">${product.price}</span>
        </div>

        <button class="cart_item_del_btn">
            <i class="fas fa-times"></i>
        </button>

    `;
    cart_list.appendChild(cart_item);
}

function save_Product_In_Storage(item) {
    let product_s = get_Product_From_Storage();
    product_s.push(item);
    localStorage.setItem("products_set", JSON.stringify(product_s));

    update_Cart_Info();
}

function get_Product_From_Storage() {
    return localStorage.getItem("products_set")
        ? JSON.parse(localStorage.getItem("products_set"))
        : [];
}

function load_Cart() {
    let product_s = get_Product_From_Storage();

    if (product_s.length < 1) {
        cart_item_ID = 1;
    } else {
        cart_item_ID = product_s[product_s.length - 1].id;
        cart_item_ID++;
    }
    product_s.forEach((product) => add_To_Cart_List(product));

    update_Cart_Info();
}

function find_Cart_Info() {
    let product_s = get_Product_From_Storage();

    let total = product_s.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1));
        return (acc += price);
    }, 0);

    return {
        total: total.toFixed(2),
        productCount: product_s.length,
    };
}

function delete_Product(e) {
    let cart__item;

    if (e.target.tagName === "BUTTON") {
        cart__item = e.target.parentElement;
        cart__item.remove();
    } else if (e.target.tagName === "I") {
        cart__item = e.target.parentElement.parentElement;
        cart__item.remove();
    }

    let product_s = get_Product_From_Storage();

    let updated_Products = product_s.filter((product) => {
        return product.id !== parseInt(cart__item.dataset.id);
    });
    localStorage.setItem("products_set", JSON.stringify(updated_Products));

    update_Cart_Info();
}
