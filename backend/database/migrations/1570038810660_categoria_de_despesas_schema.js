'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriaDeDespesasSchema extends Schema {
  up () {
    this.create('categoria_de_despesas', (table) => {
      table.increments()
      table.string("name").notNullable()
      table.string("description")
      table.timestamps()
    })
  }

  down () {
    this.drop('categoria_de_despesas')
  }
}

module.exports = CategoriaDeDespesasSchema
