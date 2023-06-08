const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.booking = require("./booking.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.day = require("./day.model.js")(sequelize, Sequelize);
db.place = require("./place.model.js")(sequelize, Sequelize);
db.itenarary = require("./itenarary.model.js")(sequelize, Sequelize);
db.hotel = require("./hotel.model.js")(sequelize, Sequelize);
db.flight = require("./flight.model.js")(sequelize, Sequelize);
db.bookingDetails = require("./bookingDetails.model.js")(sequelize, Sequelize);


// foreign key for day
db.itenarary.hasMany(
  db.day,
  { as: "day", foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for place
db.day.hasMany(
  db.place,
  { as: "place", foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for hotel
db.day.hasMany(
  db.hotel,
  { as: "hotel", foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for flight
db.day.hasMany(
  db.flight,
  { as: "flight", foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for Itenarary
db.category.hasMany(
  db.itenarary,
  { as: "itenarary", foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for booking
db.user.hasMany(
  db.booking,
  { as: "booking", foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.itenarary.hasMany(
  db.booking,
  { as: "booking", foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session", foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user", foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for bookingDetails
db.booking.hasMany(
  db.bookingDetails,
  { as: "bookingDetails", foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
module.exports = db;
