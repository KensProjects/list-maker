import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { loggedAtom, mobileNavAtom, usernameAtom } from "../context/Context";

import Hamburger from "./Hamburger";

export default function Navbar() {
  const [loggedIn] = useAtom(loggedAtom);
  const [username] = useAtom(usernameAtom);
  const [mobileNav, setMobileNav] = useAtom(mobileNavAtom);

  return (
    <nav
      id="top"
      className="bg-gradient-to-r from-cyan-500 to-blue-500 flex sm:justify-between justify-center items-center text-xl gap-8 relative sm:h-32 p-12 sm:p-4 text-white sm:w-screen"
    >
      <h1 className="hidden sm:flex">
        <Link to="/">List-Maker</Link>
      </h1>

      <div
        id="regular-view-nav"
        className="sm:flex gap-12 items-center justify-end absolute right-8 hidden "
      >
        {loggedIn && <h2 className="text-center">Welcome, {username}!</h2>}
        {!loggedIn && <Link to="/login">Login</Link>}
        {loggedIn && <Link to="/dashboard">Dashboard</Link>}
        {!loggedIn && <Link to="/register">Register</Link>}
        {loggedIn && <Link to="/logout">Logout</Link>}
      </div>
      {mobileNav && (
        <div
          id="mobile-nav"
          className="flex flex-col justify-center items-center relative h-screen w-screen gap-20 sm:hidden"
        >
          <h1 onClick={() => setMobileNav((prev) => !prev)} className="absolute pb-4 top-5">
            <Link to="/">List-Maker</Link>
          </h1>

          {loggedIn && <h2 className="text-center absolute top-20">Welcome {username}!</h2>}

          <div onClick={() => setMobileNav((prev) => !prev)}>
            {!loggedIn && <Link to="/login">Login</Link>}
          </div>
          <div onClick={() => setMobileNav((prev) => !prev)}>
            {loggedIn && <Link to="/dashboard">Dashboard</Link>}
          </div>
          <div onClick={() => setMobileNav((prev) => !prev)}>
            {!loggedIn && <Link to="/register">Register</Link>}
          </div>
          <div onClick={() => setMobileNav((prev) => !prev)}>
            {loggedIn && <Link to="/logout">Logout</Link>}
          </div>
        </div>
      )}

      <Hamburger />
    </nav>
  );
}
