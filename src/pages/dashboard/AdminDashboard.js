import React from 'react'


export default class AdminDashboard extends React.Component
{

    state={
        pname:'',
        pdes:'',
        pprice:'',
        pquantity:'',
        product:[ ]
    }
    update=(e)=>
    {
        this.state[e.target.name]=e.target.value
    }
    add=()=>
    {
        console.log(this.state);
        const { pname, pdes, pprice, pquantity }=this.state;
        this.setState({
            product:[...this.state.product,{pname,pdes, pprice, pquantity}]
        })
        fetch('http://localhost:2000/add/product',{
            method:"POST",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                pname,pdes,pprice,pquantity
            })
        })
        .then((res)=>
        {
            return res.json();
        })
        .then((res)=>
        {
            if(res.code===200)
            {
                alert("Product Added");
            }
            else
            {
                alert("Internal error");
            }
            console.log(res);
        })
        .catch((err)=>
        {
            alert("Internal error");
            console.error(err);
        })
    }
    componentDidMount()
    {
        fetch("http://localhost:2000/admin/products")
        .then((res)=>
        {
            return res.json();
        })
        .then((res)=>
        {
            console.log(res.message);
            for(let i=0;i<res.message.length;i++)
            {
                this.setState({
                    product:[...this.state.product,res.message[i]]
                })
            }
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }
    shouldComponentUpdate(nextProps, nextState)
    {
        if(this.state.pname!==nextState.pname || this.state.pdes!==nextState.pdes || this.state.pprice!==nextState.pprice || this.state.pquantity!==nextState.pquantity)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    render()
    {
        const { product }=this.state;
        const pdetails= product.length>0 ? product.map((data, index)=>
        {
            return(
                <ul className="list-group mb-2" key={index}>
                    <li>Product { index }</li>
                    <li className="list-group-item">{ data.pname }</li>
                    <li className="list-group-item">{ data.pdes }</li>
                    <li className="list-group-item">{ data.pprice }</li>
                    <li className="list-group-item">{ data.pquantity }</li>
                </ul>
            )
        }) : <p>No product yet</p>
        return(
            <React.Fragment>
                <div className="jumbotron">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card p-0">
                                <div className="card-header p-0 bg-info">
                                    <p className="text-center text-light" style={{ fontSize:30, cursor:'pointer' }}>Click Here to add new Product</p>
                                </div>
                                <div className="card-body p-1">
                                    <div>
                                        <div className="form-group">
                                            <input 
                                            type="text" 
                                            className="form-control rounded-0" 
                                            placeholder="Enter Product name"
                                            required
                                            onChange={this.update }
                                            name="pname"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input 
                                            type="text" 
                                            className="form-control rounded-0" 
                                            placeholder="Enter Product Description"
                                            required
                                            onChange={this.update}
                                            name="pdes"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input 
                                            type="number" 
                                            className="form-control rounded-0" 
                                            placeholder="Enter product price"
                                            required
                                            name="pprice"
                                            onChange={this.update}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input 
                                            type="number" 
                                            className="form-control rounded-0" 
                                            placeholder="Mobile Product quantity"
                                            required
                                            name="pquantity"
                                            onChange={this.update}
                                            />
                                        </div>
                                        <button className="btn btn-success" onClick={this.add}>ADD NEW PRODUCT</button>
                                    </div>
                                </div>
                                <div className="card-footer bg-info p-0">
                                    <p className="text-light text-center" style={{ fontSize:30 }}>List of Product</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mt-2">
                            { pdetails }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


// export default AdminDashboard;