import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

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

const initialState = { email: "", password: "", confirmPassword: "" };

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.password !== input.confirmPassword)
      return setError("Password don't match");

    try {
      await createUserWithEmailAndPassword(auth, input.email, input.password);
      setInput(initialState);
      navigate("/");
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code));
    }
  };

  return (
    <div className="signup">
      <h1>Sign Up Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={input.email}
          autoComplete="off"
          onChange={handleChange}
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={input.password}
          autoComplete="off"
          onChange={handleChange}
          name="password"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="confirmPassword"
          value={input.confirmPassword}
          autoComplete="off"
          onChange={handleChange}
          name="confirmPassword"
        />
        <button type="submit">Submit</button>
        <p className="form__error">{error}</p>
      </form>
      <p>
        Already a user? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;
