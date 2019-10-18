var express = require('express');
var router = express.Router();
const connection=require('../db/db');
const jwt=require('jsonwebtoken')
const checkToken=require('../jwt/jwt').checkToken;
const sgMail=require('@sendgrid/mail');
const sendGridKey=require('../config/key').sendGridKey;
const uuid=require('uuid')
sgMail.setApiKey(sendGridKey);


const config={
    secret:"iamthebest"
}

router.post('/register',(request, response)=>
{
    const { name, email, password, no }=request.body;
    const tokenUUID=uuid();
    var sql="insert into verification(tokenid, email, name, ph_no, password) values(?,?,?,?,?)";
    connection.query(sql,[tokenUUID, email, name, no, password], function(err, result)
    {
        if(err)
        {
        console.log(err);
        }
        else
        {
        sgMail.send({
            to:email,
            from:'sankha@gmail.com',
            subject:'Verification email',
            text:`http://localhost:2000/users/verification/${tokenUUID}`,
        })
        response.end("email has been sent, please verify");
        }
    })

    // const { name, email, password, no }=request.body;
    // var sql="insert into users(name, email, ph_no, password) values(?,?,?,?)";
    // connection.query(sql, [name, email, no, password], (err, result)=>
    // {
    //     if(err)
    //     {
    //         console.error(err);
    //         sendResponse(response, 400, "Signup Failed");
    //         response.status(403).end();
    //     }
    //     else
    //     {
    //         sendResponse(response, 200, "Signup Sucessful");
    //     }
    // })
})


router.get("/verification/:token", function(request, response)
{
  const token=request.params.token;
  var sql="select * from verification where tokenid = ?";
  connection.query(sql,[token], function(err, result)
  {
    if(err)
    {
      console.log(err);
    }
    if(result.length>0)
    {
        console.log(result);
        const email=result[0].email;
        const name=result[0].name;
        const no=result[0].ph_no;
        const password=result[0].password;
        console.log(email);
        // response.end('verified');
        var sql="insert into users(name, email, ph_no, password) values(?,?,?,?)";
        connection.query(sql, [name, email, no, password], (err, result)=>
        {
            if(err)
            {
                response.end("database error");
            }
            else
            {
                response.end("You are registered");
            }
        })
    }
    else
    {
      response.end("please verify emaila address");
    }
  })
})

router.post('/login', (request, response)=>
{
    const {email, password}=request.body;
    var sql="select * from users where email = ?";
    connection.query(sql,[email], (err, result)=>
    {
        if(err)
        {
            console.error(err);
            sendResponse(response, 400,"Login Failed");
        }
        else if(result.length>0)
        {
            if(result[0].password==password)
            {
                let token = jwt.sign({email: email},
                    config.secret,
                    { 
                      expiresIn: '1h' //expires in 24 hours
                    }
                  )
                response.send({
                    code:200,
                    message:"Sucessfully Loggedin",
                    token:token
                })
            }
            else
            {
                sendResponse(response,300,"Wrong password");
            }
        }
        else
        {
            sendResponse(response, 301, "Username not found");
        }
    })
})

router.post('/admin/login',(request, response)=>
{
    console.log(request.body);
})

router.get('/validtoken',checkToken, (request, response)=>
{
    response.send({
        code:200,
        message:"user is valid"
    })
})

function sendResponse(response, code,message)
{
    response.send({
        code,message
    })
}

module.exports = router;
