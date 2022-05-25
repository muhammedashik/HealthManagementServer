const mssql = require('mssql');

const dbConn = {
    user: 'sa',
    password: 'Ashik',
    server: 'localhost',
    database: 'healthManagement',
    port: 1433,
    options: {
      encrypt: false
    }
  };
  
 const pool = new mssql.ConnectionPool(dbConn).connect().then((pool)=>{
    console.log('Connected to Sql  health management DB');
    return pool;
 }
).catch(
    err=>{
        console.log('Database connection Faild ! Bad config ',err)
    }
)
  
  module.exports = {
    mssql,
   pool
  };