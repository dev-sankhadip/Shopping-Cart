import React,{ createContext } from 'react';

export const AuthContext=createContext();

class AuthContextProvider extends React.Component
{
    state={
        isLoggedin:false
    }
    componentDidMount()
    {
        const token=localStorage.getItem("token");
        fetch("http://localhost:2000/users/validtoken",{
            method:"GET",
            headers:{
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
                this.setState({
                    isLoggedin:true
                })
            }
            else
            {
                this.setState({
                    isLoggedin:false
                })
            }
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }
    updateLoginStatus=(status)=>
    {
        console.log(status);
        this.setState({
            isLoggedin:status
        })
    }
    render()
    {
        return(
            <AuthContext.Provider value={{ ...this.state, updateLoginStatus:this.updateLoginStatus }}>
                { this.props.children }
            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider;