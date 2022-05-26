let vKosiku = document.querySelectorAll(".do-kosiku");
let kosikBox = document.querySelectorAll(".kosik-box");
let cartNum = document.querySelectorAll(".cart-num");
let numberItems = document.querySelectorAll(".number-items");
let numberItemsCart = document.querySelector(".number-items-cart");
let pocetObjednavek = 0;
let maxWidth = window.matchMedia("(max-width: 990px)");
let mobilWidth = window.matchMedia("(max-width: 48em)");
let shoppingCart = document.querySelector('.shopping-cart');

maxWidth.addListener(myFunction);
mobilWidth.addListener(myFunction);
function myFunction() {
    if (mobilWidth.matches) { // If media query matches
        if (pocetObjednavek) {
            kosikBox[0].style.display = 'none';
            kosikBox[1].style.display = 'none';
            shoppingCart.style.display = 'inline-block';

        }
    } else if (maxWidth.matches) {
        if (pocetObjednavek) {
            kosikBox[0].style.display = 'block';
            kosikBox[1].style.display = 'none';
            shoppingCart.style.display = 'none';

        }
    } else {
        if (pocetObjednavek) {
            kosikBox[1].style.display = 'block';
            kosikBox[0].style.display = 'none';
            shoppingCart.style.display = 'none';
        }
    }
}

vKosiku.forEach((button) => {

    button.addEventListener('click', () => {
        let maxWidth = window.matchMedia("(max-width: 990px)");
        let mobilWidth = window.matchMedia("(max-width: 48em)");
        console.log(maxWidth.matches);
        if (mobilWidth.matches) {
            if (button.innerHTML === "Do košíku") {
                button.innerHTML = "Přidáno";
                kosikBox[0].style.display = "none";
                pocetObjednavek += 1;
                numberItems.forEach((el) => {
                    el.setAttribute('value', pocetObjednavek);
                });
                numberItemsCart.innerHTML = pocetObjednavek;
                cartNum.forEach((el) => {
                    el.innerHTML = '' + pocetObjednavek;
                });
            } else if (button.innerHTML === "Přidáno") {
                pocetObjednavek -= 1;
                button.innerHTML = "Do košíku";
                if (pocetObjednavek === 0) {
                    kosikBox[0].style.display = "none";
                }
                cartNum.forEach((el) => {
                    el.innerHTML = '' + pocetObjednavek;
                });
                numberItemsCart.innerHTML = pocetObjednavek;
                numberItems.forEach((el) => {
                    el.setAttribute('value', pocetObjednavek);
                });
                numberItemsCart.innerHTML = pocetObjednavek;
            }
        } else if (maxWidth.matches) {
            shoppingCart.style.display = 'none';

            if (button.innerHTML === "Do košíku") {
                button.innerHTML = "Přidáno";
                kosikBox[0].style.display = "block";
                pocetObjednavek += 1;
                numberItems.forEach((el) => {
                    el.setAttribute('value', pocetObjednavek);
                });
                numberItemsCart.innerHTML = pocetObjednavek;
                cartNum.forEach((el) => {
                    el.innerHTML = '' + pocetObjednavek;
                });
            } else if (button.innerHTML === "Přidáno") {
                pocetObjednavek -= 1;
                button.innerHTML = "Do košíku";
                if (pocetObjednavek === 0) {
                    kosikBox[0].style.display = "none";
                }

                cartNum.forEach((el) => {
                    el.innerHTML = '' + pocetObjednavek;
                });
                numberItemsCart.innerHTML = pocetObjednavek;
                numberItems.forEach((el) => {
                    el.setAttribute('value', pocetObjednavek);
                });
                numberItemsCart.innerHTML = pocetObjednavek;
            }
        } else {
            shoppingCart.style.display = 'none';

            if (button.innerHTML === "Do košíku") {
                button.innerHTML = "Přidáno";
                kosikBox[1].style.display = "block";
                pocetObjednavek += 1;
                numberItems.forEach((el) => {
                    el.setAttribute('value', pocetObjednavek);
                });
                numberItemsCart.innerHTML = pocetObjednavek;
                cartNum.forEach((el) => {
                    el.innerHTML = '' + pocetObjednavek;
                });
            } else if (button.innerHTML === "Přidáno") {
                pocetObjednavek -= 1;
                button.innerHTML = "Do košíku";
                if (pocetObjednavek === 0) {
                    kosikBox[1].style.display = "none";
                    numberItems.forEach((el) => {
                        el.setAttribute('value', pocetObjednavek);
                    });
                    numberItemsCart.innerHTML = pocetObjednavek;
                }
                cartNum.forEach((el) => {
                    el.innerHTML = '' + pocetObjednavek;
                });
            }
        }

    });
});

function onAjaxCart(resp) {
    var pars = resp.split(',');
    if (e = document.getElementById('c' + pars[0])) { e.className = 'crt' + pars[1]; e.title = pars[2] };
    if (e = document.getElementById('cart-box')) e.style.display = pars[5];
    if (e = document.getElementById('cart-num')) e.innerHTML = pars[3];
    if (e = document.getElementById('cart-price')) e.innerHTML = pars[4];
}
