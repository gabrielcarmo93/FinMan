'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @type {typeof import('@adonisjs/lucid/src/lucid/Model')} */
const TransactionCategory = use('App/Models/TransactionCategory')

class TransactionCategoryController {
  
  async index ({ }) {
    const transactionCategory = TransactionCategory.all()

    return transactionCategory
  }

  async indexById({ params }) {
    const { id } = params

    const transactionCategory = await TransactionCategory.find(id)

    return transactionCategory
  }

  async store ({ request, response }) {
    const data = request.only(['idOwner','name','type','icon'])

    const transactionCategory = await TransactionCategory.create(data)

    return transactionCategory
  }

  async show ({ params }) {
    const { idOwner } = params

    const transactionCategory = await TransactionCategory.query().where('idOwner', idOwner).orderBy('name', 'asc').fetch()

    return transactionCategory
  }

  async update({ request }) {
    const id = request.only(['id'])

    const data = request.only(['idOwner','name','type','icon'])

    const transactionCategory = await TransactionCategory
        .query()
        .where(id)
        .update(data)

    return transactionCategory
  }

  async destroy ({ params }) {
    const { id } = params

    const transactionCategory = await TransactionCategory.find(id)

    const deletion = await transactionCategory.delete()

    return deletion    
  }
}

module.exports = TransactionCategoryController
