const knex = require('../database/knex');

class IngredientsRepository {
  async create(ingredients) {
    const ingredientsInserted = await knex('ingredients').insert(ingredients);

    return ingredientsInserted;
  }

  async delete({ dish_id }) {
    await knex('ingredients')
      .where({ dish_id })
      .del();
  }


  async show({ dish_id }) {
    const ingredients = knex('ingredients')
      .where({ dish_id })
      .orderBy('name');

    return ingredients;
  }
}

module.exports = IngredientsRepository;
