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
                type: Sequelize.STRING,
                field: 'uuid',
            },
        },{
            timestamps: false,
            freezeTableName: true,
        }
    );
    return Discordmclink;
    }