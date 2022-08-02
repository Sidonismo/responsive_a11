const dodvyz = document.getElementById('dodvyz');
const dodkur = document.getElementById('dodkur');
const dodkurm = document.getElementById('dodkurm');
const pobocka = document.getElementById('pobocka');
const platba = document.getElementById('platba');
const plkur = document.getElementById('plkur');
const adresa = document.getElementById('adresa');
const note = document.getElementById('note');
const submitButton = document.querySelector('.tlacitko-objednavka');

submitButton.addEventListener( 'click', ()=>{
    if (dodvyz.checked){
        console.log(dodvyz);
    }
    else if (dodkur.checked){
        console.log(dodkur);
    }
    else if (dodkurm.checked){
        console.log(dodkurm);
    }
});
