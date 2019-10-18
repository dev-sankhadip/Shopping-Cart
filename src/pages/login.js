import React,{ useState} from 'react';
// import { checkLogin } from '../guard/checkLogin';
// import App from '../App'


export const Login=(props)=>
{
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [error, setError]=useState('');

    const updateEmail=(e)=>
    {
        setEmail(e.target.value);
    }

    const updateP=(e)=>
    {
        setPassword(e.target.value)
    }
    
    const submit=()=>
    {
            fetch('http://localhost:2000/users/login',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email:email,
                    password:password,
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
                    localStorage.setItem("token",res.token);
                    props.history.push('/dashboard');
                }
                else
                {
                    setError("Some Error");
                    console.log("Some error");
                }
            })
            .catch((error)=>
            {
                console.log(error);
            })
    }
    return(
        <div className="container shadow p-2 w-50">
        <p className="text-center" style={{fontSize: 20 }}>Login here</p>
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
              onChange={updateP}
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