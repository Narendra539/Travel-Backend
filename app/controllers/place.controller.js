const db = require("../models");
const Place = db.place;
const Op = db.Sequelize.Op;

// Create and Save a new place
exports.create = (req, res) => {
  // Validate request
  if (req.body.title === undefined) {
    const error = new Error("title cannot be empty for place!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("description cannot be empty for place!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.image_url === undefined) {
    const error = new Error("image_url cannot be empty for place!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.location === undefined) {
    const error = new Error("image_url cannot be empty for place!");
    error.statusCode = 400;
    throw error;
  }

  // Create a place
  const place = {
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
    image_url: req.body.image_url,
    location: req.body.location,
    dayId: req.body.dayId,
    visited_by: req.body.visited_by
  };
  // Save place in the database
  Place.create(place)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the place.",
      });
    });
};

// Retrieve all places from the database.
exports.findAll = (req, res) => {
  const placeId = req.query.placeId;
  var condition = placeId
    ? {
        id: {
          [Op.like]: `%${placeId}%`,
        },
      }
    : null;

  Place.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving places.",
      });
    });
};

exports.search = (req, res) => {
  const key = req.query.key;
  var condition = key
  ? {
      [Op.or]: [
        { title: { [Op.like]: `%${key}%` } },
        { description: { [Op.like]: `%${key}%` } },
      ],
    }
  : null;
  Place.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving places.",
      });
    });
};

// Find a single place with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Place.findByPk(id)
    .then((data) => {
        if (data) {
            res.json(data);
          } else {
            res.status(404).json({ error: 'place not found' });
          }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving place with id=" + id,
      });
    });
};

// Update a place by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Place.update(req.body, {
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "place was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update place with id=${id}. Maybe place was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating place with id=" + id,
      });
    });
};

// Delete a place with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Place.destroy({
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "place was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete place with id=${id}. Maybe place was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete place with id=" + id,
      });
    });
};

// Delete all places from the database.
exports.deleteAll = (req, res) => {
  Place.destroy({
    where: {},
    truncate: false,
  })
    .then((response) => {
      res.send({ message: `${response} places were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all places.",
      });
    });
};


exports.getMostVisitedPlaces = (req, res) => {
  Place.findAll({
    order: [['visited_by', 'DESC']],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving most visited places.",
      });
    });
};
