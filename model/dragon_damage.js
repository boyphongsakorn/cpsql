module.exports = (sequelize, Sequelize) => {
    const Dragon_damage = sequelize.define('dragon_damage',
        {
            id : {
                type: Sequelize.INTEGER,
                field: 'id',
                primaryKey: true
            },
            uuid : {
                type: Sequelize.STRING,
                field: 'uuid'
            },
            name : {
                type: Sequelize.STRING,
                field: 'name'
            },
            alldamage : {
                type: Sequelize.FLOAT,
                field: 'alldamage'
            },
            lastdamage : {
                type: Sequelize.DATETIME,
                field: 'lastdamage'
            },
            event_id : {
                type: Sequelize.STRING,
                field: 'event_id'
            },
        },{
            timestamps: false,
            freezeTableName: true
        }
    );
    return Dragon_damage;
};