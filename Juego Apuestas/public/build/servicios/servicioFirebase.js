angular.module('App.servicioFirebase', [])
.service('ServicioFirebase', function() {
    this.Nombre = "Servicio Firebase";
    this.Guardar = Guardar;
    this.Buscar = Buscar;
    this.Editar = Editar;
    this.Cargar = Cargar;
    this.EditarUser=EditarUser;
    this.CargarDatos=CargarDatos;

    function Guardar(ruta, objeto){
      return firebase.database().ref(ruta).set(objeto);
    }

    function Editar(objeto){
      return firebase.database().ref().update(objeto);
    }
function EditarUser(ruta,objeto){
      return firebase.database().ref(ruta).update(objeto);
    }
    function Buscar(ruta){
      var datos = [];
      var referencia = firebase.database().ref(ruta);
      referencia.on('child_added', function (snapshot) 
      {
        datos.push(snapshot.val());
      });

      return datos;
    }

    function Cargar(ruta){
      var referencia = firebase.database().ref(ruta);
      referencia.on('value', function (snapshot) 
      {
        return snapshot.val();
      });
    }


    function CargarDatos(ruta){
      
        return firebase.database().ref(ruta);
          
    
    }





  })//Cierra Servicio
