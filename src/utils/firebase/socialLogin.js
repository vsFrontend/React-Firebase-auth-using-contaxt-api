import { getAuth } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

export const socialLogin = async (
  provider,
  authProvider,
  handleContext,
  history
) => {
  const auth = getAuth();
  await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = authProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      handleContext(user);
      history.push("/home");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = authProvider.credentialFromError(error);
      console.log({ errorCode, errorMessage, email });
    });
};
