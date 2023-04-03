console.log("app");
// =============================

var navbar_toggler = document.querySelector(".navbar_toggler")
var navbar_collapse = document.querySelector(".navbar_collapse")
var cart_btn = document.querySelector(".cart_btn")
const cart_container = document.querySelector(".cart_container")

event_Listeners()
function event_Listeners() {

    navbar_toggler.addEventListener("click", function () {
        navbar_collapse.classList.toggle("show_navbar")
    })

    cart_btn.addEventListener("click", function () {
        cart_container.classList.toggle("show_cart_container")
    })

}

