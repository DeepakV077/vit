// Adapter shim: re-export firebase helpers so older imports (../api/firebaseAdapter) still work.
export { signInWithEmail, signUpWithEmail, signInWithGoogle, signOut, onAuthChange } from "../firebase";
