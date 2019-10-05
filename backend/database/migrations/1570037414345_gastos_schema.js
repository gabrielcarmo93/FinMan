'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GastosSchema extends Schema {
  up () {
    this.create('gastos', (table) => {
      table.increments()
      table.string("name").notNullable()
      table.date("date").defaultTo(this.fn.now())
      table.integer("category")
      table.decimal("value").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('gastos')
  }
}

module.exports = GastosSchema
