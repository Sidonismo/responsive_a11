getZboziLocalStorage = () => {
    let uloziste = JSON.parse(localStorage.getItem("zbozi"));
    let tbodyObjednavka = document.querySelector('.tbody-objednavka');
    let cenaCelkem = document.querySelector('#cena-celkem');
    console.log(uloziste.length);
    let trCenaCelkem = 0;
    it = 0
    uloziste.forEach(element => {

        tbodyObjednavka.innerHTML += `<tr class="tr-objednavka">
                        <td>${element.title}</td>
                        <td class="td-objednavka">${element.cena}&nbsp;Kč</td>
                    </tr>`;
        it++;
        trCenaCelkem += element.cena;

        if (localStorage.getItem('udaje') && it === uloziste.length) {
            const udajeStorage = JSON.parse(localStorage.getItem('udaje'));
            if (udajeStorage.platba) {
                let cenaPosty = udajeStorage.platba;
                if (cenaPosty === 'ucet') {
                    cenaPosty = 99;
                } else cenaPosty = 120;
                tbodyObjednavka.innerHTML += `<tr class="tr-objednavka">
                        <td>Poštovné</td>
                        <td class="td-objednavka">${cenaPosty}&nbsp;Kč</td>
                    </tr>`;
                cenaCelkem.innerHTML = `<strong>${trCenaCelkem + cenaPosty}&nbsp;Kč</strong>`;

            }

        } else {
            cenaCelkem.innerHTML = `<strong>${trCenaCelkem}&nbsp;Kč</strong>`;
        }
    });
    return trCenaCelkem;
}

console.log(getZboziLocalStorage());
