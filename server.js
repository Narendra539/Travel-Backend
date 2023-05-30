require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());
const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log('Tables created successfully.');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Itenary backend." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/booking.routes.js")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/day.routes")(app);
require("./app/routes/itenarary.routes")(app);
require("./app/routes/place.routes")(app);
require("./app/routes/flight.routes")(app);
require("./app/routes/hotel.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3200;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
