const env = {
    database: 'mysqlbase',
    username: 'root',
    password: 'Team1556th_',
    host: '192.168.31.227',
    //dialect: 'mysql',
    dialect: 'mariadb',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  module.exports = env;