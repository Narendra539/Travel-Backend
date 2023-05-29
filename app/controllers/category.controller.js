const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;

// Create and Save a new category
exports.create = (req, res) => {
  // Validate request
  if (req.body.title === undefined) {
    const error = new Error("title cannot be empty for category!");
    error.statusCode = 400;
    throw error;
  }

  // Create a category
  const category = {
    title: req.body.title,
  };
  // Save category in the database
  Category.create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category.",
      });
    });
};

// Retrieve all categories from the database.
exports.findAll = (req, res) => {
  const categoryId = req.query.categoryId;
  var condition = categoryId
    ? {
        id: {
          [Op.like]: `%${categoryId}%`,
        },
      }
    : null;

  Category.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    });
};

exports.search = (req, res) => {
  const key = req.query.key;
  var condition = key
  ? { title: { [Op.like]: `%${key}%` } }: null;
  
  Category.findAll({ where: condition })
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

// Find a single category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then((data) => {
        if (data) {
            res.json(data);
          } else {
            res.status(404).json({ error: 'category not found' });
          }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving category with id=" + id,
      });
    });
};

// Update a category by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Category.update(req.body, {
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "category was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update category with id=${id}. Maybe category was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating category with id=" + id,
      });
    });
};

// Delete a category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: { id: id },
  })
    .then((response) => {
      if (response == 1) {
        res.send({
          message: "category was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete category with id=${id}. Maybe category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete category with id=" + id,
      });
    });
};

// Delete all categories from the database.
exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false,
  })
    .then((response) => {
      res.send({ message: `${response} categories were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories.",
      });
    });
};
