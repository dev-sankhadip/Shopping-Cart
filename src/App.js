import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/login';
import { checkLogin } from './guard/checkLogin'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import  Dashboard from './pages/dashboard/dashboard'
import { AdminLogin } from './pages/AdminLogin'
import  CheckOut  from './pages/cart/checkOut';
import AuthContextProvider from "./context/AuthContext";

class App extends React.Component
{
  render()
  {
    return(
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              { checkLogin()===true ? <Redirect to="/dashboard" /> : <Redirect to="/login" /> }
            </Route>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            {/* <Route 
            path="/dashboard" 
            render={props=>{
              return(
                <AuthContext.Consumer>
                  {context=>(
                    <Dashboard {...props} authData={context} />
                  )}
                </AuthContext.Consumer>
              )
            }}
            /> */}
            <Route path="/adminlogin" component={ AdminLogin } />
            <Route path="/admindashboard" component={ AdminDashboard } />
            <Route path="/product/:pid/:pquantity" component={CheckOut} />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    )
  }
}


export default App;
