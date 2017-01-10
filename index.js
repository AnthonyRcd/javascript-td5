//Etape 1

/*var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname +'/html/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  })
  socket.on('disconnect', function(){
    console.log('user disconnected')
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
*/

//Etape 2

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname +'/html/index.html');
});

const Coord = require('./modules/Coord.js');
const Monde = require('./modules/Monde.js')
const commandes = require('./modules/commandes.js')

const monde = new Monde();

io.on('connection', function(socket){
  socket.data = {
    nom : "Anonymous",
    coord: new Coord()
  };
  console.log('a user connected:',socket.data.nom);
  socket.emit('msg', `Vous vous situez à la coordonnée ${socket.data.coord}`)
  socket.on('cmd', function(cmd){ // exemple : cmd = "nom Luffy"
    let nargs = cmd.split(" ");
    const commandeName = nargs[0]; // exemple : commandeName = "nom"
    const commandeArguments = nargs.slice(1); // exemple : commandeArguments = ["Luffy"]
    if(commandes[commandeName]){
      const msg = commandes[commandeName](socket,...commandeArguments); // ... est appelé opérateur de décomposition : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Op%C3%A9rateur_de_d%C3%A9composition
      socket.emit('msg', "Commande bien reçue");
      if(msg){
        io.emit('msg', msg);
      }
    } else {
      console.log("La commande n'existe pas !");
      socket.emit('msg', "La commande n'existe pas !");
    }
  });

  socket.on('disconnect', function(){
    console.log('user disconnected')
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
