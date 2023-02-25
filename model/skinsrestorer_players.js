module.exports = (sequelize, Sequelize) => {
    const Skinsrestorer_players = sequelize.define('Players',
        {
            Nick: {
                type: Sequelize.STRING,
                field: 'Nick',
                primaryKey: true
            },
            Skin: {
                type: Sequelize.STRING,
                field: 'Skin',
            },
        },{
            timestamps: false,
            freezeTableName: true,
        }
    );
    return Skinsrestorer_players;
    }