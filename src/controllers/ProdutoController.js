import Produto from "../models/Produto"
import Foto from "../models/Foto"

class ProdutoController{
  async index(req, res) {
    const produtos = await Produto.findAll({
      attributes:["id","nome","marca","descricao","quantidade","custo","preco"],
      include: {
        model: Foto,
        attributes: ["url","filename"]
      }

    })
    res.json(produtos)
  }

  async store(req, res) {
    try {
      const produto = await Produto.create(req.body)

      return res.json(produto)
    }catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      })
    }
  }

  async show(req, res) {
    try {
      const {id} = req.params;

      if(!id) {
        return res.status(400).json({
          errors: ["Faltando ID"],
        });
      }

      const produto = await Produto.findByPk(id, {
        attributes:["id","nome","marca","descricao","quantidade","custo","preco"],
        include: {
          model: Foto,
          attributes: ["url","filename"]
        },
      });

      if(!produto) {
        return res.status(400).json({
          errors: ["Produto não existe"],
        });
      }

      return res.json(produto)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }

  }

  async delete(req, res) {
    try {
      const {id} = req.params;

      if(!id) {
        return res.status(400).json({
          erros: ["Faltando ID"],
        });
      }

      const produto = await Produto.findByPk(id)

      if(!produto) {
        return res.status(400).json({
          erros: ["Produto não existe"],
        });
      }
      await produto.destroy()
      return res.json({
        apagado: true,
      })
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async update(req, res) {
    try {
      const {id} = req.params;

      if(!id) {
        return res.status(400).json({
          erros: ["Faltando ID"],
        });
      }

      const produto = await Produto.findByPk(id)

      if(!produto) {
        return res.status(400).json({
          erros: ["Produto não existe"],
        });
      }

     const produtoAtualizado = produto.update(req.body)

      return res.json(produtoAtualizado)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

}
export default new ProdutoController()
