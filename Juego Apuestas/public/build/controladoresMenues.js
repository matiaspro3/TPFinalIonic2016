
(function () {
    'use strict';

    angular
        .module('App')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$ionicPopover','$state','factoryUsuario','ServicioFirebase'];
    function AppController($scope, $ionicPopover,$state,$cordovaNativeAudio,factoryUsuario,ServicioFirebase) {
     


    
               

          

        $scope.items = [
      /* 
			 { state: "Ola",
                color: "#F8E548",
                icon: "ion-social-javascript",
                title: "Ola"
          	  },
*/

           { state: "grillaApuestas",
                color: "#D86B67",
                icon: "ion-social-angular",
                title: "Lista de Apuestas"
            },
            { state: "app.apostar",
                color: "#D86B67",
                icon: "ion-social-angular",
                title: "Apostar"
            },
    		 { state: "Login",
                color: "#E47500",
                icon: "ion-ionic",
                title: "Sesion"  // nombre de la opcion y  del menu cuando entro
            }, 
            { state: "Contactame",
                color: "#5AD863",
                icon: "ion-social-html5",
                title: "Contactame"
            }






        ];
//////////////////
$scope.juegos= [
       
			 
            
            {
                state: "grillaApuestas",
                color: "#AD5CE9",
                icon: "ion-social-sass",
                title: "Apuestas"
            },
            {   state: "app.grillaMias",
                color: "#3DBEC9",
                icon: "ion-social-css3",
                title: "Mis Apuestas"
            },
            {   state: "apostar",
                color: "#D86B67",
                icon: "ion-social-angular",
                title: "Apostar"
            },
            {   state: "datos",
                color: "#F8E548",
                icon: "ion-social-javascript",
                title: "Mis Datos"
            }
            
    		

        ];


/////////////
        $scope.exitApp = function () {
            ionic.Platform.exitApp();
        };

        $ionicPopover.fromTemplateUrl('templates/modals/popover.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;

        });

        $scope.abrirMenuIzq = function ($event) {
            $scope.popover.show($event);
        };
        
           $scope.openItem = function(item){
            try{				// le saco esta parte si le saco los juegos del menu
    				$state.go("app."+item.state);
    				}    
					catch(e) {$state.go(item.state);}
    			


        };
/*/****////*/////////////////
//********************************



//*///

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
    }
})();
/*/ Controloadores     /****************************************************************************************************/


(function() {
'use strict';

    angular
        .module('App')
        .controller('contolerOla', contolerOla);

    contolerOla.$inject = ['$scope', '$state'];
    function contolerOla($scope, $state,$cordovaFile) {
        //itemmm
        /*$scope.openItem = function(item){
            //$state.go('app.item', { title: item.title, icon: item.icon, color: item.color });
            		if (item.title == 'Trivia')
            		{
            $state.go('olaState');
        			}
        				else $state.go('app.item', { title: item.title, icon: item.icon, color: item.color });
        };*/
///////////////////////




////////////////////
}
})();

(function() {
'use strict';

    angular
        .module('App')
        .controller('contolerContac', contolerContac);

    contolerContac.$inject = ['$scope', '$state'];
    function contolerContac($scope, $state) {
    	$scope.irA = function(item){
    	  $state.go("app.gallery");
    	}
        //itemmm
        /*$scope.openItem = function(item){
            //$state.go('app.item', { title: item.title, icon: item.icon, color: item.color });
            		if (item.title == 'Trivia')
            		{
            $state.go('olaState');
        			}
        				else $state.go('app.item', { title: item.title, icon: item.icon, color: item.color });
        };*/

///////////
    }


 

    
})();



















//************************************************************************************************************************************/
(function() {
'use strict';

    angular
        .module('App')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$scope', '$state','factoryUsuario','ServicioFirebase','$timeout','factoryApuestas'];
    function GalleryController($scope, $state,factoryUsuario,ServicioFirebase,$timeout,factoryApuestas) {

            $scope.conectado=factoryUsuario.Logueado;

        //itemmm
        $scope.openItem = function(item){
            //$state.go('app.item', { title: item.title, icon: item.icon, color: item.color });
            	/*	if (item.title == 'Trivia')
            		{
            $state.go('olaState');
        			}
        				else $state.go('app.item', { title: item.title, icon: item.icon, color: item.color });
    		*/
    			try{
    				$state.go("app."+item.state);
    				}    
					catch(e) {$state.go(item.state);}

        };
    









///////////////////cargando apuestas

  $scope.cargandoDatos = [];
  $scope.cargandoDatosAYER = [];
  $scope.usuarioGanador = {};


 $timeout(function() {
ServicioFirebase.CargarDatos('/apuestas/')
.on('child_added',function(snapshot)
      {    $timeout(function() {
      var desafio = snapshot.val();


  if (desafio.finalizada == false ) {

var msecPerMinute = 1000 * 60;
var msecPerHour = msecPerMinute * 60;
var msecPerDay = msecPerHour * 24;

// Set a date and get the milliseconds
var date = new Date();
var dateMsec = date.getTime();

// Set the date to January 1, at midnight, of the specified year.
var date2= new Date(desafio.fechaCreacion);
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

// Display the result.
/*
console.info('actual ', date);
console.info('desa ', date2);
  console.log('vencvi' + desafio.vencimiento);
console.log(desafio.titulo +'...' + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds.");
*/
ServicioFirebase.CargarDatos('/usuario/')
.on('child_added',function(snapshot)
      {   

            if(snapshot.val().nombre == desafio.usuarioCreador.nombre)
               {
                 $scope.usuarioGanador=snapshot.val();
              }

});






//para probar si carga bien los datos mas rapido le cambio el hours por min
if (days>0 || hours>=desafio.vencimiento)
{


          var updateDesafio = {};
          updateDesafio['/apuestas/' + desafio.titulo + '/finalizada'] = true;
          updateDesafio['/usuario/' + desafio.usuarioCreador.nombre + '/saldo'] = $scope.usuarioGanador.saldo +desafio.apuesta;                         
          firebase.database().ref().update(updateDesafio);
         $scope.cargandoDatosAYER.push(snapshot.val());
     
}


else { 
                $scope.cargandoDatos.push(snapshot.val());
    }


}
//cargo los finalizado =] TRue
    else $scope.cargandoDatosAYER.push(snapshot.val());
})

 
}
)  
});factoryApuestas.Apuestas=$scope.cargandoDatos;
factoryApuestas.ApuestasAyer=$scope.cargandoDatosAYER;
//console.info('ayer',factoryApuestas.ApuestasAyer);
//console.info('hoy',factoryApuestas.Apuestas);


/////////////////////////fin cargando apuestas


























    }
})();
(function () {
	'use strict';

	angular
		.module('App')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$ionicPopup', 'Modals', 'Model','factoryUsuario','factoryApuestas'];
	function HomeController($scope, $ionicPopup, Modals, Model,factoryUsuario,factoryApuestas) {

		$scope.users = [];

	$scope.userHome=factoryUsuario.Logueado;

           console.info("userHome",factoryUsuario.Logueado);
          console.info("userHome",$scope.userHome);
       //      console.info(",userHome.imail",$scope.userHome.email);
		$scope.Saludo = function () {
			$ionicPopup.alert({
				title: 'Hola Profe!',
				template: 'Esta es la mejor aplicacion de todas!!',
     		cssClass: 'animated bounceInDown'
			});
		};
		
		$scope.mostrarRankin = function () {
			Model.Users.getAll().then(function (users) {
				$scope.users = angular.copy(users);
			});
			Modals.openModal($scope, 'templates/modals/users.html', 'animated rotateInDownLeft');
		};
		
		$scope.closeModal = function () {
			Modals.closeModal();
			$scope.users = [];
		
		};
		




		//Center content
		//1. http://codepen.io/mhartington/pen/gcHeL
		//2. http://codepen.io/anon/pen/meQJvp
	}
})();
(function() {
'use strict';

    angular
        .module('App')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory'];
    function ItemController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory) {
        
        $scope.item = {
            title: $stateParams.title,
            icon: $stateParams.icon,
            color: $stateParams.color
        };
        
        if (!$scope.item.color) {
            $ionicViewSwitcher.nextDirection('back');
            $ionicHistory.nextViewOptions({
                disableBack: true,
                disableAnimate : true,
                historyRoot  : true
            });
            $state.go('app.gallery');
        }
    }
})();