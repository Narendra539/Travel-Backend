const db = require("../models");
const Flight = db.flight;
const Op = db.Sequelize.Op;

// Create and Save a new flight
exports.create = (req, res) => {
  // Validate request
  if (req.body.flight_name === undefined) {
    const error = new Error("flight_name cannot be empty for flight!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.flight_number === undefined) {
    const error = new Error("flight_number cannot be empty for flight!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.arrival_time === undefined) {
    const error = new Error("arrival_time cannot be empty for flight!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.depature_time === undefined) {
    const error = new Error("depature_time cannot be empty for flight!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.arrival_place === undefined) {
    const error = new Error("arrival_time cannot be empty for flight!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.depature_place === undefined) {
    const error = new Error("depature_place cannot be empty for flight!");
    error.statusCode = 400;
    throw error;
  }

  // Create a flight
  const flight = {
    flight_name: req.body.flight_name,
    flight_number: req.body.flight_number,
    arrival_time: req.body.arrival_time,
    depature_time: req.body.depature_time,
    arrival_place: req.body.arrival_place,
    depature_place: req.body.depature_place,
    itenararyId: req.body.itenarary_id
  };
  // Save flight in the database
  Flight.create(flight)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the flight.",
      });
    });
};

// Retrieve all flights from the database.
exports.findAll = (req, res) => {
  const flightId = req.query.flightId;
  var condition = flightId
    ? {
        id: {
          [Op.like]: `%${flightId}%`,
        },
      }
    : null;

  Flight.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving flights.",
      });
    });
};

exports.search = (req, res) => {
  const key = req.query.key;
  var condition = key
  ? {
      [Op.or]: [
        { flight_name: { [Op.like]: `%${key}%` } },
        { flight_number: { [Op.like]: `%${key}%` } },
      ],
    }
  : null;
  Flight.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving flights.",
      });
    });
};

// Find a single flight with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Flight.findByPk(id)
    .then((data) => {
        if (data) {
            res.json(data);
          } else {
            res.status(404).json({ error: 'flight not found' });
          }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving flight with id=" + id,
      });
    });
};

// Update a flight by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Flight.update(req.body, {
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "flight was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update flight with id=${id}. Maybe flight was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating flight with id=" + id,
      });
    });
};

// Delete a flight with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Flight.destroy({
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "flight was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete flight with id=${id}. Maybe flight was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete flight with id=" + id,
      });
    });
};

// Delete all flights from the database.
exports.deleteAll = (req, res) => {
  Flight.destroy({
    where: {},
    truncate: false,
  })
    .then((response) => {
      res.send({ message: `${response} flights were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all flights.",
      });
    });
};
