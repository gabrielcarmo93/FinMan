'use strict'

/** @type {typeof import('@adonisjs/lucid/src/lucid/Model')} */
const Gasto = use('App/Models/Gasto')

class GastoController {
    async index({ }) {
        const gastos = Gasto.all()

        return gastos
    }

    async indexById({ params }) {
        const { id } = params

        const gasto = await Gasto.find(id)

        return gasto
    }

    async update({ request, params }) {
        const id = request.only(['id'])

        const data = request.only(['name','date','category','type','value','idOwner'])

        const gasto = await Gasto
            .query()
            .where(id)
            .update(data)

        return gasto
    }

    async store({ request }) {
        const data = request.only(['name','date','category','type','value','idOwner'])

        const gasto = await Gasto.create(data)

        return gasto
    }

    async deleteById ({ params }) {
        const { id } = params

        const gasto = await Gasto.find(id)

        const deletion = await gasto.delete()

        return deletion
    }

    async indexByOwner ({ params }) {
        const { idOwner, startDate, endDate } = params
        
        const gastos = await Gasto.query().where('idOwner', idOwner).where('date','>=',startDate).where('date','<=',endDate).orderBy('date', 'desc').fetch()

        return gastos
    }
}

module.exports = GastoController
