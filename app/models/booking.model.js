module.exports =  (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    },
    {
     timestamps: true, 
    });
    return Booking;
  };
  