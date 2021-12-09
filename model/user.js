module.exports = (sequelize, Sequelize) => {
    const Couser = sequelize.define(
      'co_user',
      {
        userid: {
          type: Sequelize.INTEGER,
          field: 'rowid',
          primaryKey: true
        },
        time: {
          type: Sequelize.INTEGER,
          field: 'time'
        },
        user: {
          type: Sequelize.STRING(100),
          field: 'user'
        },
        uuid: {
          type: Sequelize.STRING(64),
          field: 'uuid'
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );
    return Couser;
  };