'use strict'

/*
|--------------------------------------------------------------------------
| GastoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class GastoSeeder {
  async run () {
    Factory.blueprint("App/Models/Gasto", faker => (
        {
          name: faker.name(),
          date: faker.date({year: 2019}),
          category: faker.integer({ min: -20, max: 20 }),
          value: faker.floating({ min: 0, max: 1000 })
        }
      )
    )

    await Factory.model("App/Models/Gasto").createMany(5)
  }
}

module.exports = GastoSeeder
