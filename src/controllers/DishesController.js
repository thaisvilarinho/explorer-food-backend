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
    const image = request.file.filename ?? null;

    const dishesRepository = new DishesRepository();
    const ingredientsRepository = new IngredientsRepository();
    const dishesService = new DishesService(dishesRepository, ingredientsRepository);

    const updatedDish = await dishesService.update({ id, name, description, category, price, ingredients, image });

    response.status(200).json({ updatedDish, ingredients })
}

}

module.exports = DishesController;