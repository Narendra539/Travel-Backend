module.exports = (app) => {
    const Flight = require("../controllers/flight.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new flight
    router.post("/flights/", Flight.create);
  
    // Retrieve all flight
    router.get("/flights/", Flight.findAll);
  
    router.get("/flights/search", Flight.search);

    // Retrieve a single flight with flightId
    router.get("/flights/:id", Flight.findOne);
  
    // Update an flight with flightId
    router.put("/flights/:id", Flight.update);
  
    // Delete an flight with flightId
    router.delete("/flights/:id",  Flight.delete);
  
    // Create a new flight
    router.delete("/flights/", Flight.deleteAll);
  
    app.use(router);
  };
  