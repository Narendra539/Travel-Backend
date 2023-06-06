module.exports = (app) => {
  const Hotel = require("../controllers/hotel.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication");

  // Create a new hotel
  router.post("/hotels/",  Hotel.create);

  // Retrieve all hotel
  router.get("/hotels/", Hotel.findAll);

  router.get("/hotels/search", Hotel.search);

  // Retrieve a single hotel with hotelId
  router.get("/hotels/:id", Hotel.findOne);

  // Update an hotel with hotelId
  router.put("/hotels/:id", Hotel.update);

  // Delete an hotel with hotelId
  router.delete("/hotels/:id", Hotel.delete);

  // Create a new hotel
  router.delete("/hotels/",  Hotel.deleteAll);

  router.get("/hotels/famous/", Hotel.getTopRatedHotels);

  app.use(router);
};
