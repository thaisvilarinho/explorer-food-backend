class IngredientsService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  async insert(ingredients) {
    const ingredientsInsert = await this.ingredientsRepository.insert(ingredients);
    return ingredientsInsert;
  }

  async delete({ dish_id }) {
    const ingredientsDelete = await this.ingredientsRepository.delete({ dish_id });
    return ingredientsDelete;
  }

  async update({ dish_id, ingredientsInsert }) {
    const ingredientsUpdated = await this.ingredientsRepository.update({ dish_id, ingredientsInsert });
    return ingredientsUpdated;
  }

  async show({ dish_id }) {
    const ingredients = await this.ingredientsRepository.show({ dish_id });
    return ingredients;
  }
}

module.exports = IngredientsService;
