import React, { Component, createContext } from 'react'



const context = createContext();

class ContextProvider extends Component {

    state = {
        user :{},
    }

     handleSignInWithCredentials = (data)=>{
       this.setState({user : data})
        console.log({"state" : data})
    }
    handleSignout = ()=>{
        this.setState({user : {}})
        console.log("logout clicked")
    }

    render() {
        return (
            <context.Provider value={{ handleSignInWithCredentials : this.handleSignInWithCredentials, user : this.state.user, handleSignout : this.handleSignout}}>
                {this.props.children}
            </context.Provider>
        )
    }
}

const ContextConsumer = context.Consumer;

export {ContextProvider, ContextConsumer };