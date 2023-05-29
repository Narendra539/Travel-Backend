module.exports =  (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
        type: Sequelize.STRING,
        allowNull: false,
        }
    },
    {
     timestamps: true, 
    });
    return Category;
  };
  