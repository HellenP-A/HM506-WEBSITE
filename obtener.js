
function mostrarUser (){
    let storeUsuario = localStorage.getItem('Usuario');
    let almacenUser = JSON.parse(document.getElementById('Usuario'));
 console.log(almacenUser);
    // almacenUser.innerHTML ='',
    // almacenUser.innerHTML = `<div> ${storeUsuario.usuario} </div>` 
}