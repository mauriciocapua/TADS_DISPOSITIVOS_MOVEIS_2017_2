var cont = 0;
var divNumero = document.querySelector('div.numero');
var btIncrementar = document.querySelector('#incrementar');
var btResetar = document.querySelector('#resetar');


document.addEventListener('deviceready', function() {
  console.debug('PRONTO: ' + device.platform);
  cont = parseInt(localStorage['cont'] || 0);
  divNumero.textContent = cont;
  btIncrementar.addEventListener('click', function() {
    cont++;
    localStorage['cont'] = cont;
    divNumero.textContent = cont;
  });
  btResetar.addEventListener('click', function() {
    cont = 0;
    localStorage.clear();
    divNumero.textContent = cont;
  });
});









