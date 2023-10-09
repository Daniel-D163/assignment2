const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
  const contact = {
    id: req.body.id,
    name: req.body.name,
  };
  Contacts.create(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

// Get all contacts
exports.findAll = (req, res) => {
  Contacts.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

// Get one contact by id
exports.findOne = (req, res) => {};

// Update one contact by id
exports.update = (req, res) => {};

// Delete one contact by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Contacts.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Contact was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete contact`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete contact with id=" + id,
      });
    });
};
