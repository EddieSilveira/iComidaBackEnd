const express = require('express');
require('dotenv').config(); // Carrega as "variáveis de ambiente"
const InicializaMongoServer = require('./config/Db');
//Definindo as rotas da aplicação
const rotasCategoria = require('./routes/Categoria');

//Inicializamos o servidor MongoDB
InicializaMongoServer();
const app = express();
//Porta Default
const PORT = process.env.PORT;
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

app.listen(PORT, (req, res) => {
  console.log(`Servidor Web iniciado na porta ${PORT}`);
});
