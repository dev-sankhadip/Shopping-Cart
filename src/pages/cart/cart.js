import React from 'react'
import { Link } from 'react-router-dom'


const Cart=({ check, cartCount, cartProduct })=>
{
    const cartProductDetails=cartProduct.length>0 ? cartProduct.map((item, index)=>
    {
        return(
            <ul className="list-group mb-2" key={index}>
                <li className="list-group-item">{ item.pname }</li>
                <li className="list-group-item">{ item.productQuantity }</li>
                <li className="list-group-item">{ item.email }</li>
                <Link to={'/product/'+item.pid+'/'+item.productQuantity}>
                    <button>buy now</button>
                </Link>
                {/* <button onClick={check}>click</button> */}
            </ul>
        )
    }) : <p>No Product Yet</p>
    return(
        <React.Fragment>
            <button type="button" className="btn btn-primary">
                Product in Cart <span className="badge badge-light">{ cartCount }</span>
            </button>
            <div>
                {cartProductDetails}
            </div>
        </React.Fragment>
    )
}

export default React.memo(Cart);