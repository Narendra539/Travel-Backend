const db = require("../models");
const Booking = db.booking;
const Op = db.Sequelize.Op;
const BookingDetails = db.bookingDetails;
// Create and Save a new booking
exports.create = (req, res) => {
  // Validate request
  if (req.body.user_id === undefined) {
    const error = new Error("user_id cannot be empty for booking!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.itenarary_id === undefined) {
    const error = new Error("itenarary_id per unit cannot be empty for booking!");
    error.statusCode = 400;
    throw error;
  }

  // Create a booking
  const booking = {
    userId: req.body.user_id,
    itenararyId: req.body.itenarary_id,
  };

  // Save booking in the database
  Booking.create(booking)
    .then((bookingData) => {
      // Create an array to store multiple user data
      const users = [];

      // Iterate through the users in the request body
      for (const user of req.body.users) {
        // Create user object with bookingId as foreign key
        const userObj = {
          firstName: user.first_name,
          lastName: user.last_name,
          mobile: user.mobile,
          bookingId: bookingData.id, // Assign the booking ID to the user
        };

        // Add the user object to the users array
        users.push(userObj);
      }

      // Save multiple users in the database
      BookingDetails.bulkCreate(users)
        .then((userData) => {
          // Return the booking data and associated users data
          res.send({
            booking: bookingData,
            users: userData,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error occurred while creating users for the booking.",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while creating the booking.",
        error: err.message || "Some error occurred while creating the booking.",
      });
    });
};

// Retrieve all bookings from the database.
exports.findAll = (req, res) => {
  const bookingId = req.query.bookingId;
  var condition = bookingId
    ? {
        id: {
          [Op.like]: `%${bookingId}%`,
        },
      }
    : null;

  Booking.findAll({ 
    where: condition,
    include: [{ model: BookingDetails, attributes: ['firstName', 'lastName', 'mobile'] }] 
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bookings.",
      });
    });
};


// Find a single booking with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Booking.findByPk(id)
    .then((data) => {
        if (data) {
            res.json(data);
          } else {
            res.status(404).json({ error: 'booking not found' });
          }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving booking with id=" + id,
      });
    });
};

exports.findByUserId = (req, res) => {
  const id = req.params.id;
  var condition = id
  ? { userId: id }: null;
  Booking.findAll({ 
    where: condition,
    include: [{ model: BookingDetails, as:"bookingDetails", attributes: ['firstName', 'lastName', 'mobile'] }] 
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: 'booking not found' });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving bookings with user id=" + id,
      });
    });
};

exports.findByItenararyId = (req, res) => {
  const id = req.params.id;
  var condition = id
  ? { itenararyId: id }: null;
  Booking.findAll({ where: condition })
    .then((data) => {
        if (data) {
            res.json(data);
          } else {
            res.status(404).json({ error: 'booking not found' });
          }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving booking with itenarary id=" + id,
      });
    });
};

// Update a booking by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log("body",req.body,id)
  Booking.update(req.body, {
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        console.log("resp",response)
        res.send({
          message: "booking was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update booking with id=${id}. Maybe booking was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log("err",err)
      res.status(500).send({
        message: err.message || "Error updating booking with id=" + id,
      });
    });
};

// Delete a booking with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Booking.destroy({
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "booking was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete booking with id=${id}. Maybe booking was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete booking with id=" + id,
      });
    });
};

// Delete all bookings from the database.
exports.deleteAll = (req, res) => {
  Booking.destroy({
    where: {},
    truncate: false,
  })
    .then((response) => {
      res.send({ message: `${response} bookings were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all bookings.",
      });
    });
};
