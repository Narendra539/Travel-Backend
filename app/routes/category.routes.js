module.exports = (app) => {
    const Category = require("../controllers/category.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new category
    router.post("/categories/", Category.create);
  
    // Retrieve all category
    router.get("/categories/", Category.findAll);
    router.get("/categories/search", Category.search);

    // Retrieve a single category with categoryId
    router.get("/categories/:id", Category.findOne);
  
    // Update an category with categoryId
    router.put("/categories/:id",  Category.update);
  
    // Delete an category with categoryId
    router.delete("/categories/:id", Category.delete);
  
    // Create a new category
    router.delete("/categories/", Category.deleteAll);
  
    app.use(router);
  };
  