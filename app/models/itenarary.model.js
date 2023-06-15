module.exports =  (sequelize, Sequelize) => {
  const Itenarary = sequelize.define("itenarary", {
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
        start_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        image_url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        place_from: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        place_to: {
          type: Sequelize.STRING,
          allowNull: true,
        }
  },
  {
   timestamps: true, 
  });
  return Itenarary;
};