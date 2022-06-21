let kniha = [];
let vybraneZbozi = [];
novaCena = 0;
let pocetObjednavek = 0;
const numberItemsCart = document.querySelector(".number-items-cart");
const nastavCenu = function () {
    novaCena = 0;
    for (let y = 0; y < vybraneZbozi.length; y++) {
        novaCena += vybraneZbozi[y].cena;
    }
    $('.cena-vseho').html(novaCena);
}
if (JSON.parse(localStorage.getItem('zbozi'))) {
    document.addEventListener("click", function () {
        setTimeout(nastavCenu, 0)
    });
    kniha = JSON.parse(localStorage.getItem('zbozi'));
    vybraneZbozi = JSON.parse(localStorage.getItem("zbozi"));
    pocetObjednavek = vybraneZbozi.length;
}

if (pocetObjednavek !== 0) {
    numberItemsCart.innerHTML = pocetObjednavek;
    let cenaVseho = 0;
    let cena = 0;
    let it = 0;
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    kniha.forEach(element => {
        console.log(element.url);
        fetch("https://antikvariat.textrix.cz/api" + element.url, requestOptions)
            .then(response => response.json())
            .then(result => {
                const oid = result.item.oid;
                let priceOfItem = 0;
                const itid = result.item.itid;
                let url = kniha[it];
                const title = result.item.fields[0].val;
                let autor = '';
                let rok = 0;
                const fieldsLength = result.item.fields.length;
                let field = {}
                for (let i = 0; i < fieldsLength; i++) {
                    field = result.item.fields[i];
                    if (field.label === 'Autor') {
                        autor = field.val;
                    }
                    if (field.label === 'Cena') {
                        priceOfItem = field.val;
                    }
                    if (field.label === 'Rok vydání') {
                        rok = field.val;
                    }
                    if (field.label === "Cena") {
                        cena = field.val;
                        cenaVseho = Number(cena) + Number(cenaVseho);
                    }
                }
                $(".kosik").append(`
                <section id="p${itid}" class="kosik-container">
                    <a href="${url}" title="${title}">
                        <img src="https://antikvariat.textrix.cz/assets/cache/${oid}-tn.png" class="obrazek-kosik" alt="${title}" />
                    </a>
                    <ul class="para-flds">
                        <li class="para-tit">
                            <h2><a href="${url}" title="${title}">${title}</a></h2>
                        </li>
                        <li class="para-au">
                            <strong>Autor:</strong>
                            <span>${autor}</span>
                        </li>
                        <li class="para-issued">
                            <strong>Rok vydání:</strong>
                            <span>${rok}</span>
                        </li>
                        <li class="para-price">
                            <strong>Cena:</strong>
                            <span>${cena} Kč</span>
                            <button class="vymazat"><img  type="image/svg+xml" src="svg/kriz.svg" class="kriz" id="kriz-${itid}" name="vymazani"></button>
                        </li>
                    </ul>
                </section>`);
                it++;
                if (it === kniha.length) {
                    $('.cena-vseho').append(`${cenaVseho}`);
                }
            }).then(() => {
                if (document.querySelectorAll('.vymazat')) {
                    const kriz = document.querySelectorAll('.vymazat');

                    for (let x = 0; x < kriz.length; x++) {

                        const aktKriz = $(kriz[x]).parents("section");
                        $(kriz[x]).click(function () {
                            vybraneZbozi = vybraneZbozi.filter(item => item.name !== aktKriz[0].id);
                            /* kniha = kniha.filter(item => item !== aktKriz[0].childNodes[1].getAttribute('href')); */
                            localStorage.setItem("zbozi", JSON.stringify(vybraneZbozi));
                            /* localStorage.setItem("url", JSON.stringify(kniha)); */
                            if (vybraneZbozi) {
                                numberItemsCart.innerHTML = vybraneZbozi.length;
                            } else {
                                numberItemsCart.innerHTML = 0;
                            }
                            if (vybraneZbozi.length === 0) {
                                $('.cena').replaceWith('<h2 class="warning">Nemáte vybrané žádné produkty!</h2>');
                                $('.tlacitko-objednavka').remove();
                            }
                            aktKriz.remove();
                        });

                    }
                }
            }).catch(error => console.log('error', error));
    });
} else {
    $('.cena').replaceWith('<h2 class="warning">Nemáte vybrané žádné produkty!</h2>');
    $('.tlacitko-objednavka').remove();
}