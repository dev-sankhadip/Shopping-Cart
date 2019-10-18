import React,{ useEffect, useState } from 'react'
import { withContext } from '../../HOC/addContext'


const CheckOut=(props)=>
{

    const [loginState, setLoginState]=useState(false);

    // console.log(props);
    useEffect(()=>{
        if(props.context.isLoggedin==true)
        {
            setLoginState(true);
            const token=localStorage.getItem("token");
            const productId=props.match.params.pid;
            const  pQuantity=props.match.params.pquantity;
            fetch(`http://localhost:2000/buyproduct/${productId}/${pQuantity}`,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                    'x-access-token':token
                },
                body:JSON.stringify({
                    productId
                })
            })
            .then((res)=>{
                return res.json();
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },[props.context.isLoggedin])
    return(
        <React.Fragment>
             { loginState ? <p>Product Bought</p> : <p>Please Login first</p> }
        </React.Fragment>
    )
}

export default withContext(CheckOut);