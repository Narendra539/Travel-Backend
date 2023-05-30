module.exports = (app) => {
    const Place = require("../controllers/place.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new place
    router.post("/places/", Place.create);
  
    // Retrieve all place
    router.get("/places/", Place.findAll);
  
    router.get("/places/search", Place.search);

    // Retrieve a single place with placeId
    router.get("/places/:id", Place.findOne);
  
    // Update an place with placeId
    router.put("/places/:id", Place.update);
  
    // Delete an place with placeId
    router.delete("/places/:id", Place.delete);
  
    // Create a new place
    router.delete("/places/", Place.deleteAll);
  
    app.use(router);
  };
  