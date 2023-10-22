const knex = require('../database/knex')

class DishesRepository {
  async findByName(name) {
    const dishes = await knex('dishes')
      .where({ name })
      .first();

    return dishes;
  }
  
  async findById(id) {
    const dish = await knex('dishes')
      .where({ id })
      .first();
    return dish;
  }

  async create({ name, description, category, price, image }) {
    const [id] = await knex('dishes').insert({
      name,
      description,
      category,
      price,
      image
    });

    return id;
  }

  async update({ id, name, description, category, price, image }) {
    const totalDishesUpdated = await knex('dishes')
      .where({ id })
      .update({
        name,
        description,
        category,
        price,
        image,
        updated_at: knex.raw('DATETIME("now")'),
      })

    return totalDishesUpdated === 1;
  }

}

module.exports = DishesRepository;