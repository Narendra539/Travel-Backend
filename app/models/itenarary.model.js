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
          rating: {
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          image_url: {
            type: Sequelize.STRING,
            allowNull: false,
          },
    },
    {
     timestamps: true, 
    });
    return Itenarary;
  };