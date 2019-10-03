'use strict'

/** @type {typeof import('@adonisjs/lucid/src/lucid/Model')} */
const CategoriaDeReceita = use('App/Models/CategoriaDeReceita')

class CategoriaDeReceitaController {
    async index({ }) {
        const categoriaDeReceita = CategoriaDeReceita.all()

        return categoriaDeReceita
    }

    async indexById({ params }) {
        const { id } = params

        const categoriaDeReceita = await CategoriaDeReceita.find(id)

        return categoriaDeReceita
    }

    async update({ request }) {
        const id = request.only(['id'])

        const data = request.only([])

        const categoriaDeReceita = await CategoriaDeReceita
            .query()
            .where(id)
            .update(data)

        return categoriaDeReceita
    }

    async store({ request }) {
        const data = request.only(['name','date','category','value'])

        const categoriaDeReceita = await CategoriaDeReceita.create(data)

        return categoriaDeReceita
    }

    async deleteById ({ params }) {
        const { id } = params

        const categoriaDeReceita = await CategoriaDeReceita.find(id)

        const deletion = await categoriaDeReceita.delete()

        return deletion
    }
}

module.exports = CategoriaDeReceitaController