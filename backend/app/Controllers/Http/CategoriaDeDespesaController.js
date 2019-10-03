'use strict'

/** @type {typeof import('@adonisjs/lucid/src/lucid/Model')} */
const CategoriaDeDespesa = use('App/Models/CategoriaDeDespesa')

class CategoriaDeReceitaController {
    async index({ }) {
        const categoriaDeDespesa = CategoriaDeDespesa.all()

        return categoriaDeDespesa
    }

    async indexById({ params }) {
        const { id } = params

        const categoriaDeDespesa = await CategoriaDeDespesa.find(id)

        return categoriaDeDespesa
    }

    async update({ request }) {
        const id = request.only(['id'])

        const data = request.only([])

        const categoriaDeDespesa = await CategoriaDeDespesa
            .query()
            .where(id)
            .update(data)

        return categoriaDeDespesa
    }

    async store({ request }) {
        const data = request.only(['name','date','category','value'])

        const categoriaDeDespesa = await CategoriaDeDespesa.create(data)

        return categoriaDeDespesa
    }

    async deleteById ({ params }) {
        const { id } = params

        const categoriaDeDespesa = await CategoriaDeDespesa.find(id)

        const deletion = await categoriaDeDespesa.delete()

        return deletion
    }
}

module.exports = CategoriaDeReceitaController