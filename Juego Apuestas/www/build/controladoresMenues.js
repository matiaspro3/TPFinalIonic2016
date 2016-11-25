
(function () {
    'use strict';

    angular
        .module('App')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$ionicPopover','$state','factoryUsuario','ServicioFirebase'];
    function AppController($scope, $ionicPopover,$state,$cordovaNativeAudio,factoryUsuario,ServicioFirebase) {
     


    
               

          

        $scope.items = [
       
			 { state: "Ola",
                color: "#F8E548",
                icon: "ion-social-javascript",
                title: "Ola"
          	  },


           { state: "grillaApuestas",
                color: "#D86B67",
                icon: "ion-social-angular",
                title: "Lista de Apuestas"
            },
            { state: "Ola",
                color: "#D86B67",
                icon: "ion-social-angular",
                title: "Apuestas"
            },
    		 { state: "Login",
                color: "#E47500",
                icon: "ion-ionic",
                title: "Login"  // nombre de la opcion y  del menu cuando entro
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
            {   state: "grillaMisApuestas",
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
 
       $scope.exitApp = function () {
            ionic.Platform.exitApp();
        };


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

 $timeout(function() {
ServicioFirebase.CargarDatos('/apuestas/')
.on('child_added',function(snapshot)
      {    $timeout(function() {
      var desafio = snapshot.val();


      if (desafio.finalizada == false ) {
        var fecha = new Date(desafio.fechaCreacion)
        var fechaActual = new Date();
        fecha.setHours(fecha.getHours() + desafio.vencimiento);
        if (fecha > fechaActual)
        { 
                $scope.cargandoDatos.push(snapshot.val());


        }
    else
        {
        
          var updateDesafio = {};
          updateDesafio['/apuestas/' + desafio.titulo + '/finalizada'] = true;
         
          
          firebase.database().ref().update(updateDesafio);

     
          
        }
      }


})

 
}
)  
});factoryApuestas.Apuestas=$scope.cargandoDatos;


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