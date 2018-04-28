var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/boletosDb");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index");
});

app.get("/registroCliente",function(req, res) {
res.render("registroCliente");
});

app.get("/cliente",function(req, res) {
res.render("clientes");
});

app.get("/registroEvento",function(req, res) {
res.render("registroEvento");
});

app.get("/evento",function(req, res) {
res.render("eventos");
});

app.get("/iniciarSesion",function(req, res) {
res.render("iniciarSesion");
});

//Indica a express explicitamente donde se guardan Css
app.use(express.static("public"));
app.set("view engine","ejs");

//---------CLIENTES--------
// Esquema de clientes
var clienteSchema = new mongoose.Schema({
   nombre: String,
   apellido: String,
   correo: String
});

var Cliente = mongoose.model("Cliente", clienteSchema);




 /*Campground.create(
      {
          name: "Morelia ciudad de Cantera",         
      },
      function(err, campground){
       if(err){
           console.log(err);
       } else {
           console.log("NEWLY CREATED CAMPGROUND: ");
           console.log(campground);
       }
     });*/

    


//Mostrar todos los clientes
app.get("/clientes", function(req, res){
    // Obtener clientes de la base de datos
    Cliente.find({}, function(err, todosclientes){
       if(err){
           console.log(err);
       } else {
          res.render("clientes",{clientes:todosclientes}); 
       }
    });
});

//Agregar un cliente a la BD desde formulario de registroCliente
app.post("/clientes", function(req, res){
    // Obtener datos del formulario
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var correo = req.body.correo;
    //Se agrega la info anterior en un objeto
    var nuevoCliente = {nombre: nombre, apellido: apellido, correo: correo}
    // Crear un nuevo cliente en la BD
    Cliente.create(nuevoCliente, function(err, recienCreado){
        if(err){
            console.log(err);
        } else {
            //Regresa a pag registroCliente
            res.redirect("/clientes");
        }
    });
});

//---------EVENTOS--------
//Esquema para Eventos
var eventoSchema = new mongoose.Schema({
   nombreEvento: String,
   imagen: String,
   fechaHora: String,
   descripcion: String
});

var Evento = mongoose.model("Evento", eventoSchema);

//Mostrar todos los eventos
app.get("/eventos", function(req, res){
    // Obtener eventos de la base de datos
    Evento.find({}, function(err, todoseventos){
       if(err){
           console.log(err);
       } else {
          res.render("eventos",{eventos:todoseventos}); 
       }
    });
});

//Agregar un evento a la BD desde formulario de registroEvento
app.post("/eventos", function(req, res){
    // Obtener datos del formulario
    var nombreEvento = req.body.nombreEvento;
    var imagen = req.body.imagen;
    var fechaHora = req.body.fechaHora;
    var descripcion = req.body.descripcion;
    //Se agrega la info anterior en un objeto
    var nuevoEvento = {nombreEvento: nombreEvento, imagen: imagen, fechaHora: fechaHora,descripcion: descripcion}
    // Crear un nuevo evento en la BD
    Evento.create(nuevoEvento, function(err, recienCreado){
        if(err){
            console.log(err);
        } else {
            //Regresa a pag eventos
            res.redirect("/eventos");
        }
    });
});



//NEW - show form to create new campground
//app.get("/campgrounds/new", function(req, res){
  // res.render("new.ejs"); 
//});

// SHOW - shows more info about one campground
/*app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})*/





//Incluir paquete express en proyecto
/*var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

//Abrir una conexion a la base de datos
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));*/



//Crea esquema
/*var clienteSchema = new mongoose.Schema({
nombre : String,
apellido : String,
correo : String
});

var Cliente = mongoose.model("Cliente", clienteSchema);

//Agregar nuevo Cliente
 /*var kary = new Cliente ({
  nombre: "Kary",
  apellido: "Rodriguez",
  correo: "karya@gmail.com"
});

//Guardar en DB
 kary.save(function(err,cliente){
  if (err){
    console.log("Informacion no guardada");
  } else {
    console.log("Informacion guardada en la Base de datos");
    console.log(cliente);
  }
 });*/

 /*Cliente.create({
  nombre: "Zai",
  apellido: "Alva",
  correo: "zai.alva@gmail.com"
 }, function(err, cliente){
  if (err){
    console.log("Informacion no guardada");
  } else {
    console.log("Informacion guardada en la Base de datos");
    console.log(cliente);
  }
 });

 Cliente.find({}, function(err,clientes){
  if (err){
    console.log("Informacion no encontrada");
    console.log(err); 
  } else {
    console.log("Todos los clientes son: ");
    console.log(clientes);
  }

 });*/

/*app.get("/",function(req,res) {
res.render("index");  
//res.send("Bienvenido a la pag principal")
});

/*app.get("/registroEvento",function(req, res) {
res.render("registroEvento");
});*/

/*app.get("/mostrarUsuarios",function(req, res) {
//Obtener Clientes de la DB
Cliente.find({}, function(err,todosclientes){
  if (err){
    console.log(err); 
  } else {
    res.render("mostrarUsuarios",{clientes:todosclientes});
  }
  });
});


//Muestra la informacion que proviene del formulario
app.post("/mostrarEventos", function(req,res){
res.send("Agregaste un evento");
});

app.post("/mostrarUsuarios", function(req,res){
//Obtener info del formulario
res.send("Usuario creado");
});





//Muestra Clientes en Web
/*app.get("/crearUsuario", function(req,res){
  res.render("cliente",{cliente:cliente});
});*/

//Iniciar el servidor
app.listen(3000);
console.log("Servidor funcionando!!");