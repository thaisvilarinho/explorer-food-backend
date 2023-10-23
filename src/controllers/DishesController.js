const DishesRepository = require('../repositories/DishesRepository');
const DishesService = require('../services/DishesService');
const IngredientsRepository = require('../repositories/IngredientsRepository');

class DishesController {
  async create(request, response) {
    const { name, description, category, price, ingredients } = request.body;
    const image = request.file.filename;

    const dishesRepository = new DishesRepository();
    const ingredientsRepository = new IngredientsRepository();
    const dishesService = new DishesService(dishesRepository, ingredientsRepository);

    await dishesService.create({ name, description, category, price, ingredients, image });

    response.status(201).json();
  }

  async update(request, response) {
    const { name, description, category, price, ingredients } = request.body;
    const { id } = request.params;
    const image = request.file ? request.file.filename : null

    const dishesRepository = new DishesRepository();
    const ingredientsRepository = new IngredientsRepository();
    const dishesService = new DishesService(dishesRepository, ingredientsRepository);

    const updatedDish = await dishesService.update({ id, name, description, category, price, ingredients, image });

    response.status(200).json({ updatedDish, ingredients })
  }

  async index(request, response) {
    const { search } = request.query;
    const dishesRepository = new DishesRepository();
    const ingredientsRepository = new IngredientsRepository();
    const dishesService = new DishesService(dishesRepository, ingredientsRepository);

    const dishes = await dishesService.index(search);

    response.status(200).json(dishes);

  }

  async show(request, response) {
    const { id } = request.params;

    const dishesRepository = new DishesRepository();
    const ingredientsRepository = new IngredientsRepository();
    const dishesService = new DishesService(dishesRepository, ingredientsRepository);

    const dish = await dishesService.show(id);

    response.status(200).json(dish)
  }

  async delete(request, response) {
    const { id } = request.params

    const dishesRepository = new DishesRepository();
    const ingredientsRepository = new IngredientsRepository();
    const dishesService = new DishesService(dishesRepository, ingredientsRepository);

    await dishesService.delete(id)

    response.status(204).json()
}


}

module.exports = DishesController;