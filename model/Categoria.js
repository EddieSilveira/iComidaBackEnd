const mongoose = require('mongoose');

//Criando o Schema Categoria
const CategoriaSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      unique: true, // Criamos um indice único
    },
    status: {
      type: String,
      enum: ['ativo', 'inativo'],
      default: 'ativo',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('categoria', CategoriaSchema);
