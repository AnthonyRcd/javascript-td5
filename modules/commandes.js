const commandes = {
  nom: function(socket,nom) {
    let formername = socket.data.nom;
    socket.data.nom = nom;
    return `${formername} a changé de nom pour ${nom}`;
  },
  nord: function(socket){
    socket.data.coord = socket.data.coord.nord();
    socket.emit('msg', `Nouvelles coordonnées: ${socket.data.coord}`)
  },
  sud: function(socket){
    socket.data.coord = socket.data.coord.sud();
    socket.emit('msg', `Nouvelles coordonnées: ${socket.data.coord}`)
  },
  est: function(socket){
    socket.data.coord = socket.data.coord.est();
    socket.emit('msg', `Nouvelles coordonnées: ${socket.data.coord}`)
  },
  ouest: function(socket){
    socket.data.coord = socket.data.coord.ouest();
    socket.emit('msg', `Nouvelles coordonnées: ${socket.data.coord}`)
  }
};

module.exports = commandes;
