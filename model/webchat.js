module.exports = (sequelize, Sequelize) => {
    const Webchat = sequelize.define('webchat',
        {
            id: {
                type: Sequelize.INTEGER,
                field: 'id',
                primaryKey: true
            },
            time: {
                type: Sequelize.INTEGER,
                field: 'time',
            },
            user: {
                type: Sequelize.INTEGER,
                field: 'user',
            },
            discord: {
                type: Sequelize.STRING,
                field: 'discord',
            },
            message: {
                type: Sequelize.STRING,
                field: 'message',
            },
        },{
            timestamps: false,
            freezeTableName: true,
        }
        );
    return Webchat;
    }