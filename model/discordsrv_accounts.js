module.exports = (sequelize, Sequelize) => {
    const Discordsrv_accounts = sequelize.define('discordsrv_accounts',
        {
            link: {
                type: Sequelize.INTEGER,
                field: 'link',
                primaryKey: true
            },
            discord: {
                type: Sequelize.STRING,
                field: 'discord',
                foreignKey: true
            },
            uuid: {
                type: Sequelize.STRING,
                field: 'uuid',
                foreignKey: true
            },
        },{
            timestamps: false,
            freezeTableName: true,
        }
    );
    return Discordsrv_accounts;
    }