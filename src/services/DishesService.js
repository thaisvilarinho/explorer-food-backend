const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');
const IngredientsService = require('./IngredientsService');

class DishesService {
  constructor(dishesRepository, ingredientsRepository) {
    this.dishesRepository = dishesRepository;
    this.ingredientsService = new IngredientsService(ingredientsRepository);
  }

  async create({ name, description, category, price, ingredients, image }) {
    const dishes = await this.dishesRepository.findByName(name);

    if (dishes) {
      throw new AppError('Produto já cadastrado no sistema', 409);
    }

    const diskStorage = new DiskStorage();

    const imageFile = await diskStorage.saveFile(image);

    const dish_id = await this.dishesRepository.create({ name, description, category, price, image: imageFile });

     const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id,
        name
      }
     })

    const dish = await this.ingredientsService.insert(ingredientsInsert);

    return dish;
  }

}

module.exports = DishesService;
