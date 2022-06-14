let kniha = JSON.parse(localStorage.getItem('url'));
console.log('Knihy', kniha);
console.log(JSON.parse(localStorage.getItem('url')));
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
            let cena = 0;
            let cenaVseho = 0;
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
                    cenaVseho = cena + cenaVseho;
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
            console.log(it);
            if (document.querySelectorAll('#kriz')) {
                const kriz = document.querySelectorAll('#kriz');
                kriz.forEach(function (el) {
                    const aktKriz = $(el).parents("section");
                    $(el).click(function () {
                        aktKriz.remove();
                        console.log($(aktKriz).attr('id'));
                    });
                });
                console.log(kriz);
            }
        }).catch(error => console.log('error', error));
});
$('.cena-celkem').append(`<p class="cena">Cena celkem (s DPH): ${cenaVseho}</p>`)
