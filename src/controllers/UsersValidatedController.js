const UsersRepository = require('../repositories/UsersRepository')
const AppError = require("../utils/AppError");

class UsersValidatedController {
  async index(request, response) {
    const { user } = request;

    const usersRepository = new UsersRepository();

    const checkUserExists = await usersRepository.findById({ id: user.id });

    if (checkUserExists.length === 0) {
      throw new AppError("Unauthorized", 401);
    }
    return response.status(200).json();
  }
}

module.exports = UsersValidatedController;