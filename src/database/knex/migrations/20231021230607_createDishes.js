exports.up = knex => knex.schema.createTable('dishes', table => {
  table.increments('id')
  table.text('name').notNullable();
  table.text('description').notNullable();
  table.float('price').notNullable();
  table.text('image');

  table
  .enum("category", ["meal", "dessert", "drink"], { useNative: true, enumName: "categories" })
  .notNullable().default('meal');

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable('dishes')