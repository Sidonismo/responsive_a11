localStorage.removeItem("udaje");
const dodvyz = document.getElementById('dodvyz');
const dodkur = document.getElementById('dodkur');
const dodkurm = document.getElementById('dodkurm');
const pobocka = document.getElementById('pobocka');
let platba = document.getElementById('platba');
const plkur = document.getElementById('plkur');
const mail = document.getElementById('mail');
const jmeno = document.getElementById('name');
const ulice = document.getElementById('street');
const cisloUlice = document.getElementById('num');
const mesto = document.getElementById('city');
const psc = document.getElementById('pcode');
let tel = document.getElementById('phone');
let poznamka = document.getElementById('note');
let obj = document.getElementById('obj');
const submitButton = document.querySelector('.tlacitko-objednavka');

if (document.location.host.includes('github.io')){
    obj.action = 'https://sidonismo.github.io/responsive_a11/kontrola.html';
} else {
    obj.action = '/kontrola.html';
}

submitButton.addEventListener( 'click', ()=>{
    ulozUdaje();
});
ulozUdaje = function(){
    let dodani = '';
    let adresa = '';
    if (dodvyz.checked){
        dodani = 'vyzvednuti';
        poznamka = poznamka.value;
        platba = '';
        tel = '';
    }
    else if (dodkur.checked){
        dodani = 'gls';
        if (platba.elements[0].checked){
            platba = 'dobirka';
        } 
        else if (platba.elements[1].checked){
            platba = 'ucet';
        } 
        else platba = '';
        adresa = '<li>' + jmeno.value + '</li><li>' + ulice.value + ' ' + cisloUlice.value + '</li><li>' + mesto.value + ' ' + psc.value + '</li>';
        poznamka = poznamka.value;
        tel = tel.value;
    }
    else if (dodkurm.checked){
        dodani = 'mezinarodni';
        adresa = '<li>' + jmeno.value + '</li><li>' + ulice.value + ' ' + cisloUlice.value + '</li><li>' + mesto.value + ' ' + psc.value + '</li>';
        poznamka = poznamka.value;
        platba = '';
        tel = '';
    }
    const osobniUdaje = {
        'dodani': dodani,
        'platba': platba,
        'email': mail.value,
        'adresa': adresa,
        'telefon': tel,
        'poznamka': poznamka
    }
    localStorage.setItem("udaje", JSON.stringify(osobniUdaje));
}
