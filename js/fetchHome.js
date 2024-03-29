const hrefKosik = $('.href-kosik');
let pocetObjednavek = 0;
let cenaZbozi = 0;

if (document.location.host.includes('github.io')){
  $(hrefKosik).attr("href", 'https://sidonismo.github.io/responsive_a11/kosik.html');
} else {
  $(hrefKosik).attr("href", 'http://127.0.0.1:5501/kosik.html');
}
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


fetch("https://antikvariat.textrix.cz/api/home", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    result.list.forEach(element => {
      const kat = [];
      const oid = element.oid;
      const itid = element.itid;
      let title = '';
      let autor = '';
      let rok = 0;
      let stran = '';
      let cena = 0;
      const fieldsLength = element.fields.length;
      let field = {}
      const url = element.url;

      for (let i = 0; i < fieldsLength; i++) {
        field = element.fields[i];
        if (field.label === 'Název') {
          title = field.val;
        }
        if (field.label === 'Další název') {
          title2 = field.val;
        }
        if (field.label === 'Autor') {
          autor = field.val;
        }
        if (field.label === 'Rok vydání') {
          rok = field.val;
        }
        if (field.label === 'Počet stran') {
          stran = field.val;
        }
        if (field.label === 'Kategorie') {
          kat.push(field.val);
        }
        if (field.tag === "price") {
          cena = field.val;
        }
      }
      $(".zbozi").append(
        `<section id="p${itid}" class="para grow">
          <h2>
            <a href="${url}" title="${title}">${title}</a>
          </h2>
          <img src="https://antikvariat.textrix.cz/assets/cache/${oid}-tn.png" width="200" class="obrazek-zbozi" alt="${title}" />
          <ul class="para-flds">
            <li class="para-au">
              <strong>Autor:</strong>
              <span>${autor}</span>
            </li>
            <li class="para-issued">
                <strong>Rok vydání:</strong>
                <span>${rok}</span>
            </li>
            <li class="para-pg">
              <strong>Počet stran:</strong>
              <span>${stran}</span>
            </li>
            <li class="para-cat">
              <strong>Kategorie:</strong>
              <span><a href="#">${kat.toString()}</a></span>
            </li>
            <li class="para-state">
              <strong>Stav:</strong>
              `+/* Nemůžu najít v API JSON stav*/`
              <span>Chybí v API JSON</span>
            </li>
            <li class="para-price">
              <strong>Cena:</strong>
            <span>${cena} Kč</span><button type="button" class="do-kosiku">Do košíku</button>
            </li>
          </ul>

          <div class="acrt">
          POLOŽKA NENÍ NA PRODEJNĚ,<br />JE V NAŠEM SKLADU, NUTNO OBJEDNAT.
        </div>
         </section>`);
    });
    $(document).ready(function () {
      const vKosiku = document.querySelectorAll(".do-kosiku");
      const cartNum = document.querySelectorAll(".cart-num");

      const numberItemsCart = document.querySelector(".number-items-cart");

      let vybraneZbozi = [];
      /* let vybraneZboziUrl = []; */
      if (JSON.parse(localStorage.getItem("zbozi"))) {
        vybraneZbozi = JSON.parse(localStorage.getItem("zbozi"));
        /* vybraneZboziUrl = JSON.parse(localStorage.getItem("url")); */
        pocetObjednavek = vybraneZbozi.length;
        numberItemsCart.innerHTML = pocetObjednavek;
        /* console.log(vybraneZbozi); */
      }
      vKosiku.forEach((button) => {
        if (!vybraneZbozi.filter(item => item.name === button.parentElement.parentElement.parentElement.id).length) {
          button.innerHTML = "Do košíku";
        } else {
          button.innerHTML = "Přidáno";
          button.style.backgroundColor = "#FFE500";
          button.style.color = "black";
        }
        button.addEventListener('click', () => {
          if (button.innerHTML === "Do košíku") {
            button.innerHTML = "Přidáno";
            pocetObjednavek += 1;
            button.style.backgroundColor = "#FFE500";
            button.style.color = "black";
            numberItemsCart.innerHTML = pocetObjednavek;
            cartNum.forEach((el) => {
              el.innerHTML = '' + pocetObjednavek;
            });

            cenaZbozi = button.parentElement.innerText.match(/\d+(?=.Kč)/)[0];
            //console.log(button.parentElement.parentElement.parentElement.children[1].src);
            vybraneZbozi.push({ 
              'name': button.parentElement.parentElement.parentElement.id, 
              'cena': Number(cenaZbozi), 
              'url': button.parentElement.parentElement.parentElement.children[0].children[0].getAttribute('href'), 
              'title': button.parentElement.parentElement.parentElement.firstChild.nextElementSibling.innerText,
              'autor': button.parentElement.parentElement.parentElement.children[2].children[0].children[1].innerText,
              'rok': button.parentElement.parentElement.parentElement.children[2].children[1].children[1].innerText,
              'foto': button.parentElement.parentElement.parentElement.children[1].src
            });
            /* vybraneZboziUrl.push(button.parentElement.parentElement.parentElement.children[0].children[0].getAttribute('href'));
              console.log('vybraneZboziUrl',vybraneZboziUrl);
              console.log('ted1:' ,vybraneZboziUrl); */

            localStorage.setItem("zbozi", JSON.stringify(vybraneZbozi));
            /* localStorage.setItem("url", JSON.stringify(vybraneZboziUrl)); */
          } else if (button.innerHTML === "Přidáno") {
            pocetObjednavek -= 1;
            button.innerHTML = "Do košíku";
            cartNum.forEach((el) => {
              el.innerHTML = '' + pocetObjednavek;
            });
            numberItemsCart.innerHTML = pocetObjednavek;
            vybraneZbozi = vybraneZbozi.filter(item => item.name !== button.parentElement.parentElement.parentElement.id);
            /* vybraneZboziUrl = vybraneZboziUrl.filter(item => item !== button.parentElement.parentElement.parentElement.children[0].children[0].getAttribute('href')); */
            /* console.log('ted2:' ,vybraneZboziUrl); */
            localStorage.setItem("zbozi", JSON.stringify(vybraneZbozi));
            /* localStorage.setItem("url", JSON.stringify(vybraneZboziUrl)); */
            button.style.backgroundColor = "#ff0000";
            button.style.color = "#ffffff";
          }          
        });
      });
    });
  })
  .catch(error => console.log('error', error));
