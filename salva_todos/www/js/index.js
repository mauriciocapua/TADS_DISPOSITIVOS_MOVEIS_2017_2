/* global device cordova */

/*var bt = document.querySelector('button');*/
var divResultado = document.querySelector('div.resultado');
var internId = document.querySelector('.internId');
var internDescricao = document.querySelector('.internDescricao');
var btnReload = document.querySelector('#reload');

var flag = false;
var tmpDescricao = null;
document.addEventListener('deviceready', function() {
  console.debug('PRONTO: ' + device.platform);
  /*bt.addEventListener('click', capturar);*/
  nfc.addTagDiscoveredListener(onNfc, success, failure);
  btnReload.addEventListener('click', reload);

});

function onNfc(nfcEvent) {
  flag =false;
  checkExists(nfcEvent);
  if(flag){
  alert("Tag já registrada: "+tmpDescricao);
  };
  if(!flag){
   addTag(nfcEvent); 
  };
  
};

function checkExists(nfcEvent){
  firebase.database().ref('/tags')
  .on('child_added', function(snapshot) {

    var childData = JSON.stringify(snapshot.val().id);
    /*alert(childData);*/
    var idTemp = JSON.stringify(nfcEvent.tag.id);
    /*alert(idTemp);*/

    if(childData == idTemp){
      /*alert("Tag já registrada: "+snapshot.val().descricao);*/
      tmpDescricao=snapshot.val().descricao;
      flag =true;
    };
  });
};

function addTag(tag){
  var descricao = window.prompt("Informe a descrição desta nova tag", " ");
  if(descricao!=null){
    var newTag = {id:tag.tag.id,descricao : descricao};
    var tagCreated = firebase.database().ref('/tags').push(newTag);
    if(tagCreated){
      alert("Tag "+descricao+" criada");
    }else{
      alert("Falha ao criar tag "+descricao);
    }
  }
  else{
    alert("descricao vazia");
  };
};

function success(result) {
  console.log("Listening for NFC Messages");
};
function failure(reason) {
  alert("Failed to add NDEF listener");
};


firebase.database().ref('/tags')
.on('child_added', function(dado) {
  addRow(dado.val().id,dado.val().descricao);
});


function addRow(id, descricao){
  $("#tableCards").append('<tr><td><input type="hidden" value="'+id+'"/>'+id+'</td><td>'+descricao+'</td><td><button class="waves-effect waves-light btn red" onclick="deletar(&quot;'+id+'&quot;)">Deletar</button></td></tr>');
};

function reload(){
  location.reload();
};

function deletar(id){
  firebase.database().ref('/tags')
  .on('child_added', function(snapshot) {

    var childData = `\"${snapshot.val().id}\"`;
    /*alert(childData);*/
    var idTemp = JSON.stringify(id);
    /*alert(idTemp);*/

    if(childData == idTemp){
      firebase.database().ref("tags").child(snapshot.key).remove();
    };
  });
  reload();
};




