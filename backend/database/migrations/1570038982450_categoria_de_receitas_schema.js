'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriaDeReceitasSchema extends Schema {
  up () {
    this.create('categoria_de_receitas', (table) => {
      table.increments()
      table.string("name").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('categoria_de_receitas')
  }
}

module.exports = CategoriaDeReceitasSchema
