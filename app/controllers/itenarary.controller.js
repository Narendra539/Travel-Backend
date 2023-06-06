const db = require("../models");
const Itenarary = db.itenarary;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const Day = db.day;

// Create and Save a new itenarary
exports.create = (req, res) => {
  // Validate request
  if (req.body.title === undefined) {
    const error = new Error("title cannot be empty for itenarary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("description cannot be empty for itenarary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.start_date === undefined) {
    const error = new Error("start_date cannot be empty for itenarary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.end_date === undefined) {
    const error = new Error("end_date cannot be empty for itenarary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.image_url === undefined) {
    const error = new Error("image_url cannot be empty for itenarary!");
    error.statusCode = 400;
    throw error;
  }

  // Create a itenarary
  const itenarary = {
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    rating: req.body.rating,
    categoryId: req.body.category_id,
    from: req.body.from,
    to: req.body.to
  };
  // Save itenarary in the database
  Itenarary.create(itenarary)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the itenarary.",
      });
    });
};

// Retrieve all itenararies from the database.
exports.findAll = (req, res) => {
  const key = req.query.key;
  var condition = null;
  if(key) {
    condition = {
      [Op.or]: [
        { title: { [Op.like]: `%${key}%` } },
        { description: { [Op.like]: `%${key}%` } },
      ],
    }
  } else {
    const { from, to, start, end } = req.query;
    const whereCondition = {
      [Op.and]: [],
    };
    if (start) {
      whereCondition[Op.and].push({ start_date: sequelize.where(sequelize.fn('DATE', sequelize.col('start_date')), start) });
    }
    if (end) {
      whereCondition[Op.and].push({ end_date: sequelize.where(sequelize.fn('DATE', sequelize.col('end_date')), end) });
    }
    if (from) {
      whereCondition[Op.and].push({ from: { [Op.like]: `%${from}%` } });
    }
    if (to) {
      whereCondition[Op.and].push({ to: { [Op.like]: `%${to}%` } });
    }
    condition = whereCondition;
  }
  Itenarary.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving itenararies.",
      });
    });
};

exports.search = (req, res) => {
  const key = req.query.key;
  var condition = null;
  if(key) {
    condition = {
      [Op.or]: [
        { title: { [Op.like]: `%${key}%` } },
        { description: { [Op.like]: `%${key}%` } },
      ],
    }
  } else {
    const { from, to, start, end } = req.query;
    const whereCondition = {
      [Op.and]: [],
    };
    if (start) {
      whereCondition[Op.and].push({ start_date: sequelize.where(sequelize.fn('DATE', sequelize.col('start_date')), start) });
    }
    if (end) {
      whereCondition[Op.and].push({ end_date: sequelize.where(sequelize.fn('DATE', sequelize.col('end_date')), end) });
    }
    if (from) {
      whereCondition[Op.and].push({ from: { [Op.like]: `%${from}%` } });
    }
    if (to) {
      whereCondition[Op.and].push({ to: { [Op.like]: `%${to}%` } });
    }
    condition = whereCondition;
  }
  Itenarary.findAll({ where: condition })
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

exports.findItenararyByCategory = (req, res) => {
  const categoryId = req.params.id;
  var condition = categoryId
  ? {
       categoryId: { [Op.like]: `%${categoryId}%` } ,

    }
  : null;
  Itenarary.findAll({ where: condition })
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

// Find a single itenarary with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Itenarary.findByPk(id,{ include: [{ model: Day, as: 'days' }] })
    .then((data) => {
        if (data) {
            res.json(data);
          } else {
            res.status(404).json({ error: 'itenarary not found' });
          }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving itenarary with id=" + id,
      });
    });
};

// Update a itenarary by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Itenarary.update(req.body, {
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "itenarary was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update itenarary with id=${id}. Maybe itenarary was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating itenarary with id=" + id,
      });
    });
};

// Delete a itenarary with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Itenarary.destroy({
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "itenarary was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete itenarary with id=${id}. Maybe itenarary was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete itenarary with id=" + id,
      });
    });
};

// Delete all itenararies from the database.
exports.deleteAll = (req, res) => {
  Itenarary.destroy({
    where: {},
    truncate: false,
  })
    .then((response) => {
      res.send({ message: `${response} itenararies were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all itenararies.",
      });
    });
};