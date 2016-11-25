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


  




$scope.desafios = factoryApuestas.Apuestas;

console.info('apuestas...', $scope.desafios);
 



 

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



  $scope.Aceptar = function(){
      var updates = {};
      updates['/apuestas/' + $scope.desafio.titulo + '/aceptada'] = true;
      updates['/apuestas/' + $scope.desafio.titulo + '/usuarioAcepta'] = {nombre:$scope.usuario.nombre, correo:$scope.usuario.email};
    
      
      firebase.database().ref().update(updates);

     

      $scope.mensaje.ver = true;
      $scope.mensaje.mensaje = "Apuesta Aceptada.";
       $state.go('app.gallery');
  }

})
