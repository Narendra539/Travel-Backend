module.exports =  (sequelize, Sequelize) => {
    const Day = sequelize.define("day", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        day_index: {
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
    return Day;
  };
  