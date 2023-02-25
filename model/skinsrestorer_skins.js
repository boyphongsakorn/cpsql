module.exports = (sequelize, Sequelize) => {
    const Skinsrestorer_skins = sequelize.define('Skins',
        {
            Nick: {
                type: Sequelize.STRING,
                field: 'Nick',
                primaryKey: true
            },
            Value: {
                type: Sequelize.STRING,
                field: 'Value',
            },
            Signature: {
                type: Sequelize.STRING,
                field: 'Signature',
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