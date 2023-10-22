class IngredientsService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  async create(ingredients) {
    const ingredientsInsert = await this.ingredientsRepository.create(ingredients);
    return ingredientsInsert;
  }

  async delete({ dish_id }) {
    await this.ingredientsRepository.delete({ dish_id });

    const ingredientsAfterDelete = await this.ingredientsRepository.show({ dish_id });
    const allDeleted = ingredientsAfterDelete.length === 0;

    return allDeleted;
  }

  async show({ dish_id }) {
    const ingredients = await this.ingredientsRepository.show({ dish_id });
    return ingredients;
  }
}

module.exports = IngredientsService;
