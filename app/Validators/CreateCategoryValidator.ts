import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class CreateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string([
      rules.unique({ table: 'categories', column: 'name', caseInsensitive: true }),
    ]),
  })
  public messages: CustomMessages = {
    required: 'Campo obrigatório',
    unique: 'Categoria já cadastrada',
  }
}
