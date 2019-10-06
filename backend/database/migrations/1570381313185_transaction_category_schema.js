'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionCategorySchema extends Schema {
  up () {
    this.create('transaction_categories', (table) => {
      table.increments()
      table.integer("idOwner")
      table.string("name").notNullable()
      table.enu('type', ['in','out']).notNullable().defaultTo('out')
      table.string("icon")
      table.timestamps()
    })
  }

  down () {
    this.drop('transaction_categories')
  }
}

module.exports = TransactionCategorySchema
