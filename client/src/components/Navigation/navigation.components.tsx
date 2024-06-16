import { Link, Outlet } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Posts</Link>
          </li>
          <li>
            <Link to="/signIn">SigIn</Link>
          </li>
          <li>
            <Link to="/signUp">SignUp</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
