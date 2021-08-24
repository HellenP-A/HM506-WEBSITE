document.getElementById('formUser').addEventListener('submit', ingresoLogin);

function ingresoLogin(e){

     let txtUser = document.getElementById('txtusuario').value;
     let txtemail = document.getElementById('txtemail').value;
     let txtpass = document.getElementById('txtpassword').value;

    const user = {
        usuario: txtUser,
        email: txtemail,
        pass:txtpass
    }
//console.log(user);


localStorage.setItem('Usuario', JSON.stringify(user));

//let almacenUser = JSON.parse(document.getElementById('Usuario').innerHTML = nombrePaciente);

//mostrarUser();

// localStorage.setItem('Pacientes', JSON.stringify(user)); 
// let Paciente = JSON.parse(localStorage.getItem('user'));

 e.preventDefault();
}

// function localSortageLogIn(users){
// localStorage.setItem("Usuario", JSON.stringify(users));
// }

// function mostrarUser (){
//     let storeUsuario = JSON.parse(localStorage.getItem('Usuario'));
//     let almacenUser = document.getElementById('Usuario');

//     almacenUser.innerHTML ='',
//     almacenUser.innerHTML = `<div> ${storeUsuario.usuario} </div>` 
// }

// function mostrarUser (){
//     let storeUsuario = localStorage.getItem('Usuario');
//     let almacenUser = JSON.parse(document.getElementById('Usuario'));
//  console.log(almacenUser);
//     // almacenUser.innerHTML ='',
//     // almacenUser.innerHTML = `<div> ${storeUsuario.usuario} </div>` 
// }