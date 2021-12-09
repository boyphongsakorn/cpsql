module.exports = (sequelize, Sequelize) => {
    const Coblock = sequelize.define(
      'co_block',
      {
        id: {
          type: Sequelize.BIGINT,
          field: 'rowid',
          primaryKey: true
        },
        time: {
          type: Sequelize.INTEGER,
          field: 'time'
        },
        user: {
          type: Sequelize.INTEGER,
          field: 'user'
        },
        worldid: {
          type: Sequelize.INTEGER,
          field: 'wid'
        },
        x: {
          type: Sequelize.INTEGER,
          field: 'x'
        },
        y: {
          type: Sequelize.INTEGER,
          field: 'y'
        },
        z: {
          type: Sequelize.INTEGER,
          field: 'z'
        },
        type: {
          type: Sequelize.INTEGER,
          field: 'type'
        },
        data: {
          type: Sequelize.INTEGER,
          field: 'data'
        },
        meta: {
          type: Sequelize.BLOB,
          field: 'meta'
        },
        blockdata: {
          type: Sequelize.BLOB,
          field: 'blockdata'
        },
        action: {
          type: Sequelize.INTEGER,
          field: 'action'
        },
        rolledback: {
          type: Sequelize.TINYINT,
          field: 'rolled_back'
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );
    return Coblock;
  };