import React , {useState} from 'react';
import './App.css';
import {ContextConsumer} from "./context";
import "./firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router';

// google
import { GoogleAuthProvider } from "firebase/auth";
import {  signInWithPopup } from "firebase/auth";

// facebook
import { FacebookAuthProvider } from "firebase/auth";


const providerFB = new FacebookAuthProvider();

// google
const provider = new GoogleAuthProvider();




function App() {
  let history = useHistory();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlesignInWithEmailAndPassword = async (email, password,handleContext) => {

    try {
      const auth = getAuth();
      const data = await signInWithEmailAndPassword(auth, email, password);
      // console.log(data);
     const check = await handleContext(data.user)
      history.push("/home")
      } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const handleGoogle = (handleContext)=>{
    
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log({"google login" : user})
        const check =  handleContext(user)
      history.push("/home")
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({errorCode, errorMessage, email})
        // ...
      });
  }

  const handleFacebook = (handleContext)=>{
    
    const auth = getAuth();
    signInWithPopup(auth, providerFB)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
    
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
    
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
    
        // ...
      });

  }

  return (
    <div className="App">
      <header className="App-header">
       <div className="container">
         <div className="row">
         <h1>React firebase with Context API</h1>

         <div className="col-md-3"></div>
         <div className="col-md-6">
           <input type="text" className="form-control mt-5" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
           <input type="password" className="form-control mt-3" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
           <ContextConsumer>
          {value =>(<>
              <button className="btn btn-primary btn-lg btn-block mt-3" onClick={()=>handlesignInWithEmailAndPassword(email,password,value.handleSignInWithCredentials)}>Login with credentials</button>
           <br/>   <button className="btn btn-primary btn-lg btn-block mt-3" onClick={()=>handleGoogle(value.handleSignInWithCredentials)}>Login with Google</button>
           <br/>   <button className="btn btn-primary btn-lg btn-block mt-3" onClick={()=>handleFacebook(value.handleSignInWithCredentials)}>Login with Facebook</button>
         </> )}
          </ContextConsumer> 


         
 <ContextConsumer>
          {value => <h1>{value.user?.email}</h1>}
          </ContextConsumer>
         </div>
         <div className="col-md-3"></div>

         </div>
         </div>
       

       
      </header>
    </div>
  );
}

export default App;
