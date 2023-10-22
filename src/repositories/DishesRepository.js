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

  async index(searchTerm) {
    let query = knex
      .select(
        'dishes.id',
        'dishes.name as dish_name',
        'dishes.description',
        'dishes.category',
        'dishes.price',
        'dishes.image',
        'ingredients.name as ingredient_name'
      )
      .from('dishes')
      .innerJoin('ingredients', 'dishes.id', 'ingredients.dish_id');

    if (searchTerm) {
      query
        .whereLike('dishes.name', `%${searchTerm}%`)
        .orWhereLike('ingredients.name', `%${searchTerm}%`);
    }

    const results = await query;

    const groupedResults = results.reduce((acc, result) => {
      const existingDish = acc.find((dish) => dish.id === result.id);
      if (existingDish) {
        existingDish.ingredients.push(result.ingredient_name);
      } else {
        acc.push({
          id: result.id,
          dish_name: result.dish_name,
          description: result.description,
          category: result.category,
          price: result.price,
          image: result.image,
          ingredients: [result.ingredient_name],
        });
      }
      return acc;
    }, []);

    return groupedResults;
  }

  async show(id) {
    const dish = await knex
      .select(
        'dishes.id',
        'dishes.name',
        'dishes.description',
        'dishes.category',
        'dishes.price',
        'dishes.image'
      )
      .from('dishes')
      .where('dishes.id', id)
      .first();

    return dish;
  }

  async delete(id) {
    const deleted = knex('dishes')
      .where({ id })
      .delete()

    return deleted
  }

}

module.exports = DishesRepository;