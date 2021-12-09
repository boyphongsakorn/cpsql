const env = {
    database: 'mysqlbase',
    username: 'boyphongsakorn',
    password: 'team1556th',
    host: '192.168.31.210',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  module.exports = env;