import React,{ useState } from 'react'



export const Signup=()=>
{

    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password1, setPassword1]=useState('');
    const [password2, setPassword2]=useState('');
    const [no, setNo]=useState(0);
    const [error, setError]=useState('');

    const updateName=(e)=>
    {
        setName(e.target.value);
    }

    const updateEmail=(e)=>
    {
        setEmail(e.target.value);
    }

    const updateP1=(e)=>
    {
        setPassword1(e.target.value)
    }
    
    const updateP2=(e)=>
    {
        setPassword2(e.target.value);
    }
    
    const updateNo=(e)=>
    {
        setNo(e.target.value);
    }
    
    const submit=()=>
    {
        if(password1!==password2)
        {
            setError("Password didn't match");
        }
        else
        {
            fetch('http://localhost:2000/users/register',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:name,
                    email:email,
                    password:password1,
                    no:no
                })
            })
            .then((res)=>
            {
                return res.json();
            })
            .then((res)=>
            {
                console.log(res);
            })
            .catch((error)=>
            {
                console.log(error);
            })
        }
    }
    return(
        <div className="container shadow p-2 w-50">
        <p className="text-center" style={{fontSize: 20 }}>Sign Up here</p>
            <div className="form-group">
              <input 
              type="text" 
              className="form-control rounded-0" 
              id="name" 
              placeholder="Enter name"
              required
              onChange={updateName}
              />
            </div>
            <div className="form-group">
              <input 
              type="email" 
              className="form-control rounded-0" 
              id="email" 
              placeholder="Enter email"
              required
              onChange={updateEmail}
              />
            </div>
            <div className="form-group">
              <input 
              type="password" 
              className="form-control rounded-0" 
              id="password1" 
              placeholder="Password"
              required
              onChange={updateP1}
              />
            </div>
            <div className="form-group">
              <input 
              type="password" 
              className="form-control rounded-0" 
              id="password2" 
              placeholder="Confirm Password"
              required
              onChange={updateP2}
              />
            </div>
            <div className="form-group">
              <input 
              type="number" 
              className="form-control rounded-0" 
              id="mobile" 
              placeholder="Mobile No"
              required
              onChange={updateNo}
              />
            </div>
            <button onClick={submit} type="submit" className="btn btn-primary rounded-0" id="submit-btn">Submit</button>
            <div className="alert alert-warning alert-dismissible fade show" style={{ display:error ? 'inline' : 'none' }} role="alert">
                <span> { error } </span>
                <button type="button" className="close" data-dismiss="alert" onClick={()=>{setError('')}}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
    </div>
    )
}