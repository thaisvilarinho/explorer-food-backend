const knex = require('../database/knex')

class DishesRepository {
  async findByName(name) {
    const dishesName = await knex('dishes')
      .where({ name })
      .first();

    return dishesName;
  }

  async create({ name, description, category, price, image }) {
    const [id] = await knex('dishes').insert({
      name,
      description,
      category,
      price,
      image
    })

    return id
  }

}

module.exports = DishesRepository;