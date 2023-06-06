module.exports = (app) => {
  const Itenarary = require("../controllers/itenarary.controller.js");
  var router = require("express").Router();

  // Create a new itenarary
  router.post("/itenararies/",  Itenarary.create);

  // Retrieve all itenarary
  router.get("/itenararies/", Itenarary.findAll);
  router.get("/itenararies/category/:id", Itenarary.findItenararyByCategory);

  router.get("/itenararies/search", Itenarary.search);

  // Retrieve a single itenarary with itenararyId
  router.get("/itenararies/:id", Itenarary.findOne);

  // Update an itenarary with itenararyId
  router.put("/itenararies/:id",  Itenarary.update);

  // Delete an itenarary with itenararyId
  router.delete("/itenararies/:id",  Itenarary.delete);

  // Create a new itenarary
  router.delete("/itenararies/",  Itenarary.deleteAll);

  app.use(router);
};
