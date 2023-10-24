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
      throw new AppError('Prato já cadastrado no sistema', 409);
    }

    const diskStorage = new DiskStorage();

    const imageFile = await diskStorage.saveFile(image);

    const dish_id = await this.dishesRepository.create({ name, description, category, price, image: imageFile });
    
    const hasOnlyOneIngredient = typeof ingredients === 'string';

    const ingredientsInsert = hasOnlyOneIngredient ? {
      name: ingredients,
      dish_id
  
    } :
    ingredients.map(name => {
      return {
        dish_id,
        name
      }
    });

    await this.ingredientsService.create(ingredientsInsert);

    return dish_id;
  }

  async update({ id, name, description, category, price, ingredients, image }) {
    const dish = await this.dishesRepository.findById(id);

    if (image && image !== dish.image) {
      const diskStorage = new DiskStorage();

      await diskStorage.deleteFile(dish.image);
      image = await diskStorage.saveFile(image);
    }else {
      image = dish.image;
    }

    name = name ?? dish.name;
    description = description ?? dish.description;
    category = category ?? dish.category;
    price = price ?? dish.price;
  

    const dishWasUpdated = await this.dishesRepository.update({ id, name, description, category, price, image });

    if (!dishWasUpdated) {
      throw new AppError('Falha na atualização do Prato', 409);
    }

    const ingridentsDeleted = await this.ingredientsService.delete({ dish_id: dish.id });

    if (!ingridentsDeleted) {
      throw new AppError('Falha na atualização do Prato', 409);
    }

    const hasOnlyOneIngredient = typeof ingredients === 'string';

    const ingredientsInsert = hasOnlyOneIngredient ? {
      name: ingredients,
      dish_id: dish.id
  
    } :
    ingredients.map(name => {
      return {
        dish_id: dish.id,
        name
      }
    });

    await this.ingredientsService.create(ingredientsInsert);

    const dishUpdated = await this.dishesRepository.findById(id);

    return dishUpdated;
  }

  async index(searchTerm) {
    const results = await this.dishesRepository.index(searchTerm);
    return results;
  }

  async show(id) {
    const dish = await this.dishesRepository.show(id);

    if (!dish) {
      throw new AppError('Prato não encontrado', 404);
    }

    const ingredients = await this.ingredientsService.show({ dish_id: dish.id });

    if (!ingredients) {
      throw new AppError('Prato não encontrado', 404);
    }
    dish.ingredients = ingredients;
    return dish
  }

  async delete(id) {
    const dish = await this.dishesRepository.findById(id);

    if (!dish) {
      throw new AppError('Prato não encontrado', 404);
    }

    await this.dishesRepository.delete(id);

    const checkRemoval = await this.dishesRepository.findById(id);

    if(checkRemoval){
      throw new AppError('Falha na remoção do prato', 422);
    }
  }

}

module.exports = DishesService;
