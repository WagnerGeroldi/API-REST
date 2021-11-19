const ProductsModel = require('../models/products')

async function get(req, res) {
    const { id } = req.params //vem pelo cabeçalho

    const obj = id ? {_id: id} : null //if ternario > padrao passar id ou nao no modelo restful

    const products = await ProductsModel.find(obj)

    res.send(products)
}

async function post(req, res) {

    const {
        name,
        brand,
        price,
    } = req.body //vem pelo corpo do site

    const product = new ProductsModel({
        name,
        brand,
        price
    })

    product.save()

    res.send({
        message: 'success',
    })

}

async function put(req, res) {
    const { id } = req.params

    /*nestes 2 metodos abaixo, procuramos retornar o produto no send, nem sempre precisa retornar o produto */
    /*nestes metodos usando o req.body, nao é obrigatório atualizar todos os dados, apenas o que o usuario desejar */
    
    const product = await ProductsModel.findOneAndUpdate({ _id: id}, req.body, { new: true})


    /* método 2 que nao atualiza o produto no retorno da funcao
    const product = await ProductsModel.findOne({_id: id}) 

    await product.updateOne(req.body) //metodo para nao precisar chamar cada item do objeto!! extremamente importante
*/
    res.send({
        message: 'success',
        product
    })
}

async function remove(req, res) {
    const { id } = req.params

    const remove = await ProductsModel.deleteOne({_id: id})

    const message = remove ? 'success' : 'error'

    res.send({
        message
    })
}


module.exports = {
    get,
    post,
    put,
    remove,
}