angular.module('App.controladores', [])

.controller('LoginCtrl', function($scope, $stateParams, $timeout, $state,$ionicPopup, ServicioFirebase) {
 


  $scope.login = {};
  $scope.login.usuario = "matiasjds87@gmail.com";
  $scope.login.clave = "123456";
  $scope.logueado = 'no';
  $scope.mensajeLogin = {};
  $scope.mensajeLogin.ver = false;

        

  $scope.login = function() {
        var corte = $scope.login.usuario.indexOf('@');
        var nombre= $scope.login.usuario.substring(0,corte);


    $scope.errorLogin = {};
    $scope.errorLogin.ver = false;
    firebase.auth().signInWithEmailAndPassword($scope.login.usuario, $scope.login.clave)
    .then( function(resultado){

$timeout(function() {
      var usuario = firebase.auth().currentUser;

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
      updates['/usuario/' + usuario.displayName + '/fechaUltimoAcceso'] = firebase.database.ServerValue.TIMESTAMP;
      ServicioFirebase.Editar(updates);
  });
      $timeout(function() {
        $scope.logueado = 'si';
      
          console.log("entre");
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





  $scope.Deslogear = function (){
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
    }
    catch (error)
    {
      $scope.mensajeLogin.mensaje = "Ha ocurrido un error.";
      $scope.mensajeLogin.ver = true;
      $scope.mensajeLogin.estilo = "alert-danger";
      console.info("Ha ocurrido un error en Deslogueo(). " + error);
    }
  };

  $scope.Resetear = function (){
    try
    {
      firebase.auth().sendPasswordResetEmail($scope.login.usuario).then(function(resultado){
        $timeout(function() {
          $scope.mensajeLogin.ver = true;
          $scope.mensajeLogin.mensaje = "Email enviado.";
          $scope.mensajeLogin.estilo = "alert-success";
        });
      }).catch(function (error){
        $timeout(function() {
          $scope.mensajeLogin.ver = true;
          $scope.mensajeLogin.mensaje = "No se pudo enviar el mail, intente nuevamente.";
          $scope.mensajeLogin.estilo = "alert-danger";
        });
      });
    }
    catch (error)
    {
      $scope.mensajeLogin.mensaje = "Ha ocurrido un error.";
      $scope.mensajeLogin.ver = true;
      $scope.mensajeLogin.estilo = "alert-danger";
      console.info("Ha ocurrido un error en Resetear(). " + error);
    }
  };

  $scope.VerificarMail = function (){
    try
    {
      firebase.auth().currentUser.sendEmailVerification().then(function(resultado){
        $timeout(function() {
          $scope.cartelVerificar = true;
        });
      }).catch(function (error){
        $timeout(function() {
          $scope.mensajeLogin.ver = true;
          $scope.mensajeLogin.mensaje = "No se pudo enviar el mail, intente nuevamente.";
          $scope.mensajeLogin.estilo = "alert-danger";
        });
      });
    }
    catch (error)
    {
      $scope.mensajeLogin.mensaje = "Ha ocurrido un error.";
      $scope.mensajeLogin.ver = true;
      $scope.mensajeLogin.estilo = "alert-danger";
      console.info("Ha ocurrido un error en VerificarMail(). " + error);
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
            ionic.Platform.exitApp();
        };








/* fin controler*/})









.controller('controlerTrivia', function($ionicPlatform,$scope, $ionicPopup ,$state,$stateParams, $cordovaVibration,  $cordovaNativeAudio, $timeout, $cordovaFile) 
{

//archivo

/*
try{


  $scope.Grabar=function(){
    
      //if($ionicPlatform.isAndroid){
          $cordovaFile.checkDir(cordova.file.externalApplicationStorageDirectory, "files/"+$rootScope.usuario.nombre)
          .then(function (success) {

//$scope.showAlert("encontro el direc");
            $cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory, "files/"+$rootScope.usuario.nombre+"/Secuencia.txt", "olaaa", true)
              .then(function (success) {

                //$scope.showAlert("creo el arch 11");

              }, function (error) {

                //$scope.showAlert("erro al crealro");

              });

          }, function (error) {

            //$scope.showAlert("NO encontro el direc");
            $cordovaFile.createDir(cordova.file.externalApplicationStorageDirectory, "files/"+$rootScope.usuario.nombre, false)
            .then(function (success) {

        //      $scope.showAlert("creoo direc");
        

              $cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory, "files/"+$rootScope.usuario.nombre+"/Secuencia.txt","ola mundo cruelllll", true)
        
              .then(function (success) {

                //$scope.showAlert("creoo el arch 22");

              }, function (error) {

                
                //$scope.showAlert("error al gra arch");
              });

            }, function (error) {

          $scope.showAlert("error al crear dire");

            });

          });
      //}
  };






} catch(e){console.log("archivo faLLA");}
*/
//$scope.Grabar();

$scope.play = function ($algo) {
  try{
    $cordovaNativeAudio.play($algo);
  }catch(e){"sin sonido en play"}
  };






        // no esta reciviendo paramatros el state
         //si le mando el nombre por paramatros necesito lo de abajo.
  /*$scope.nombreUsuario =angular.fromJson($stateParams); 
  console.log($scope.nombreUsuario.user);

      console.log("finn2");               // no esta reciviendo paramatros el state
*/
/*


    $scope.showComenzar = true;
  $scope.seCargaronLosSonidos = false;
  $scope.preguntas1 = Preguntas;
  $scope.respuestas = Respuestas;
  $scope.opciones = Opciones;
  $scope.btnOp1Estado = 'clear';
  $scope.btnOp2Estado = 'clear';
  $scope.btnOp3Estado = 'clear';

  $scope.random = Math.round(Math.random() * 3); //TODO: Cambiar el random a un tanaño variable de a cuerdo a la cantidad de preguntas cargadas en firebase
*/ 

 
    $scope.showComenzar = true;




$scope.trivia = [] ;



  $scope.getPregunta = function() {
//  $scope.color=0;
 // $scope.colorAc=false;

  
$scope.cambiarColorBoton('todos',0);

    $scope.showComenzar = false;
    $scope.showPregunta = true;



//console.info("arrtrivia",$scope.trivia);
                                                                      //  cancela si toca muy rapido.
        //$scope.trivia =  angular.fromJson($scope.fireBas);

console.info("lenght",$scope.arrtrivia.length);

$scope.trivia = $scope.arrtrivia[Math.floor(Math.random() * $scope.arrtrivia.length)];
if ($scope.trivia=="")$scope.getPregunta();


console.info("trivia",$scope.trivia);



    //console.log($scope.message[0]);





  };

$scope.setRespuesta = function($opcion,btn) {
    if($opcion){
    
      try{
      $cordovaVibration.vibrate(100);  
      }
      catch(err){
        console.log("No es un dispositivo mobile");
      }
    //  $scope.cambiarColorBoton(btnApretado, 'correcto');
     // $scope.play('clickBien');
    //Le agrego un retardo para que me muestre el popUp del resultado y me muestre la próxima pregunta
    //setTimeout(function() {
      console.log(btn);
      $scope.cambiarColorBoton(btn,1);
         $scope.play('correcto');
     $scope.showAlert("CORRECTO!");
       


          // }, 700);  
    }


    else{$scope.color=2;
      try{
        var patron = [100, 100, 100, 100];
        $cordovaVibration.vibrate(patron); 
      }catch(err){
        console.log("No es un dispositivo mobile");
      }
 //     $scope.cambiarColorBoton(btnApretado, 'incorrecto');
/*
      try{
      $scope.play('clickMal');
      }catch(err){
        console.log("No es un dispositivo mobile");
      }
*/
         //$scope.showAlert("INCORRECTO!", btnApretado);
     //       $scope.play('Mal');
         $scope.cambiarColorBoton(btn,2);
           $scope.play('incorrecto');
         $scope.showAlert("INCORRECTO");
      
    }

    
  };


  $scope.cambiarColorBoton = function(btnApretado, estado) {
 //   console.log("color");
   // console.log(btnApretado);
    //console.log(estado);

      switch(btnApretado){
        case 'bt1':
          $scope.colorbt1 = estado;
          console.log("color1");
        break;
        case 'bt2':
         $scope.colorbt2 = estado;
         console.log("color2");
        break;
        case 'bt3':
          $scope.colorbt3 = estado;
       console.log("color3");
        break;
        case 'todos' :

        $scope.colorbt1=0;
        $scope.colorbt2=0;
        $scope.colorbt3=0;
       console.log("colorTOdos"); 
        break;

        default:
       console.log("colordefe");
        break;
      }
  }

/*
  $scope.setRespuesta = function(idOpcion, Respuesta, btnApretado) {
    if(1 == 1){
      try{
      $cordovaVibration.vibrate(100);  
      }catch(err){
        console.log("No es un dispositivo mobile");
      }
      $scope.cambiarColorBoton(btnApretado, 'correcto');
      $scope.play('clickBien');
    //Le agrego un retardo para que me muestre el popUp del resultado y me muestre la próxima pregunta
    setTimeout(function() {
      $scope.showAlert("CORRECTO!", btnApretado);
      }, 700);  
    }
    else{
      try{
        var patron = [100, 100, 100, 100];
        $cordovaVibration.vibrate(patron); 
      }catch(err){
        console.log("No es un dispositivo mobile");
      }
      $scope.cambiarColorBoton(btnApretado, 'incorrecto');

      try{
      $scope.play('clickMal');
      }catch(err){
        console.log("No es un dispositivo mobile");
      }

      setTimeout(function() {
        $scope.showAlert("INCORRECTO!", btnApretado);
      }, 700);
    }
  };


  $scope.cambiarColorBoton = function(btnApretado, estado) {
  switch(btnApretado){
        case 'btnOp1':
          $scope.btnOp1Estado = estado;
        break;
        case 'btnOp2':
          $scope.btnOp2Estado = estado;
        break;
        case 'btnOp3':
          $scope.btnOp3Estado = estado;
        break;
        default:
        break;
      }
  }
*/
  $scope.showAlert = function(resultado, $btn) {
  
      var alertPopup = $ionicPopup.alert({
         title: resultado,
         okText: "SIGUIENTE"
      });

      alertPopup.then(function(res) {
      //   $scope.cambiarColorBoton($btn,0);
         $scope.getPregunta();     

        //vuelvo a poner el boton en el color por default
     //   $scope.cambiarColorBoton(btnApretado, 'clear'); 
        //recargo la variable random para que se recargue la siguiente pregunta
       //  $scope.random = Math.round(Math.random() * 2); 
      });
     };
/****FIN FUNCIONES NATIVE AUDIO****/

})

.factory("Base", function($firebaseArray) {
  var itemsRef = new Firebase('https://trivia-b8a12.firebaseio.com/');
  return itemsRef;
})
//*************************************************************************************
    //servicios


 




/*********************************************************/
/*angular.module('App.firebase', [])
.factory("Preguntas", function($firebaseArray) {
  var itemsRef = new Firebase('https://trivia-b8a12.firebaseio.com/');
  return $firebaseArray(itemsRef.child('preguntas'));
})

.factory("Opciones", function($firebaseArray) {
  var itemsRef = new Firebase('https://triviaionic.firebaseio.com/');
  return $firebaseArray(itemsRef.child('opciones'));
})

.factory("Respuestas", function($firebaseArray) {
  var itemsRef = new Firebase('https://triviaionic.firebaseio.com/');
  return $firebaseArray(itemsRef.child('respuestas'));
});
*////************************************************************************************************************ 

.controller('controlerPiano', function( $scope ,$cordovaVibration,  $cordovaNativeAudio) 
{

   //funciona joya guardando un string
/*

$scopeAnimales="";

$scope.play = function ($algo) {
   $scopeAnimales=$scopeAnimales + '/'+ $algo;
    console.info('Animales tocados:',$scopeAnimales);
  try{
  $cordovaNativeAudio.play($algo);
   var patron = [100, 100, 100, 100,100];
   $cordovaVibration.vibrate(patron); 
  //$scopeAnimales=$scopeAnimales + '/'+ $algo;   
 console.info('Animales tocados:',$scopeAnimales);
  }catch(e)

  { console.info('No es un CElular');}


  };

*/


$scopeAnimales=[];

$scope.play = function ($algo) {
   
   $scopeAnimales.push($algo);
    console.info('Animales array:',$scopeAnimales);

  try{
  $cordovaNativeAudio.play($algo);
   var patron = [100, 100, 100, 100,100];
   $cordovaVibration.vibrate(patron); 
  //$scopeAnimales=$scopeAnimales + '/'+ $algo;   
 console.info('Animales tocados:',$scopeAnimales);
  }catch(e)

  { console.info('No es un CElular');}


  };
 



$scope.resetMelo=function(){

$scopeAnimales=[];


 console.info('Animales array Esta vacio???:',$scopeAnimales);
}


$scope.playall = function () {
  
    try{ 
        if ($scopeAnimales.length!=0)

        {
      var patron = [400, 300, 200,100,200, 300, 400];
       $cordovaVibration.vibrate(patron); 
   
          angular.forEach($scopeAnimales,function(value, key) 
            {
            $cordovaNativeAudio.play(value);
              }
            );
  
   
        }

      }catch(e)  { console.info('No es un CElular');}

        console.info('Animales A reproducir:',$scopeAnimales);
};


    
  



 
})
