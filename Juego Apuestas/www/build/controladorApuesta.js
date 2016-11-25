angular.module('App.ApuestasCtrl', [])

.controller('controlApuesta', function($scope, $stateParams, $timeout, $state, ServicioFirebase,factoryUsuario) {
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







.controller('DesafioVerCtrl', function($scope, $stateParams, $timeout, $state) {
  var usuarioLogeado = firebase.auth().currentUser;
  $scope.usuario = {};
  $scope.mensaje = {};
  $scope.mensaje.ver = false;
  var referenciaUsuario = firebase.database().ref('usuario/' + usuarioLogeado.displayName);
  referenciaUsuario.on('value', function(snapshot) {
    $timeout(function() {
      $scope.usuario = snapshot.val();
    });
  });

  $scope.desafio = {};
  $scope.desafio = JSON.parse($stateParams.desafio);
  $scope.Aceptar = function(){
      var updates = {};
      updates['/desafio/' + $scope.desafio.titulo + '/aceptada'] = true;
      updates['/desafio/' + $scope.desafio.titulo + '/usuarioAcepta'] = {nombre:$scope.usuario.nombre, correo:$scope.usuario.correo};
      updates['/desafio/' + $scope.desafio.titulo + '/fechaAceptada'] = firebase.database.ServerValue.TIMESTAMP;
      
      firebase.database().ref().update(updates);

      firebase.database().ref('reserva/' + $scope.usuario.nombre + '/' + $scope.desafio.titulo).set({
        usuario: $scope.usuario.nombre, monto: parseInt($scope.desafio.apuesta), vencido: false
      });

      $scope.mensaje.ver = true;
      $scope.mensaje.mensaje = "Has aceptado la apuesta, suerte.";
  }

  $scope.Volver = function(){
    console.info($scope.desafio);
    if ($scope.desafio.pagina == "salaDesafios")
      $state.go('app.salaDesafios');
    else if ($scope.desafio.pagina == "misDesafios")
      $state.go('app.misDesafios');
  }
})







.controller('VerificarDesafiosCtrl', function($scope, $stateParams, $timeout, $state, ServicioFirebase) {
  try
  {
    var usuarioLogeado = firebase.auth().currentUser;
    $scope.usuario = {};
    $scope.mensaje = {};
    $scope.mensaje.ver = false;
    var referenciaUsuario = firebase.database().ref('usuario/' + usuarioLogeado.displayName);
    referenciaUsuario.on('value', function(snapshot) {
      $timeout(function() {
        $scope.usuario = snapshot.val();
      });
    });

    $scope.desafio = {};
    $scope.desafio = JSON.parse($stateParams.desafio);
  }
  catch(error)
  {
    console.info("Ha ocurrido un error en VerificarDesafiosCtrl. " + error);
  }
  $scope.Aceptar = function(eleccion){
      var updateDesafio = {};
      updateDesafio['/desafio/' + $scope.desafio.titulo + '/finalizada'] = true;
      if (eleccion == 'empate')  
      {
        updateDesafio['/desafio/' + $scope.desafio.titulo + '/usuarioGanador'] = false;
        updateDesafio['/desafio/' + $scope.desafio.titulo + '/empate'] = true;
      }
      else
      {
        updateDesafio['/desafio/' + $scope.desafio.titulo + '/usuarioGanador'] = eleccion;
        updateDesafio['/desafio/' + $scope.desafio.titulo + '/empate'] = false;
      }
      
      ServicioFirebase.Editar(updateDesafio);

      var usuarioCreadorReserva = {};
      usuarioCreadorReserva['/reserva/' + desafio.usuarioCreador.nombre + '/' + desafio.titulo + '/monto'] = 0;
      usuarioCreadorReserva['/reserva/' + desafio.usuarioCreador.nombre + '/' + desafio.titulo + '/vencido'] = true;
      
      ServicioFirebase.Editar(usuarioCreadorReserva);

      var usuarioAceptaReserva = {};
      updateUsuarioReserva['/reserva/' + desafio.ususarioAcepta.nombre + '/' + desafio.titulo + '/monto'] = 0;
      updateUsuarioReserva['/reserva/' + desafio.ususarioAcepta.nombre + '/' + desafio.titulo + '/vencido'] = true;
      
      ServicioFirebase.Editar(updateUsuarioReserva);

      $scope.mensaje.ver = true;
      $scope.mensaje.mensaje = "Has aceptado la apuesta, suerte.";
  }

  $scope.Volver = function(){
    $state.go('app.verificarDesafios');
  }
});