const mysql=require('mysql');

const connection=mysql.createPool({
    user:'root',
    password:'root',
    host:'localhost',
    database:'shopping_cart'
})


module.exports=connection;