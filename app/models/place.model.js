module.exports =  (sequelize, Sequelize) => {
  const Place = sequelize.define("place", {
      id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
   timestamps: true, 
  });
  return Place;
};
