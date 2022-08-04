const udaje = JSON.parse(localStorage.getItem('udaje'));
const vyzvednutiEl = document.querySelector('.vyzvednuti');
const dobirkaEl = document.querySelector('.dobirka');
const kuryrEl = document.querySelector('.kuryr');
const mezinarodniEl = document.querySelector('.mezinarodni');
const emailEl = document.querySelector('.email');
const adresaEl = document.querySelector('.adresa');
const poznamkaEl = document.querySelector('.poznamka');
const poznamkaNadpisEl = document.querySelector('.poznamka-nadpis');
const obj = document.querySelector('#obj');
console.log(udaje.dodani);
if (document.location.host.includes('github.io')){
    obj.action = 'https://sidonismo.github.io/responsive_a11/prijeti_objednavky.html';
} else {
    obj.action = '/prijeti_objednavky.html';
}
if (udaje.dodani === 'mezinarodni'){
    vyzvednutiEl.remove();
    dobirkaEl.remove();
    kuryrEl.remove();
    adresaEl.innerHTML = udaje.adresa;
} 
else if (udaje.dodani === 'gls'){
    if (udaje.platba === 'dobirka'){
        vyzvednutiEl.remove();
        kuryrEl.remove();
        mezinarodniEl.remove();
    } else {
        vyzvednutiEl.remove();
        dobirkaEl.remove();
        mezinarodniEl.remove();
    }
    adresaEl.innerHTML = udaje.adresa; 
}
else {
    dobirkaEl.remove();
    kuryrEl.remove();
    mezinarodniEl.remove();
}

emailEl.innerHTML = udaje.email;
if (udaje.poznamka !== ''){
    poznamkaEl.innerHTML = udaje.poznamka;
} else {
    poznamkaNadpisEl.remove();
}

console.log(adresaEl.innerText || "");
