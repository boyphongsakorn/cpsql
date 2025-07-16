module.exports = (sequelize, Sequelize) => {
    const Skinsrestorer_skins = sequelize.define('sr_player_skins',
        {
            Nick: {
                type: Sequelize.STRING,
                field: 'last_known_name'
            },
            Value: {
                type: Sequelize.STRING,
                field: 'value',
            },
            Signature: {
                type: Sequelize.STRING,
                field: 'signature',
            },
            timestamp: {
                type: Sequelize.STRING,
                field: 'timestamp'
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
    return Skinsrestorer_skins;
}
