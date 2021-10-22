import React, { useState } from "react";
import { ContextConsumer } from "./utils/context";
import "./utils/firebase";
import { useHistory } from "react-router";
import { socialLogin } from "./utils/firebase/socialLogin";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { authService } from "./utils/services/auth.service";
import { AiFillGoogleSquare } from "react-icons/ai";
import { IoLogoFacebook } from "react-icons/io";
import "./App.css";

const googleprovider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function App() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handlesignInWithEmailAndPassword = (handleContext) => {
    if (email == "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (password == "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (email !== "" && password !== "") {
      authService(email, password, handleContext, history);
    }
  };

  const handleGoogle = (handleContext) => {
    socialLogin(googleprovider, GoogleAuthProvider, handleContext, history);
  };

  const handleFacebook = (handleContext) => {
    socialLogin(facebookProvider, FacebookAuthProvider, handleContext, history);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row">
            <h1>React firebase with Context API</h1>

            <div className="col-md-3"></div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mt-5"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="error-text">* Email is Required </p>}
              <input
                type="password"
                className="form-control mt-3"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="error-text">* Password is Required </p>
              )}

              <ContextConsumer>
                {(value) => (
                  <>
                    <button
                      className="btn btn-primary btn-lg btn-block mt-3 credentialsBtn m-3"
                      onClick={() =>
                        handlesignInWithEmailAndPassword(
                          value.handleSignInWithCredentials
                        )
                      }
                    >
                      Login with credentials
                    </button>

                    <button
                      className="btn btn-primary btn-lg btn-block mt-3 thirdPartySignin m-3"
                      onClick={() =>
                        handleGoogle(value.handleSignInWithCredentials)
                      }
                    >
                      <AiFillGoogleSquare className="icons-size" />
                      <span className="p-20">Sign in with Google </span>
                    </button>

                    <button
                      className="btn btn-primary btn-lg btn-block mt-1 thirdPartySignin"
                      onClick={() =>
                        handleFacebook(value.handleSignInWithCredentials)
                      }
                    >
                      <IoLogoFacebook className="icons-size" />
                      <span className="p-20">Sign in with Facebook </span>
                    </button>
                  </>
                )}
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
