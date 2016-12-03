angular.module('App.controladorUser', [])

.controller('LoginCtrl', function($scope, $stateParams, $timeout, $state,$ionicPopup, factoryApuestas,ServicioFirebase,factoryUsuario) {
 
  $scope.usuario = {};


$scope.Test=function(para)
{
$scope.usuario.email = para+ "@gmail.com";
$scope.usuario.pass = '123456';

};




    $scope.mensajeLogin = {};
  $scope.mensajeLogin.ver = false;
  




if (!factoryUsuario.Logueado)
      $scope.logueado = 'no';
    else $scope.logueado = 'si';


  $scope.login = function() {
     $scope.cargando = true;
        var corte = $scope.usuario.email.indexOf('@');
        var nombre= $scope.usuario.email.substring(0,corte);
        
$scope.usuario.nombre= nombre;

    $scope.errorLogin = {};
    $scope.errorLogin.ver = false;
    firebase.auth().signInWithEmailAndPassword($scope.usuario.email, $scope.usuario.pass)
    .then( function(resultado){

$timeout(function() {
      var user = firebase.auth().currentUser;

  /* var perfil ='/usuario/' + user.displayName + '/perfil';
   var saldo ='/usuario/' + user.displayName + '/saldo';

    $scope.usuario.perfil=ServicioFirebase.Buscar(perfil);
  $scope.usuario.saldo=ServicioFirebase.Buscar(saldo);

*/
ServicioFirebase.CargarDatos('/usuario/')
.on('child_added',function(snapshot)
      {   

            if(snapshot.val().nombre == user.displayName)
               {
                 $scope.usuario.perfil=snapshot.val().perfil;
                 $scope.usuario.saldo=snapshot.val().saldo;
                   $scope.usuario.cargas=snapshot.val().cargas;
              }



});

/*
        var corte = $scope.login.usuario.indexOf('@');
        var nombre= $scope.login.usuario.substring(0,corte);

    usuario.updateProfile({
        displayName:   nombre
    }).then(function() {      

    }, function(error) {

    });

*/
  

        var updates = {};
      updates['/usuario/' + user.displayName + '/fechaAcceso'] = firebase.database.ServerValue.TIMESTAMP;
      ServicioFirebase.Editar(updates);
  });
      $timeout(function() {
        $scope.logueado = 'si';

      factoryUsuario.Logueado=$scope.usuario;

          console.info("factory",factoryUsuario);


//cargando apuestas


/*

  $scope.cargandoDatos = [];

$timeout(function() {
ServicioFirebase.CargarDatos('/apuestas/')
.on('child_added',function(snapshot)
      {   


$scope.cargandoDatos.push(snapshot.val());


factoryApuestas.Apuestas=$scope.cargandoDatos;
 
}
)  
});

*/

////







          $scope.showAlert("BIENVENIDO " +  nombre + "!" + "   "+"Elije el juego");
        $state.go('app.gallery');
  
        
      });

    }, function (error){
        $timeout(function() {
          switch (error.code)
          {
            case "auth/user-not-found":
            case "auth/wrong-password":
            case "auth/invalid-email":
                $scope.errorLogin.mensaje = "Correo o contraseña incorrectos. Revise o registrese";
                $scope.errorLogin.ver = true;
                 break;
  
          }
         $scope.showAlert($scope.errorLogin.mensaje);
         $scope.cargando = false;
       
        
        });
    });
  };





   $scope.Deslogear = function () {
    try
    {
      $scope.errorLogin = {};
      $scope.errorLogin.ver = false;
      firebase.auth().signOut().catch(function (error){
          $scope.mensajeLogin.ver = true;
          $scope.mensajeLogin.mensaje = "No se pudo salir de la aplicación, intente nuevamente.";
          $scope.mensajeLogin.estilo = "alert-danger";
      }).then( function(resultado){
        $timeout(function() {
          $scope.logueado = 'no';
          $scope.mensajeLogin.ver = true;
          $scope.mensajeLogin.mensaje = "Gracias por utilizar la aplicación.";
          $scope.mensajeLogin.estilo = "alert-success";
        });
      });
      console.log("Deslogueo");
          $scope.cargando = false;
   
    }
    catch (error)
    {
      $scope.mensajeLogin.mensaje = "Ha ocurrido un error.";
      $scope.mensajeLogin.ver = true;
      $scope.mensajeLogin.estilo = "alert-danger";
      console.info("Ha ocurrido un error en Deslogueo(). " + error);
    }
  };



    $scope.showAlert = function(resultado) {
      var alertPopup = $ionicPopup.alert({
         title: resultado
      });
      alertPopup.then(function(res) {
       
      });
   };








        $scope.exitApp = function () {
             console.log("saliendo");
              ionic.Platform.exitApp();
        };






  
console.info("isjasj...",factoryUsuario.Logueado);

/* fin controler*/})






.controller('RegistroCtrl', function($scope, $stateParams, $timeout, $state,$ionicPopup, factoryUsuario,ServicioFirebase) {
   $scope.usuario = {};
  

$scope.Test=function()
{
$scope.usuario.email = "algo1@gmail.com";
$scope.usuario.pass = '123456';
};

  $scope.mensajeLogin = {};

  $scope.Registrar = function (){
    $scope.mensajeLogin.ver = false;
      $scope.cargando = true;
    try
    {

       var corte = $scope.usuario.email.indexOf('@');
        var nombre= $scope.usuario.email.substring(0,corte);
  $scope.usuario.nombre = nombre;


    firebase.auth().createUserWithEmailAndPassword($scope.usuario.email, $scope.usuario.pass)
    .then(function(resultado){
      var fecha = firebase.database.ServerValue.TIMESTAMP;
      var usuario = {
        correo: $scope.usuario.email,
        nombre: $scope.usuario.nombre,
        saldo: "1000",
        fechaCreacion: fecha,
        fechaAcceso: fecha,
        perfil:"cliente",
        borrado:false 
      };
      ServicioFirebase.Guardar('usuario/' + $scope.usuario.nombre, usuario);
      firebase.auth().signInWithEmailAndPassword($scope.usuario.email, $scope.usuario.pass).catch(function (error){

        }).then( function(resultado){
          firebase.auth().currentUser.updateProfile({
            displayName: $scope.usuario.nombre,
          }).then(function() {  

          }, function(error) {
            // An error happened.
          });
        });


  var alertPopup = $ionicPopup.alert({
         title: 'REGISTRADO Correctamente.Inicia Sesion Para confirmar Email'
      });
      alertPopup.then(function(res) {
 factoryUsuario.Logueado=$scope.usuario;
         $state.go('Login');
      });

 
      

      },function (error){
        $timeout(function() {
            switch (error.code)
            {
              case "auth/email-already-in-use":
                  $scope.mensajeLogin.mensaje = "El correo ya esta registrado.";
                  $scope.mensajeLogin.ver = true;
                  $scope.mensajeLogin.estilo = "alert-danger";
                    $scope.cargando = false;
                break;

            }
            var alertPopup = $ionicPopup.alert({
         title: $scope.mensajeLogin.mensaje
      });

      alertPopup.then(function(res) {
 
         $scope.cargando = false;
      });
            console.info(error.code);
          });
      });
    }
    catch (error)
    {
      $scope.mensajeLogin.mensaje = "Ha ocurrido un error.";
      $scope.mensajeLogin.ver = true;
      $scope.mensajeLogin.estilo = "alert-danger";
      console.info("Ha ocurrido un error en Registrar(). " + error);
      
       var alertPopup = $ionicPopup.alert({
         title: $scope.mensajeLogin.mensaje
      });
      alertPopup.then(function(res) { 
          $scope.cargando = false;
      });
    }

  };
})



.controller('controlerDatos', function($scope, $stateParams, $timeout, $state,$ionicPopup, factoryUsuario,ServicioFirebase) {
   $scope.usuario = {};
   $scope.mostrar=true;
   $scope.mjsFin=false;
   $scope.creditos= false;
       $scope.tablaCreditos=false;
$scope.usuariosCreditos=[];

$scope.usuario= factoryUsuario.Logueado;

console.info('$scope.usuario.....!!!',$scope.usuario);

$scope.Cargar=function()
{
$scope.mostrar=false;
   $scope.creditos= true;
}


$scope.CargarPlata=function(credito)
{  console.info(credito);



          var updateCreditos = {};
        
          updateCreditos['/usuario/' + $scope.usuario.nombre + '/cargas'] = $scope.usuario.cargas + credito;                         
          firebase.database().ref().update(updateCreditos);
 

  $scope.creditos= false;
  $scope.mjsFin=true;


}






ServicioFirebase.CargarDatos('/usuario/')
.on('child_added',function(snapshot)
      {       
  if(snapshot.val().cargas != 0)
               {
                $scope.tablaCreditos=true;
       $scope.usuariosCreditos.push(snapshot.val());
              }

                                  

                        $scope.Aprobar= function(usuario)
                        {

                                  var updateCreditos = {};
                                
                                  updateCreditos['/usuario/' + usuario.nombre + '/cargas'] = 0;                         
                                  updateCreditos['/usuario/' + usuario.nombre + '/saldo'] = usuario.saldo + usuario.cargas ;                         
                                  firebase.database().ref().update(updateCreditos);
                                      $scope.tablaCreditos=false;


                                                                            ServicioFirebase.CargarDatos('/usuario/')
                                                                                                      .on('child_added',function(snapshot)
                                                                                                            {       
                                                                                                        if(snapshot.val().cargas != 0)
                                                                                                                     {
                                                                                                                      $scope.tablaCreditos=true;
                                                                                                             $scope.usuariosCreditos.push(snapshot.val());
                                                                                                                    }                                              

                                                                                  
                                                                            });

                                                                       


                        }

});








   })