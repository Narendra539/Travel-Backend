module.exports =  (sequelize, Sequelize) => {
  const Hotel = sequelize.define("hotel", {
      id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    checkin_date:{
      type: Sequelize.DATE,
      allowNull: true,
      default: 0,
    },
    checkout_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rating: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
   timestamps: true, 
  });
  return Hotel;
};
