import "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const authService = async (email, password, handleContext, history) => {
  try {
    const auth = getAuth();
    const data = await signInWithEmailAndPassword(auth, email, password);
    await handleContext(data.user);
    history.push("/home");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
