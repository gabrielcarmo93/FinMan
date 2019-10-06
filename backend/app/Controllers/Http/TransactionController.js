'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @type {typeof import('@adonisjs/lucid/src/lucid/Model')} */
const Transaction = use('App/Models/Transaction')

class TransactionController {

  async index ({ }) {
    const transaction = Transaction.all()
    
    return transaction
  }

  async indexById({ params }) {
    const { id } = params

    const transaction = await Transaction.find(id)

    return transaction
  }

  async store ({ request }) {
    const data = request.only(['idOwner','name','date','idTransactionCategory','value'])

    const transaction = await Transaction.create(data)

    return transaction
  }

  async show ({ params }) {
    const { idOwner, startDate, endDate } = params
    
    const transaction = await Transaction.query().where('idOwner', idOwner).where('date','>=',startDate).where('date','<=',endDate).orderBy('date', 'desc').fetch()

    return transaction
  }

  async update ({ params, request, response }) {
    const id = request.only(['id'])

    const data = request.only(['idOwner','name','date','idTransactionCategory','value'])

    const transaction = await Transaction
        .query()
        .where(id)
        .update(data)

    return transaction
  }

  async destroy ({ params }) {
      const { id } = params

      const transaction = await Transaction.find(id)

      const deletion = await transaction.delete()

      return deletion
  }
}

module.exports = TransactionController
