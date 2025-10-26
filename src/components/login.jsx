import { useState } from "react";
import { auth } from "../Firebase/firebase"; // ✅ Import from firebase.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const getFriendlyErrorMessage = (errorCode) => {
  const errorMessages = {
    "auth/invalid-credential": "Invalid email or password. Please try again.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Try again.",
    "auth/too-many-requests": "Too many attempts. Try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/email-already-in-use": "Email is already registered.",
    "auth/invalid-email": "Invalid email format.",
    "auth/missing-password": "Please enter a password.",
  };

  return (
    errorMessages[errorCode] || "An unknown error occurred. Please try again."
  );
};

const initialValue = { email: "", password: "" };

function Login() {
  const [inp, setInp] = useState(initialValue);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange({ target }) {
    setInp({ ...inp, [target.name]: target.value });
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, inp.email, inp.password); // ✅ Uses exported auth
      setInp(initialValue);
      navigate("/");
    } catch (error) {
      setError(getFriendlyErrorMessage(error.code));
    }
  };

  return (
    <div className="login">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={inp.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={inp.password}
          name="password"
          onChange={handleChange}
        />

        <button type="submit">Login</button>
        {error && <p className="form__error">{error}</p>}
        <p>
          Not a user?<Link to="/signup"> Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
