let kniha = [];
let vybraneZbozi = [];
let pocetObjednavek = 0;
let numberItemsCart = document.querySelector(".number-items-cart");
if ( JSON.parse(localStorage.getItem('url'))){
    kniha = JSON.parse(localStorage.getItem('url'));
    vybraneZbozi = JSON.parse(localStorage.getItem("zbozi"));
    pocetObjednavek = vybraneZbozi.length;
}

    if (pocetObjednavek !== 0) {
    numberItemsCart.innerHTML = pocetObjednavek;
let cenaVseho = 0;
let cena = 0;
console.log('Knihy', kniha);

let it = 0;
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
kniha.forEach(element => {
    fetch("https://antikvariat.textrix.cz/api" + element, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.item.fields[0].val);
            let oid = result.item.oid;
            console.log(oid);
            let itid = result.item.itid;
            let url = kniha[it];
            let title = result.item.fields[0].val;
            let autor = '';
            let rok = 0;
            let fieldsLength = result.item.fields.length;
            let field = {}
            for (let i = 0; i < fieldsLength; i++) {
                field = result.item.fields[i];
                console.log("Field", field);
                if (field.label === 'Autor') {
                    autor = field.val;
                }
                if (field.label === 'Rok vydání') {
                    rok = field.val;
                }
                if (field.label === "Cena") {
                    cena = field.val;
                    cenaVseho = Number(cena) + Number(cenaVseho);
                    console.log(typeof cenaVseho);
                }
            }
            $(".kosik").append(`
                <section id="p${itid}" class="kosik-container">
            <a href="${url}" title="${title}">
                <img src="https://antikvariat.textrix.cz/assets/cache/${oid}-tn.png" class="obrazek-kosik" alt="${title}" />
            </a>
            <ul class="para-flds">
                <li class="para-tit">
                    <a href="${url}" title="${title}">${title}</a>
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
                <img  type="image/svg+xml" src="svg/kriz.svg" id="kriz" name="vymazani">
                </li>
            </ul>
           </section>`);
            console.log(result);
            it++;
            console.log('it: ', it);
            if (it === kniha.length){
                $('.cena-vseho').append(`${cenaVseho}`);
            }
            
            console.log(it);

            if (document.querySelectorAll('#kriz')) {
                const kriz = document.querySelectorAll('#kriz');
                let it2 = 0;
                kriz.forEach(function (el) {
                    const aktKriz = $(el).parents("section");
                    $(el).click(function () {
                        vybraneZbozi = vybraneZbozi.filter(item => item !== aktKriz[0].id);
                        kniha = kniha.filter(item => item !== aktKriz[0].childNodes[1].getAttribute('href'));
                        localStorage.setItem("zbozi", JSON.stringify(vybraneZbozi));
                        localStorage.setItem("url", JSON.stringify(kniha));
                        
                        if(vybraneZbozi){
                            numberItemsCart.innerHTML = vybraneZbozi.length;
                        } else {
                            numberItemsCart.innerHTML = 0;
                        }
                        if (vybraneZbozi.length === 0){
                            $('.cena').replaceWith('<h2 class="warning">Nemáte vybrané žádné produkty!</h2>');
                            $('.tlacitko-objednavka').remove();
                        } else {
                            if (it2 === 0){
                                cenaVseho -= Number(aktKriz[0].childNodes[3].innerText.match(/\d+(?=.kč)/giu)[0]);
                                console.log(cenaVseho, Number(aktKriz[0].childNodes[3].innerText.match(/\d+(?=.kč)/giu)[0]));
                                $('.cena-vseho').replaceWith(cenaVseho);
                                it2++;
                            }
                        }
                        aktKriz.remove();
                        console.log($(aktKriz).attr('id'));
                    });
                });
            }
        }).catch(error => console.log('error', error));
});
} else {
    $('.cena').replaceWith('<h2 class="warning">Nemáte vybrané žádné produkty!</h2>');
    $('.tlacitko-objednavka').remove();
}