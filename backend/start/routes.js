'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/user', 'AuthController.store')
Route.get('/users', 'AuthController.index')
Route.get('/user/:mail', 'AuthController.getUserByMail')
Route.delete('/user/:id', 'AuthController.delete')
Route.post('/authenticate', 'AuthController.authenticate')

Route.get('/gastos', 'GastoController.index')
Route.post('/gasto', 'GastoController.store')
Route.get('/gasto/:id', 'GastoController.indexById')
Route.get('/gastosByOwner/:idOwner/:startDate/:endDate', 'GastoController.indexByOwner')
Route.put('/gasto', 'GastoController.update')
Route.delete('gasto/:id', 'GastoController.deleteById')

Route.get('/categoriaDeGastos', 'CategoriaDeDespesaController.index')
Route.post('/categoriaDeGasto', 'CategoriaDeDespesaController.store')
Route.get('/categoriaDeGasto/:id', 'CategoriaDeDespesaController.indexById')
Route.get('/categoriaDeGastoByOwner/:idOwner', 'CategoriaDeDespesaController.getByIdOwner')
Route.put('/categoriaDeGasto', 'CategoriaDeDespesaController.update')
Route.delete('categoriaDeGasto/:id', 'CategoriaDeDespesaController.deleteById')

Route.get('/categoriaDeReceitas', 'CategoriaDeReceitaController.index')
Route.post('/categoriaDeReceita', 'CategoriaDeReceitaController.store')
Route.get('/categoriaDeReceita/:id', 'CategoriaDeReceitaController.indexById')
Route.get('/categoriaDeReceitaByOwner/:idOwner', 'CategoriaDeReceitaController.getByIdOwner')
Route.put('/categoriaDeReceita', 'CategoriaDeReceitaController.update')
Route.delete('categoriaDeReceita/:id', 'CategoriaDeReceitaController.deleteById')
