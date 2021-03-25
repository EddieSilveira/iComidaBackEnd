const mongoose = require('mongoose');

const MONGOURI = process.env.MONGODB_URL;

const InicializaMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true, // Forçamos a utilizar o último parse
      useCreateIndex: true, // Quando necessário, utilizará a criação de índices
      useFindAndModify: false, // O padrão é encontrar os registros e alterar todos
      useUnifiedTopology: true, // Utilizamos a engine para descoberta de servidores
    });
    console.log('Conectado ao MongoDB');
  } catch (e) {
    console.error(e);
    throw e; //"Explodirá" os detalhes do erro
  }
};

module.exports = InicializaMongoServer;
