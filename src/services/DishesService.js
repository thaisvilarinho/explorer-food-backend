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

    await this.ingredientsService.create(ingredientsInsert);

    return dish_id;
  }

  async update({ id, name, description, category, price, ingredients, image }) {
    const dish = await this.dishesRepository.findById(id);

    if (dish.image && image) {
      const diskStorage = new DiskStorage();

      await diskStorage.deleteFile(dish.image);
      image = await diskStorage.saveFile(image);
    }

    name = name ?? dish.name;
    description = description ?? dish.description;
    category = category ?? dish.category;
    price = price ?? dish.price;
    image = image ?? dish.image;

    const dishWasUpdated = await this.dishesRepository.update({ id, name, description, category, price, image });

    if(!dishWasUpdated){
      throw new AppError('Falha na atualização do produto', 409);
    }

    const ingridentsDeleted = await this.ingredientsService.delete({ dish_id: dish.id });

    if(!ingridentsDeleted){
      throw new AppError('Falha na atualização do produto', 409);
    }

    const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id: dish.id,
        name
      }
    });
    await this.ingredientsService.create(ingredientsInsert);

    const dishUpdated = await this.dishesRepository.findById(id);

    return dishUpdated;
  }

}

module.exports = DishesService;
