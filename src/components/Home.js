import React from "react";
import { ContextConsumer } from "../utils/context";
import "../utils/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router";
import "../App.css";

export default function Home() {
  let history = useHistory();
  const handleRoute = () => {
    history.push("/");
  };

  return (
    <div className="App">
      <header className="App-header">
        <ContextConsumer>
          {(value) =>
            Object.keys(value.user).length !== 0 ? (
              <div>
                <h1>Welcome {value.user.email} </h1>
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => {
                    const auth = getAuth();
                    signOut(auth)
                      .then(() => {
                        value.handleSignout();
                        history.push("/");
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  Signout
                </button>
              </div>
            ) : (
              handleRoute()
            )
          }
        </ContextConsumer>
      </header>
    </div>
  );
}
