'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('idOwner').notNullable()
      table.string('name').notNullable()
      table.date('date').defaultTo(this.fn.now())
      table.integer('idTransactionCategory')
      table.decimal('value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
