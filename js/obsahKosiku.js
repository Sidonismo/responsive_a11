getZboziLocalStorage = () => {
    let uloziste = JSON.parse(localStorage.getItem("zbozi"));
    let tbodyObjednavka = document.querySelector('.tbody-objednavka');
    let cenaCelkem = document.querySelector('#cena-celkem');
    console.log(uloziste);
    let trCenaCelkem = 0;
    it = 0
    uloziste.forEach(element => {
        
        tbodyObjednavka.innerHTML += `<tr class="tr-objednavka">
                        <td>${element.title}</td>
                        <td class="td-objednavka">${element.cena}&nbsp;Kč</td>
                    </tr>`;
        it++;
        trCenaCelkem += element.cena;
        cenaCelkem.innerHTML = `<strong>${trCenaCelkem}&nbsp;Kč</strong>`;
    });
    return trCenaCelkem;
}
console.log(getZboziLocalStorage());
