exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", column => {
      column.increments("identifier");
      column
        .string("username", 32)
        .notNullable()
        .unique();
      column.string("password", 32).notNullable();
      column.string("fullName", 128).defaultTo("");
      column.string("email", 128).defaultTo("");
      column.boolean("oAuth").defaultTo(false);
    })
    .createTable("products", column => {
      column.increments("identifier");
      column.string("name", 128).notNullable();
      column.string("productDescription", 512).defaultTo("");
      column.decimal("weight", 9, 2);
      column.decimal("length", 9, 2);
      column.decimal("width", 9, 2);
      column.decimal("height", 9, 2);
      column.decimal("value", 9, 2);
      column.string("manufacturerId", 512).defaultTo("");
      column.boolean("fragile").defaultTo(false);
      column
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("product_assets", column => {
      column.increments("identifier");
      column.string("label", 24).defaultTo("")
      column.string("url", 512).defaultTo("");
      column
        .integer("productId")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("shipments", column => {
      column.increments("identifier");
      column.date("dateShipped", 24);
      column
        .integer("productId")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      column.string("shippedTo", 512).defaultTo("");
      column.string("trackingNumber", 128).defaultTo("");
      column.string("carrierName", 128).defaultTo("");
      column.string("shippingType", 128).defaultTo("");
      column.integer("status")
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("products")
    .dropTableIfExists("product_assets")
    .dropTableIfExists("shipments")
};
