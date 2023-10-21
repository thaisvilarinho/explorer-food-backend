const { compare } = require('bcryptjs');
const { sign } = require("jsonwebtoken");

const authConfig = require("../configs/auth");
const AppError = require('../utils/AppError');

class SessionsService {
  constructor(sessionsRepository){
    this.sessionsRepository = sessionsRepository;
  }

  async create({ email, password}) {
    const user = await this.sessionsRepository.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn
    });

    delete user.password;

    return { user, token };

  }
}

module.exports = SessionsService;