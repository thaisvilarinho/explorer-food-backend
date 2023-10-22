const knex = require("../database/knex");

class UsersRepository {

  async findByEmail(email) {
    const user = await knex('users').where({ email }).first();

    return user;
  }

  async findById({ id }) {
    const userId = await knex('users')
      .where({ id })
      .first()

    return userId
  }

  async create({ name, email, password }) {
    const userId = await knex("users").insert({
      name,
      email,
      password
    })

    return { id: userId };
  }

  async update({ id, name, email, password }) {
    const userUpdated = await knex("users").update({
      name: name,
      email: email,
      password: password,
      updated_at: knex.raw('DATETIME("now")'),
    }).where("id", id)
    
    return userUpdated;
  }
}

module.exports = UsersRepository;