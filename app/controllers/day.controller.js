const db = require("../models");
const Day = db.day;
const Op = db.Sequelize.Op;
const Hotel = db.hotel;
const Place = db.place;
const Flight = db.flight;
// Create and Save a new day
exports.create = (req, res) => {
  // Validate request
  if (req.body.day_index === undefined) {
    const error = new Error("day_index cannot be empty for day!");
    error.statusCode = 400;
    throw error;
  } else  if (req.body.description === undefined) {
    const error = new Error("description cannot be empty for day!");
    error.statusCode = 400;
    throw error;
  }

  // Create a day
  const day = {
    day_index: req.body.day_index,
    itenararyId: req.body.itenarary_id,
    description: req.body.description
  };
  // Save day in the database
  Day.create(day)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the day.",
      });
    });
};

// Retrieve all days from the database.
exports.findAll = (req, res) => {
  const dayId = req.query.dayId;
  var condition = dayId
    ? {
        id: {
          [Op.like]: `%${dayId}%`,
        },
      }
    : null;

  Day.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving days.",
      });
    });
};

exports.search = (req, res) => {
  const key = req.query.key;
  var condition = key
  ? {
       description: { [Op.like]: `%${key}%` } ,
    }
  : null;
  Day.findAll({ where: condition })
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

exports.findDaysByItenararyId = (req, res) => {
  const itenararyId = req.params.id;
  var condition = itenararyId
  ? {
       itenararyId: { [Op.like]: `%${itenararyId}%` } ,
    }
  : null;
  Day.findAll({ where: condition })
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

// Find a single day with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
    console.log("id",id)
  Day.findByPk(id)
    .then((data) => {
        if (data) {
            res.json(data);
          } else {
            res.status(404).json({ error: 'day not found' });
          }
    })
    .catch((err) => {
        console.log("err",err)
      res.status(500).send({
        message: err.message || "Error retrieving day with id=" + id,
      });
    });
};

// Update a day by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Day.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "day was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update day with id=${id}. Maybe day was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating day with id=" + id,
      });
    });
};

// Delete a day with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Day.destroy({
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "day was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete day with id=${id}. Maybe day was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete day with id=" + id,
      });
    });
};

// Delete all days from the database.
exports.deleteAll = (req, res) => {
  Day.destroy({
    where: {},
    truncate: false,
  })
    .then((response) => {
      res.send({ message: `${response} days were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all days.",
      });
    });
};

exports.getAllDaysInDetail = async (req,res) => {
  const { itenararyId, dayId } = req.params;
  try {
    const day = await Day.findOne({
      where: { id: dayId, ItineraryId: itenararyId },
      include: [Flight, Hotel, Place],
    });

    if (day) {
      res.status(200).json(day);
    } else {
      res.status(404).json({ error: 'Day not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}