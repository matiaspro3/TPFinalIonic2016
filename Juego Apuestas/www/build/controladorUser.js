angular.module('App.controladorUser', [])

.controller('LoginCtrl', function($scope, $stateParams, $timeout, $state,$ionicPopup, ServicioFirebase,factoryUsuario) {
 

  $scope.usuario = {};
  $scope.usuario.email = 'matiasjds87@gmail.com';
  $scope.usuario.pass = '123456';
    $scope.mensajeLogin = {};
  $scope.mensajeLogin.ver = false;
  
console.info("isjasj...",factoryUsuario.Logueado);

if (!factoryUsuario.Logueado)
      $scope.logueado = 'no';
    else $scope.logueado = 'si';


  $scope.login = function() {
        var corte = $scope.usuario.email.indexOf('@');
        var nombre= $scope.usuario.email.substring(0,corte);


    $scope.errorLogin = {};
    $scope.errorLogin.ver = false;
    firebase.auth().signInWithEmailAndPassword($scope.usuario.email, $scope.usuario.pass)
    .then( function(resultado){

$timeout(function() {
      var user = firebase.auth().currentUser;

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
                $scope.errorLogin.mensaje = "Correo o contraseña incorrectos.";
                $scope.errorLogin.ver = true;
              break;

          }
          console.info(error.code);
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
  $scope.usuario.email = "algo1@gmail.com";
  $scope.usuario.pass = '123456';


        var corte = $scope.usuario.email.indexOf('@');
        var nombre= $scope.usuario.email.substring(0,corte);
  $scope.usuario.nombre = nombre;
  $scope.mensajeLogin = {};

  $scope.Registrar = function (){
    $scope.mensajeLogin.ver = false;
    try
    {
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


    factoryUsuario.Logueado=$scope.usuario;
   console.info("regfis....",factoryUsuario.Logueado);

          }, function(error) {
            // An error happened.
          });
        });

  var alertPopup = $ionicPopup.alert({
         title: 'REGISTRADO'
      });
      alertPopup.then(function(res) {

         $state.go('app.gallery');
      });

 
      

      },function (error){
        $timeout(function() {
            switch (error.code)
            {
              case "auth/email-already-in-use":
                  $scope.mensajeLogin.mensaje = "El correo ya esta registrado.";
                  $scope.mensajeLogin.ver = true;
                  $scope.mensajeLogin.estilo = "alert-danger";
                break;

            }
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
    }
  };
})