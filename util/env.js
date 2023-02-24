const env = {
    database: 'mysqlbase',
    //username: 'xxx',
    //password: 'xxx',
    //host: 'xxx',
    //dialect: 'mysql',
    dialect: 'mariadb',
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  };
  
  module.exports = env;
