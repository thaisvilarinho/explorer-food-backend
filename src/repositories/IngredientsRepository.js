const knex = require('../database/knex');

class IngredientsRepository {
  async insert(ingredients) {
    const ingredientsInserted = await knex('ingredients').insert(ingredients);

    return ingredientsInserted;
  }

  async delete({ dish_id }) {
    const ingredientsDelete = await knex('ingredients')
      .where({ dish_id })
      .delete();

    return ingredientsDelete;
  }

  async update({ dish_id, ingredientsInsert }) {
    const ingredientsUpdated = await knex('ingredients')
      .where({ dish_id })
      .insert(ingredientsInsert);

    return ingredientsUpdated;
  }

  async show({ dish_id }) {
    const ingredients = knex('ingredients')
      .where({ dish_id })
      .orderBy('name');

    return ingredients;
  }
}

module.exports = IngredientsRepository;
