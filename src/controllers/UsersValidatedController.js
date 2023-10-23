const UsersRepository = require('../repositories/UsersRepository');
const UsersService = require('../services/UsersService');

class UsersValidatedController {
  async index(request, response) {
    const { user } = request;

    const usersRepository = new UsersRepository();
    const usersService = new UsersService(usersRepository);

    await usersService.findById({ id: user.id });

    return response.status(200).json();
  }
}

module.exports = UsersValidatedController;