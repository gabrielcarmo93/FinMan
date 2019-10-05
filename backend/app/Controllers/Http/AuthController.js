'use strict'

/** @type {typeof import('@adonisjs/lucid/src/lucid/Model')} */
const User = use('App/Models/User')

class AuthController {
    async index({ }) {
        const users = User.all()

        return users
    }

    async getUserByMail({ params }) {
        const { mail } = params

        const user = await User.query().where('email', mail).fetch()

        return user
    }

    async store({ request }) {
        const data = request.only(['email','password','username'])

        const user = User.create(data)

        return user
    }

    async authenticate({ request, auth }) {
        const { email, password } = request.all()

        const token = await auth.attempt(email, password)

        return token 
    }

    async delete({ params }) {
        const { id } = params

        const user = await User.find(id)

        const deletion = user.delete()

        return deletion
    }
}

module.exports = AuthController
