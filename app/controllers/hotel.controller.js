const db = require("../models");
const Hotel = db.hotel;
const Op = db.Sequelize.Op;

// Create and Save a new hotel
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("name cannot be empty for hotel!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.location === undefined) {
    const error = new Error("location cannot be empty for hotel!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.checkin_date === undefined) {
    const error = new Error("checkin_date cannot be empty for hotel!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.checkout_date === undefined) {
    const error = new Error("checkout_date cannot be empty for hotel!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.image_url === undefined) {
    const error = new Error("image_url cannot be empty for hotel!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("description cannot be empty for hotel!");
    error.statusCode = 400;
    throw error;
  }

  // Create a hotel
  const hotel = {
    name: req.body.name,
    location: req.body.location,
    rating: req.body.rating,
    checkin_date: req.body.checkin_date,
    checkout_date: req.body.checkout_date,
    image_url: req.body.image_url,
    dayId: req.body.dayId,
    rating: req.body.rating,
    description: req.body.description,
  };
  // Save hotel in the database
  Hotel.create(hotel)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the hotel.",
      });
    });
};

// Retrieve all hotels from the database.
exports.findAll = (req, res) => {
  const hotelId = req.query.hotelId;
  var condition = hotelId
    ? {
        id: {
          [Op.like]: `%${hotelId}%`,
        },
      }
    : null;

  Hotel.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hotels.",
      });
    });
};

exports.search = (req, res) => {
  const key = req.query.key;
  var condition = key
  ? {
      [Op.or]: [
        { name: { [Op.like]: `%${key}%` } },
        { location: { [Op.like]: `%${key}%` } },
      ],
    }
  : null;
  Hotel.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving hotels.",
      });
    });
};

// Find a single hotel with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Hotel.findByPk(id)
    .then((data) => {
        if (data) {
            res.json(data);
          } else {
            res.status(404).json({ error: 'hotel not found' });
          }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving hotel with id=" + id,
      });
    });
};

// Update a hotel by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Hotel.update(req.body, {
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "hotel was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update hotel with id=${id}. Maybe hotel was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating hotel with id=" + id,
      });
    });
};

// Delete a hotel with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Hotel.destroy({
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "hotel was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete hotel with id=${id}. Maybe hotel was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete hotel with id=" + id,
      });
    });
};

// Delete all hotels from the database.
exports.deleteAll = (req, res) => {
  Hotel.destroy({
    where: {},
    truncate: false,
  })
    .then((response) => {
      res.send({ message: `${response} hotels were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all hotels.",
      });
    });
};

exports.getTopRatedHotels = (req, res) => {
  Hotel.findAll({
    limit: 5,
    order: [['rating', 'DESC']],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving top-rated hotels.",
      });
    });
};