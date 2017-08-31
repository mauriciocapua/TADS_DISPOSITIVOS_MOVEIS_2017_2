var cont = 1;
var divNumero = document.querySelector('div.numero');
var btIncrementar = document.querySelector('#incrementar');
var btResetar = document.querySelector('#resetar');

document.addEventListener('deviceready', function() {
    console.log('PRONTO: ' + device.platform);
    if(localStorage['cont']) {
        cont = parseInt(localStorage['cont'] || 0);
    }
    divNumero.textContent = cont;
    btIncrementar.addEventListener('click', function() {
        cont++;
        localStorage['cont']=cont;
        divNumero.textContent = cont;
    });
    btResetar.addEventListener('click', function() {
        cont = 0;
        divNumero.textContent = cont;
    });
});


