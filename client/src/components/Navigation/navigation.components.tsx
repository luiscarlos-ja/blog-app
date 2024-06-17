import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.hook";
import { useState } from "react";
import { GLOBAL } from "../../consts";

export default function Navigation() {
  const { authUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async () => {
    setIsLoading(true);
    await fetch(`${GLOBAL.API_URL}/auth/signout`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => {
        signOut();
        navigate("/signIn");
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error signing out", error);
      });
  };

  return (
    <>
      <nav>
        <ul>
          {isLoading && <li>Loading...</li>}
          {authUser ? (
            <>
              <li>
                <Link to="/">Posts</Link>
              </li>
              <li>
                <span>@{authUser.username}</span>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signIn">SigIn</Link>
              </li>
              <li>
                <Link to="/signUp">SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
