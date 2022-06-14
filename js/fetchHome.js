var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


fetch("https://antikvariat.textrix.cz/api/home", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    result.list.forEach(element => {
      let kat = [];
      let oid = element.oid;
      let itid = element.itid;
      let title = '';
      let autor = '';
      let rok = 0;
      let stran = '';
      let cena = 0;
      let fieldsLength = element.fields.length;
      let field = {}
      let url = element.url;
      for (let i = 0; i < fieldsLength; i++) {
        field = element.fields[i];
        if (field.dc === 'title') {
          title = field.val;
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
        if (field.label === "Cena") {
          cena = field.val;
        }
      }
      $(".zbozi").append(
        `<section id="p${itid}" class="para grow">
          <h2>
            <a href="${url}" title="${title}">${title}</a>
          </h2>
          <img src="https://antikvariat.textrix.cz/assets/cache/${oid}-tn.png" class="obrazek-zbozi" alt="${title}" />
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
              `+/* Nemůžu najít v API JSON */`
              <span>Chybí v API JSON</span>
            </li>
            <li class="para-price">
              <strong>Cena:</strong>
            <span>${cena} Kč</span><button type="button" class="do-kosiku">Do košíku</button>

            </li>
              <div class="acrt">
                POLOŽKA NENÍ NA PRODEJNĚ,<br />JE V NAŠEM SKLADU, NUTNO OBJEDNAT.
              </div>
          </ul>
         </section>`);
    });
    $(document).ready(function () {
      let vKosiku = document.querySelectorAll(".do-kosiku");
      let cartNum = document.querySelectorAll(".cart-num");

      let numberItemsCart = document.querySelector(".number-items-cart");
      let pocetObjednavek = 0;

      let vybraneZbozi = [];
      let vybraneZboziUrl = [];
      if (localStorage.getItem("zbozi")) {
        vybraneZbozi = JSON.parse(localStorage.getItem("zbozi"));
        pocetObjednavek = vybraneZbozi.length;
        numberItemsCart.innerHTML = pocetObjednavek;
        console.log(vybraneZbozi);
      }
      vKosiku.forEach((button) => {
        if (!vybraneZbozi.filter(item => item === button.parentElement.parentElement.parentElement.id).length) {
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
            vybraneZbozi.push(button.parentElement.parentElement.parentElement.id);
            vybraneZboziUrl.push(button.parentElement.parentElement.parentElement.children[0].children[0].getAttribute('href'));
            console.log(vybraneZbozi);
            console.log(vybraneZboziUrl);
            localStorage.setItem("zbozi", JSON.stringify(vybraneZbozi));
            localStorage.setItem("url", JSON.stringify(vybraneZboziUrl));
          } else if (button.innerHTML === "Přidáno") {
            pocetObjednavek -= 1;
            button.innerHTML = "Do košíku";
            cartNum.forEach((el) => {
              el.innerHTML = '' + pocetObjednavek;
            });
            numberItemsCart.innerHTML = pocetObjednavek;
            vybraneZbozi = vybraneZbozi.filter(item => item !== button.parentElement.parentElement.parentElement.id);
            console.log(vybraneZbozi);
            localStorage.setItem("zbozi", JSON.stringify(vybraneZbozi));
            localStorage.setItem("url", vybraneZboziUrl);
            button.style.backgroundColor = "#ff0000";
            button.style.color = "#ffffff";
          }          
        });
      });
    });
  })
  .catch(error => console.log('error', error));