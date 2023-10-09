module.exports = (sequelize, Sequelize) => {
  const Phone = sequelize.define("phone", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
    contactId: {
      type: Sequelize.NUMBER,
      foreginKey: true,
    },
  });

  return Phone;
};
