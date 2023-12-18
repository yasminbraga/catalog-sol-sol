import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'

export default class CategoriesController {
  public async index({ view }: HttpContextContract) {
    try {
      const categories = await Category.all()
      return view.render('categories/index', { categories: categories.map((i) => i.toJSON()) })
    } catch (error) {
      console.error(error)
    }
  }
  public async create({ view }: HttpContextContract) {
    return view.render('categories/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = await request.validate(CreateCategoryValidator)

    try {
      await Category.create({ name })
      return response.redirect().toRoute('CategoriesController.index')
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }
}
