module.exports = (sequelize, Sequelize) => {
    const Coblockname = sequelize.define(
      'co_material_map',
      {
        rowid: {
          type: Sequelize.INTEGER,
          field: 'rowid',
          primaryKey: true
        },
        id: {
          type: Sequelize.INTEGER,
          field: 'id'
        },
        blockid: {
          type: Sequelize.STRING(255),
          field: 'material'
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );
    return Coblockname;
  };