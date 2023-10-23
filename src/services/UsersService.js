const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError');

class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async create({ name, email, password }) {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError("Este e-mail já está em uso.", 409);
    }

    if(password.length < 6){
       throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const hashedPassword = await hash(password, 8);
    const userCreated = await this.usersRepository.create({ name, email, password: hashedPassword });

    return userCreated;

  }

  async update({ id, name, email, password, oldPassword }) {
    const user = await this.usersRepository.findById({ id })

    if (!user) {
        throw new AppError('Usuário não encontrado', 404)
    }

    name = name ?? user.name
    email = email ?? user.email

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError('Este e-mail já está em uso', 403)
    }

    if (!password && oldPassword) {
        throw new AppError('Você precisa informar a senha atual para redefini-la', 403)
    }

    if (password && !oldPassword) {
        throw new AppError('Você precisa informar a senha antiga para redefini-la', 403)
    }

    if (password && oldPassword) {
        const checkOldPassword = await compare(oldPassword, user.password)

        if (!checkOldPassword) {
            throw new AppError('Senha antiga não confere', 403)
        }
        password = await hash(password, 8)
    }

    await this.usersRepository.update({ id, name, email, password })

    return
}
}

module.exports = UsersService;