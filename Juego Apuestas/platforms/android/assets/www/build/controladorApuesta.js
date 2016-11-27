angular.module('App.ApuestasCtrl', [])

.controller('controlApuesta', function($scope, $ionicPopup,$stateParams, $timeout, $state, ServicioFirebase,factoryUsuario,factoryApuestas) {
    $scope.desafio = {};

 $scope.usuario = factoryUsuario.Logueado;

 console.info("user logueado en apuesta...",$scope.usuario);


  
        $scope.usuario = factoryUsuario.Logueado;

    $scope.desafio = {};
   // $scope.desafio.apuesta = 10;
   // $scope.desafio.vencimiento = 1;
 
  
  



  $scope.Guardar = function(){
    try
    {
      var fecha = firebase.database.ServerValue.TIMESTAMP;
      var desafio = {
        titulo: $scope.desafio.titulo,
        descripcion: $scope.desafio.descripcion,
        apuesta: $scope.desafio.apuesta,
        vencimiento: $scope.desafio.vencimiento,
        aceptada: false,
        finalizada: false,       
        usuarioCreador: {nombre:$scope.usuario.nombre, email:$scope.usuario.email},
        usuarioAcepta: {nombre:false, email:false},
        fechaCreacion: fecha
      };

      ServicioFirebase.Guardar('apuestas/' + $scope.desafio.titulo, desafio);

                           var saldoApuesta=parseInt($scope.desafio.apuesta);
                           var saldoAnterior =parseInt($scope.usuario.saldo);
                           var saldoTotal= saldoAnterior-saldoApuesta;
                            $scope.usuario.saldo= saldoTotal;
    
ServicioFirebase.EditarUser('usuario/' + $scope.usuario.nombre,$scope.usuario);

/////////////////cargando apuesta en factory


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

/////////////////






 $state.go('app.gallery');
/*
        var user = firebase.auth().currentUser;
          console.info('user...',user);
        user.updateProfile({
                 saldo: saldoTotal
              }).then(function() {
                console.info('saldoo...',saldoTotal);
              $state.go('app.gallery');
              }, function(error) {
             
              });

    
*/
      //$state.go('app.salaDesafios');
    }
    catch(error)
    {
      console.info("Ha ocurrido un error al Guardar un desafio. " + error);

      var alertPopup = $ionicPopup.alert({
         title: "NOOO ingrese simbolos como el PUNTO. "
      });
      alertPopup.then(function(res) { 
         

      });



    }
  }
})




.controller('controlGrillaApuesta', function($scope, $state, $timeout,factoryUsuario,factoryApuestas,ServicioFirebase) {


  $scope.usuario = factoryUsuario.Logueado;
$scope.volver= false;

  




$scope.desafios = factoryApuestas.Apuestas;

console.info('apuestas...', $scope.desafios);
 


  $scope.DesaFin = function(){

$scope.desafios = factoryApuestas.ApuestasAyer;
$scope.volver= true;
 

  };


  $scope.DesaHoy = function(){

$scope.desafios = factoryApuestas.Apuestas;
$scope.volver= false;
 

  };


 

  $scope.NuevoDesafio = function(){
    $state.go('app.apostar');
  };

  $scope.VerDesafio = function(apt){
   var param = JSON.stringify(apt);
    $state.go('app.verApuesta', {apuesta:param});
  };



})





.controller('controlVerApuesta', function($scope, $stateParams, $timeout, $state,factoryUsuario) {
  
  $scope.usuario = factoryUsuario.Logueado;
$scope.mensaje = {};

  $scope.desafio = {};
  $scope.desafio = JSON.parse($stateParams.apuesta);

/*
console.log($scope.usuario.nombre);
 console.log($scope.usuario.saldo);
 console.log($scope.desafio.apuesta);
 */ $scope.Aceptar = function(){
      var updates = {};
      updates['/apuestas/' + $scope.desafio.titulo + '/aceptada'] = true;
      updates['/apuestas/' + $scope.desafio.titulo + '/apuesta'] = $scope.desafio.apuesta*2;
      updates['/apuestas/' + $scope.desafio.titulo + '/usuarioAcepta'] = {nombre:$scope.usuario.nombre, correo:$scope.usuario.email};
      updates['/usuario/'  + $scope.usuario.nombre + '/saldo'] = $scope.usuario.saldo - $scope.desafio.apuesta;


      firebase.database().ref().update(updates);

           $scope.mensaje.ver = true;
      $scope.mensaje.mensaje = "Apuesta Aceptada.";
       $state.go('app.gallery');
  }

 
////////////tiempoooo

var msecPerMinute = 1000 * 60;
var msecPerHour = msecPerMinute * 60;
var msecPerDay = msecPerHour * 24;

// Set a date and get the milliseconds
var date = new Date();
var dateMsec = date.getTime();

// Set the date to January 1, at midnight, of the specified year.
var date2= new Date($scope.desafio.fechaCreacion);
// Get the difference in milliseconds.
var interval = dateMsec - date2.getTime();

// Calculate how many days the interval contains. Subtract that
// many days from the interval to determine the remainder.
var days = Math.floor(interval / msecPerDay );
interval = interval - (days * msecPerDay );

// Calculate the hours, minutes, and seconds.
var hours = Math.floor(interval / msecPerHour );
interval = interval - (hours * msecPerHour );

var minutes = Math.floor(interval / msecPerMinute );
interval = interval - (minutes * msecPerMinute );

var seconds = Math.floor(interval / 1000 );

//hours = $scope.desafio.vencimiento - hours;
//minutes = $scope.desafio.vencimiento -minutes;
//seconds = $scope.desafio.vencimiento/3600 -seconds;



/*
// Display the result.
console.info('actual ', date);
console.info('desa ', date2);
  console.log('vencvi' + desafio.vencimiento);
console.log(desafio.titulo +'...' + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds.");
*/



//$scope.tiempo = days + " dias, " + hours + " horas, " + minutes + " minutos, " + seconds + " segundos.";
$scope.tiempo = hours + ":" + minutes + ":" + seconds;








///////////////////////////












})


