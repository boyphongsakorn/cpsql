module.exports = (sequelize, Sequelize) => {
    const Mclogin = sequelize.define('mclogin',
        {
            id: {
                type: Sequelize.MEDIUMINT,
                field: 'id',
                primaryKey: true
            },
            username: {
                type: Sequelize.STRING,
                field: 'username',
                foreignKey: true
            },
            realname: {
                type: Sequelize.STRING,
                field: 'realname'
            },
            password: {
                type: Sequelize.STRING,
                field: 'password'
            },
            ip: {
                type: Sequelize.STRING,
                field: 'ip'
            },
            lastlogin: {
                type: Sequelize.BIGINT,
                field: 'lastlogin'
            },
            x: {
                type: Sequelize.DOUBLE,
                field: 'x'
            },
            y: {
                type: Sequelize.DOUBLE,
                field: 'y'
            },
            z: {
                type: Sequelize.DOUBLE,
                field: 'z'
            },
            world: {
                type: Sequelize.STRING,
                field: 'world'
            },
            regdate: {
                type: Sequelize.BIGINT,
                field: 'regdate'
            },
            regip: {
                type: Sequelize.STRING,
                field: 'regip'
            },
            yaw: {
                type: Sequelize.FLOAT,
                field: 'yaw'
            },
            pitch: {
                type: Sequelize.FLOAT,
                field: 'pitch'
            },
            email: {
                type: Sequelize.STRING,
                field: 'email'
            },
            isLogged: {
                type: Sequelize.SMALLINT,
                field: 'isLogged'
            },
            hasSession: {
                type: Sequelize.SMALLINT,
                field: 'hasSession'
            },
            totp: {
                type: Sequelize.STRING,
                field: 'totp'
            },
        },{
            timestamps: false,
            freezeTableName: true,
        }
    );
    return Mclogin;
    }