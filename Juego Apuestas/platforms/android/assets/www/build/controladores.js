angular.module('App.controladores', [])

.controller('LoginCtrl', function($rootScope,$scope, $ionicPopup, $state,$cordovaVibration, $cordovaNativeAudio) {
  $rootScope.usuario = {};
  $rootScope.usuario.nombre = "";
  /*
      $cordovaNativeAudio
    .preloadSimple('music', 'audio/correcto.mp3')
    .then(function (msg) {
      console.log(msg);
      console.log("Musica");
    }, function (error) {
      console.error(error);
    });

*/
  $scope.login = function() {
      if($rootScope.usuario.nombre == ""  )
        $scope.showAlert("POR FAVOR INGRESE SU NOMBRE");
      else{
    try{
      $cordovaVibration.vibrate(150);  

  try{
     
      }catch(err){
        console.log("No es un dispositivo mobile");
      }
  //  $cordovaNativeAudio.play('music');


    }catch(err){

      console.log("No se puede vibrar" + err.message);
    }


  

        $scope.showAlert("BIENVENIDO " + $rootScope.usuario.nombre + "!" + "   "+"Elije el juego");
        
          //si le mando el nombre por paramatros necesito lo de abajo.


        /*var usuario = { "user": $scope.usuario.nombre};
        
        console.log(usuario);               // no esta reciviendo paramatros el state
        console.log("finn");               // no esta reciviendo paramatros el state



        $state.go('Trivia', usuario);

        */


//$state.go('Trivia');
$state.go('app.gallery');
      }
    };/*
      $scope.irA = function(){
        $state.go("app.gallery");
      }*/

    $scope.showAlert = function(resultado) {
      var alertPopup = $ionicPopup.alert({
         title: resultado
      });
      alertPopup.then(function(res) {
         // Custom functionality....
      });
   };




//////////////////////sonido
  //Funciones Audio:
  //audio trivia.

try{

  $cordovaNativeAudio
    .preloadComplex('correcto', 'audio/correcto.mp3', 1, 1)
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      console.error(error);
    });

  $cordovaNativeAudio
    .preloadComplex('incorrecto', 'audio/incorrecto.mp3', 1, 1)
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      console.error(error);
    });

} catch(e){"sin sonido"}
  

//audio piano.
try{

  $cordovaNativeAudio
    .preloadComplex('perro', 'audio/perro.mp3', 1, 1)
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      console.error(error);
    });

  $cordovaNativeAudio
    .preloadComplex('gato', 'audio/gato.mp3', 1, 1)
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      console.error(error);
    });

$cordovaNativeAudio
    .preloadComplex('pavo', 'audio/pavo.mp3', 1, 1)
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      console.error(error);
    });

  $cordovaNativeAudio
    .preloadComplex('caballo', 'audio/caballo.mp3', 1, 1)
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      console.error(error);
    });

$cordovaNativeAudio
    .preloadComplex('oveja', 'audio/oveja.mp3', 1, 1)
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      console.error(error);
    });

  $cordovaNativeAudio
    .preloadComplex('pato', 'audio/pato.mp3', 1, 1)
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      console.error(error);
    });





} catch(e){"sin sonido"}


//
/*

$rootScope.play = function ($algo) {
  try{
    $cordovaNativeAudio.play($algo);
  }catch(e){"sin sonido en play"}
  };
/*
  $scope.stop = function () {

    
      $cordovaNativeAudio.stop('music');

  };
  */

  //
/****FIN FUNCIONES NATIVE AUDIO****/



//////////////////////////////////////////////////////////////////////////////

// firebase
 var ref = new Firebase("https://trivia-b8a12.firebaseio.com/preguntas");


//agregagar preguntas  
  
/*
  ref.push(

{
pregunta : "11 + 5 + 9 + 3 - 5 - 6 -17 + 5",
rtas :[
{
rta: "17",
correcta: false
},
{
rta: "5",
correcta: true
},
{
rta: "12",
correcta: true
}

]
    }
    );

*/

//////// 
$scope.fireBas;
ref.once("value", function(snapshot) {
  //console.info("Datos", snapshot.val());
  
  
    $scope.fireBas = snapshot.val();
 
    
//console.log($scope.fireBas);
console.info("Datos fireBas", $scope.fireBas);


$rootScope.arrtrivia  =[]; 
for (preg in $scope.fireBas) {
   $rootScope.arrtrivia.push($scope.fireBas[preg]);
}
  });



console.info("Datos arrtrivia", $rootScope.arrtrivia);
// firebase fin


////////////////////////////////////////////////////////////////////////////




















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
