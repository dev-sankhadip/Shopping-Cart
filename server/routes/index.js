var express = require('express');
var router = express.Router();
var connection=require('../db/db')
var checktoken=require('../jwt/jwt').checkToken;


router.post('/add/product', (request, response)=>
{
  const { pname, pdes, pprice, pquantity }=request.body;
  var sql="insert into products(pname, pdes, pprice, pquantity) values(?,?,?,?)";
  connection.query(sql,[pname, pdes,pprice,pquantity],(err, result)=>
  {
    if(err)
    {
      console.log(err);
      response.status(500);
      response.send({
        code:500,
        message:"Internal Error"
      })
    }
    else
    {
      response.send({
        code:200,
        message:"Product Added"
      })
    }
  })
})

router.get("/admin/products",(request, response)=>
{
  var sql="select * from products";
  connection.query(sql,(err, result)=>
  {
    if(err)
    {
      console.log(err);
      sendResponse(response, 500,"Internal error");
    }
    else
    {
      sendResponse(response, 200, result);
    }
  })
})


router.get('/users/products', checktoken,(request, response)=>
{
  var sql="select * from products";
  connection.query(sql,(err, result)=>
  {
    if(err)
    {
      console.log(err);
      sendResponse(response, 500, "Internal error");
    }
    else
    {
      sendResponse(response, 200, result);
    }
  })
})

router.post("/addtocart",checktoken,(request, response)=>
{
  const email=request.decoded.email;
  const { pid, productQuantity, pname }=request.body;
  var sql="select * from products where pid = ?";
  connection.query(sql,[pid],(err, result)=>
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      if(result[0].pquantity<parseInt(productQuantity))
      {
        response.send({
          code:301,
          message:"Product out of stock"
        })
      }
      else
      {
        var sql="insert into cart(pid, pname, productQuantity, email) values(?,?,?,?)";
        connection.query(sql,[pid, pname, productQuantity, email], function(err, result2)
        {
          if(err)
          {
            console.log(err);
            response.send({
              code:500,
              message:"Internal error"
            })
          }
          else
          {
            // console.log(result2);
            response.send({
              code:200,
              message:"Successfully added to cart",
              result
            })
          }
        })
      }
    }
  })
})


router.get("/users/cart",checktoken, function(request, response)
{
  const email=request.decoded.email;
  var sql="select * from cart where email = ?";
  connection.query(sql,[email], function(err, result)
  {
    if(err)
    {
      console.log(err);
      response.send({
        code:500,
        message:"Internal error"
      })
    }
    else
    {
      // console.log(result);
      response.send({
        code:200,
        result
      })
    }
  })
})



router.put("/buyproduct/:pid/:pquantity",checktoken,(request, response)=>
{
  const pid=request.params.pid;
  const email=request.decoded.email;
  const pquantity=request.params.pquantity;
  var sql1="delete from cart where pid = ? and email = ?";
  var sql2="update products set pquantity = pquantity - ? where pid = ?";
  connection.query(sql1,[pid, email], function(err, result)
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      connection.query(sql2,[pquantity,pid], function(err, result)
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
          console.log("success");
        }
      })
    }
  })
})

function sendResponse(response, code, message)
{
  response.send({
    code,
    message
  })
}
module.exports = router;
