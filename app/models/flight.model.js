module.exports =  (sequelize, Sequelize) => {
    const Flight = sequelize.define("flight", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        flight_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      flight_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      arrival_time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      depature_time:{
        type: Sequelize.STRING,
        allowNull: true,
        default: 0,
      },
      arrival_place: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      depature_place:{
        type: Sequelize.STRING,
        allowNull: true,
        default: 0,
      }
    },
        {
        timestamps: true, 
        });
    return Flight;
  };
  