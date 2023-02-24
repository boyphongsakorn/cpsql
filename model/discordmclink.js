module.exports = (sequelize, Sequelize) => {
    const Discordmclink = sequelize.define('discordmclink',
        {
            id: {
                type: Sequelize.INTEGER,
                field: 'id',
                primaryKey: true
            },
            discord: {
                type: Sequelize.STRING,
                field: 'discord',
            },
            uuid: {
                type: Sequelize.UUID,
                field: 'uuid',
            },
            authme_id: {
                type: Sequelize.INTEGER,
                field: 'authme_id',
            },
            uuidfrom: {
                type: Sequelize.STRING,
                field: 'uuidfrom',
            },
        },{
            timestamps: false,
            freezeTableName: true,
        }
    );
    return Discordmclink;
    }