module.exports = (sequelize, Sequelize) => {
  const Couser_log = sequelize.define(
    'co_username_log',
    {
      rowid: {
        type: Sequelize.INTEGER,
        field: 'rowid',
        primaryKey: true
      },
      time: {
        type: Sequelize.INTEGER,
        field: 'time'
      },
      uuid: {
        type: Sequelize.STRING(64),
        field: 'uuid'
      },
      user: {
        type: Sequelize.STRING(100),
        field: 'user'
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  return Couser_log;
};