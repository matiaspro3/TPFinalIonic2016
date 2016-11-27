angular.module('App.filtros', []) 
 .filter('filtroTrue', function () {
   return function (input) {
        if (!input)
        return 'Apuesta YA!!!';
    return 'Apuesta Aceptada!!';
    }

  });


  /*
  app.filter('filtroPerfil', function () {
   var perfil = {
      'admin': 'Administrador',
      'enca' : 'Encargado',
      'emple': 'Empleado',
      'clien': 'Cliente'
    }
   return function (input) {
        if (!input)
        return '';
    return perfil[input];
    
    }

});

app.filter('filtroPass', function () {
   var pass = {
      ' ': '****'
    
      
    }
   return function (input) {
        if (!input)
        return '';
    return pass[input];
    }

  });



app.filter('filtroOferta', function () {
   var pass = {
      
       1 : 'Prodiedad en Oferta.'    
      
    }
   return function (input) {
        if (!input)
        return 'Actualmente sin Oferta.';
    return pass[input];
    }

  });



app.filter('filtroCompra', function () {
   var pass = {
      
       1 : 'Prodiedad Comprada.'    
      
    }
   return function (input) {
        if (!input)
        return 'Actualmente displible.';
    return pass[input];
    }

  });


*/