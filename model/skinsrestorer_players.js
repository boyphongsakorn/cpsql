module.exports = (sequelize, Sequelize) => {
    const Skinsrestorer_players = sequelize.define('sr_legacy_players',
        {
            Nick: {
                type: Sequelize.STRING,
                field: 'name',
                primaryKey: true
            },
            Skin: {
                type: Sequelize.STRING,
                field: 'skin_name',
            },
        },{
            timestamps: false,
            freezeTableName: true,
        }
    );
    return Skinsrestorer_players;
    }
