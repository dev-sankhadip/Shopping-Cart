import React,{useEffect, useState, useCallback, useMemo} from 'react'
import  Cart  from '../cart/cart'
// import { AuthContext } from "../../context/AuthContext";
import { withContext } from '../../HOC/addContext'

const Dashboard=(props)=>
{
    const [product, setProduct]=useState([]);
    const [productQuantity, setProductQuantity]=useState();
    const [cartCount, setCartCount]=useState(0);
    const [cartProduct, setCartProduct]=useState([])

    useEffect(()=>
    {
            fetchAllProduct();
            fetchCartProduct();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const fetchCartProduct=()=>
    {
        const token=localStorage.getItem("token");
        fetch("http://localhost:2000/users/cart",{
            method:"GET",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                'x-access-token':token
            }
        })
        .then((res)=>
        {
            return res.json();
        })
        .then((res)=>
        {
            if(res.code===200)
            {
                for(let i=0;i<res.result.length;i++)
                {
                    const { pid,pname, productQuantity, email } = res.result[i];
                    setCartProduct(cartProduct=>[...cartProduct,{ pid, productQuantity, email, pname }]);
                    setCartCount(cartCount=>cartCount+1);
                }
            }
            else
            {
                props.context.updateLoginStatus(false);
                props.history.push("/login");
            }
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }

    const fetchAllProduct=()=>
    {
        const token=localStorage.getItem("token");

        fetch('http://localhost:2000/users/products',{
            method:"GET",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                'x-access-token':token
            }
        })
        .then((res)=>
        {
            return res.json();
        })
        .then((res)=>
        {
            if(res.code==200)
            {
                setProduct(res.message);
            }
            else
            {
                props.context.updateLoginStatus(false);
                props.history.push("/login");
            }
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }
    
    //update the quantity for adding into cart
    const setQuanitty=(e)=>
    {
        setProductQuantity(e.target.value);
    }

    //add to cart function
    const addToCart=(pid,pname)=>
    {
        const token=localStorage.getItem("token");
        if(token!==null)
        {
            fetch("http://localhost:2000/addtocart",{
                method:"POST",
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                    'x-access-token':token
                },
                body:JSON.stringify({ pid, productQuantity,pname })
            })
            .then((res)=>
            {
                return res.json();
            })
            .then((res)=>
            {
                if(res.code===200)
                {
                    const email="sankhadip";
                    setCartProduct([...cartProduct,{ pid, productQuantity,email,pname }]);
                    setCartCount(cartCount=>cartCount+1);
                }
                else if(res.code===301)
                {
                    alert("Product out of stock");
                }
            })
            .catch((err)=>
            {
                console.log(err);
            })
        }
        else
        {
            props.context.updateLoginStatus(false);
            props.history.push("/login");
        }
    }

    //use of usecallback hooks using a dependency array
    // const check=useCallback(()=>{
    //     console.log("clicked");
    // },[productQuantity])

    // use of usecallback hooks with no dependency array
    const check=useCallback(()=>{
        console.log("clicked");
    },[])

    const pdetails=product.length>0 ? product.map((item , index)=>{
        return(
            <ul className="list-group mb-3" key={index}>
                <li className="list-group-item p-1">{ item.pname }</li>
                <li className="list-group-item p-1">{ item.pprice }</li>
                <li className="list-group-item p-1">{ item.pquantity }</li>
                <input 
                type="text" 
                placeholder="Enter your quantity" 
                style={{ borderWidth:2, borderColor:'red', borderStyle:'solid' }} 
                onChange={setQuanitty}
                />
                <input type="submit" value="add" className="btn btn-success" onClick={()=>
                {
                    addToCart(item.pid, item.pname)
                }} />
            </ul>
        )
    }) : <p>No product yet</p>
    return(
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                { pdetails }
                            </div>
                            <div className="col-md-6">
                                <Cart check={check} cartCount={cartCount} cartProduct={cartProduct} />
                            </div>
                        </div>
                    </div>
    )
}

export default withContext(Dashboard);