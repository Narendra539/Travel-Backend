module.exports = (app) => {
    const Booking = require("../controllers/booking.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new booking
    router.post("/bookings/",  Booking.create);
  
    // Retrieve all booking
    router.get("/bookings/", Booking.findAll);
  
    // Retrieve a single booking with bookingId
    router.get("/bookings/:id", Booking.findOne);
  
    router.get("/bookings/user/:id", Booking.findByUserId);
    router.get("/bookings/itenarary/:id", Booking.findByItenararyId);

    // Update an booking with bookingId
    router.put("/bookings/:id", Booking.update);
  
    // Delete an booking with bookingId
    router.delete("/bookings/:id", Booking.delete);
  
    // Create a new booking
    router.delete("/bookings/", Booking.deleteAll);
  
    app.use(router);
  };
  