module.exports = (app) => {
  const Day = require("../controllers/day.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication");

  // Create a new day
  // router.post("/days/", [authenticateRoute], Day.create);
  router.post("/days/", Day.create);

  // Retrieve all day
  router.get("/days/", Day.findAll);
  router.get("/days/search", Day.search);
  router.get("/days/itenarary/:id", Day.findDaysByItenararyId);
  router.get("/days/:dayId/itenarary/:itenararyId", Day.getAllDaysInDetail);

  // Retrieve a single day with dayId
  router.get("/days/:id", Day.findOne);

  // Update an day with dayId
  router.put("/days/:id", Day.update);

  // Delete an day with dayId
  router.delete("/days/:id",  Day.delete);

  // Create a new day
  router.delete("/days/",  Day.deleteAll);

  app.use(router);
};
