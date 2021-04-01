const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Categoria = require('../model/Categoria');

/*************************************************
 * Lista todas as categorias
 * GET /categorias
 */
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find({ status: 'ativo' }).sort({
      nome: 1,
    });
    res.json(categorias);
  } catch (err) {
    res.status(500).send({
      errors: [{ message: 'Não foi possível obter as categorias!' }],
    });
  }
});

/*******************************
 * Lista uma categoria pelo id
 * GET /categorias/:id
 ******************************/
router.get('/:id', async (req, res) => {
  try {
    const categorias = await Categoria.findById(req.params.id);
    res.json(categorias);
  } catch (err) {
    res.status(500).send({
      errors: [
        {
          message: `Não foi possível obter a categorias com o id ${req.params.id}!`,
        },
      ],
    });
  }
});

/*******************************
 * Inclui uma nova categoria
 * POST /categorias
 ******************************/
const validaCategoria = [
  check('nome', 'Nome da Categoria é obrigatório').not().isEmpty(),
  check('status', 'Informe um status válido para a categoria.').isIn([
    'ativo',
    'inativo',
  ]),
];

router.post('/', validaCategoria, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  //Verifica se a categoria já existe
  const { nome } = req.body;
  let categoria = await Categoria.findOne({ nome });
  if (categoria)
    return res.status(200).json({
      errors: [{ message: 'Ja existe uma categoria com o nome informado!' }],
    });
  try {
    let categoria = new Categoria(req.body);
    await categoria.save();
    res.send(categoria);
  } catch (err) {
    return res.status(500).json({
      errors: [{ message: `Erro ao salvar a categoria: ${err.message}` }],
    });
  }
});

/*******************************
 * Remove uma categoria
 * DELETE /categorias/:id
 ******************************/

router.delete('/:id', async (req, res) => {
  await Categoria.findByIdAndRemove(req.params.id)
    .then((categoria) => {
      res.send({
        message: `Categoria ${categoria.nome} removida com sucesso!`,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        errors: [
          {
            message: `Não foi possível apagar a categoria com o id ${req.params.id}`,
          },
        ],
      });
    });
});

/*******************************
 * Edita uma categoria
 * PUT /categorias
 ******************************/

router.put('/', validaCategoria, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  let dados = req.body;
  await Categoria.findByIdAndUpdate(
    req.body._id,
    {
      $set: dados,
    },
    { new: true },
  ).then((categoria) => {
    res
      .send({ message: `Categoria ${categoria.nome} alterada com sucesso!` })
      .catch((err) => {
        return res.status(500).send({
          errors: [
            {
              message: `Não foi possível alterar a categoria com o id ${req.body._id}`,
            },
          ],
        });
      });
  });
});

module.exports = router;
