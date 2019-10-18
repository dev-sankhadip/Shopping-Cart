import React from 'react'
import { AuthContext } from '../context/AuthContext'

export const withContext=(WrappedComponent)=>
{
    return props=>{
        return(
            <AuthContext.Consumer>
            {(context)=>{
                return(
                    <WrappedComponent {...props } context={context} />
                )
            }}
        </AuthContext.Consumer>
        )
    }
}
