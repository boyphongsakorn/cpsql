module.exports = (sequelize, Sequelize) => {
    const Cochat = sequelize.define(
      'co_chat',
      {
        rowid: {
            type: Sequelize.INTEGER,
            field: 'rowid',
            primaryKey: true
        },
        time: {
            type: Sequelize.INTEGER,
            field: 'time',
            foreignKey: true
        },
        user: {
            type: Sequelize.INTEGER,
            field: 'user',
            foreignKey: true
        },
        wid: {
            type: Sequelize.INTEGER,
            field: 'wid',
            foreignKey: true
        },
        x: {
            type: Sequelize.INTEGER,
            field: 'x',
            foreignKey: true
        },
        y: {
            type: Sequelize.INTEGER,
            field: 'y'
        },
        z: {
            type: Sequelize.INTEGER,
            field: 'z',
            foreignKey: true
        },
        message: {
            type: Sequelize.STRING,
            field: 'message'
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );
    return Cochat;
  };