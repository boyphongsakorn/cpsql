module.exports = (sequelize, Sequelize) => {
    const Event_room = sequelize.define('event_room',
        {
            id : {
                type: Sequelize.STRING,
                field: 'id',
                primaryKey: true
            },
            winner : {
                type: Sequelize.STRING,
                field: 'winner'
            },
            status : {
                type: Sequelize.STRING,
                field: 'status'
            },
            event_start : {
                type: Sequelize.STRING,
                field: 'event_start'
            },
            event_end : {
                type: Sequelize.STRING,
                field: 'event_end'
            }
        },{
            timestamps: false,
            freezeTableName: true
        }
    );
    return Event_room;
};