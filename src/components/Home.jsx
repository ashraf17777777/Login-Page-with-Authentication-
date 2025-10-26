import { useContext } from "react";
import { AuthContext } from "../Context/auth";
import { auth } from "../Firebase/firebase";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="home">
        <h1>Home Page</h1>
        <h3>Welcome User!</h3>
        <p>
          {user
            ? `You are logged in as ${user.email}`
            : "You are not logged in"}
        </p>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
    </>
  );
}

export default Home;
