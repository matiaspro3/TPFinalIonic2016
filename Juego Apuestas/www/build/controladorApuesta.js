angular.module('App.ApuestasCtrl', [])

.controller('controlApuesta', function($scope, $stateParams, $timeout, $state, ServicioFirebase,factoryUsuario,factoryApuestas) {
    $scope.desafio = {};

 $scope.usuario = factoryUsuario.Logueado;
 console.info("user logueado en apuesta...",$scope.usuario);


  try
    {
        $scope.usuario = factoryUsuario.Logueado;

    $scope.desafio = {};
    $scope.desafio.apuesta = 10;
    $scope.desafio.vencimiento = 1;
  }
  catch(error)
  {
    console.info("Ha ocurrido un error en controlApuesta. " + error);
  }



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
    }
  }
})




.controller('controlGrillaApuesta', function($scope, $state, $timeout,factoryUsuario,factoryApuestas,ServicioFirebase) {


  $scope.usuario = factoryUsuario.Logueado;


  
$scope.desafios = factoryApuestas.Apuestas;

console.info('apuestas...', $scope.desafios);
 
 

  $scope.NuevoDesafio = function(){
//    $state.go('app.desafio');
  };

  $scope.VerDesafio = function(desafio){
  //  var param = JSON.stringify(desafio);
    //$state.go('app.desafioVer', {desafio:param});
  };
})