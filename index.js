const express = require('express');
require('dotenv').config(); // Carrega as "variáveis de ambiente"
const InicializaMongoServer = require('./config/Db');
//Definindo as rotas da aplicação
const rotasCategoria = require('./routes/Categoria');
const rotasRestaurante = require('./routes/Restaurante');
const rotaUpload = require('./routes/Upload');

//Inicializamos o servidor MongoDB
InicializaMongoServer();
const app = express();

// Removendo por segurançã
app.disable('x-powered-by');

//Porta Default
const PORT = process.env.PORT;

//Middleware do Express
app.use(function (req, res, next) {
  //Em produção, remova o * e atualize com o dominio/ip do seu app
  res.setHeader('Access-Control-Allow-Origin', '*');
  //Cabeçalhos que serão permitidos
  res.setHeader('Access-Control-Allow-Headers', '*');
  //Exemplo: res.setHeader('Access-Control-Allow-Headers', 'Content-type, Accept, access-token');
  // Métodos que serão permitidos
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET , POST, PUT, DELETE, OPTIONS, PATCH',
  );
  next();
});

//Parse conteúdo JSON
app.use(express.json());

app.get('/', (req, res) => {
  const idiomas = req.headers['accept-language'];
  res.json({
    mensagem: 'API iComida 100% funcional! 👏',
    versao: '1.0.1',
  });
});
/* Rotas da Categoria */
app.use('/categorias', rotasCategoria);
/* Rotas do Restaurante */
app.use('/restaurantes', rotasRestaurante);
/* Rotas do conteúdo público */
app.use('/public', express.static('public'));

/* Rota do Upload */
app.use('/upload', rotaUpload);

/* Rota para tratar excecoes - 404 (Deve ser a última rota SEMPRE )*/
app.use(function (req, res) {
  res.status(404).json({ message: `A rota ${req.originalUrl} não existe.` });
});

app.listen(PORT, (req, res) => {
  console.log(`Servidor Web iniciado na porta ${PORT}`);
});
