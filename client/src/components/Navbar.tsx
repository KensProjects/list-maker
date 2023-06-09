import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import {
  loadingAtom,
  loggedAtom,
  mobileNavAtom,
  usernameAtom,
} from "../context/Context";

import Hamburger from "./Hamburger";

export default function Navbar() {
  const [loggedIn] = useAtom(loggedAtom);
  const [username] = useAtom(usernameAtom);
  const [mobileNav, setMobileNav] = useAtom(mobileNavAtom);

  function handleClick() {
    if (mobileNav) {
      setMobileNav(false);
    }
  }

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
        {loggedIn && (
          <h2 className="text-center" onClick={() => handleClick}>
            {username}
          </h2>
        )}
        {!loggedIn && (
          <Link to="/login" onClick={handleClick}>
            Login
          </Link>
        )}
        {loggedIn && (
          <Link to="/dashboard" onClick={handleClick}>
            Dashboard
          </Link>
        )}
        {!loggedIn && (
          <Link to="/register" onClick={handleClick}>
            Register
          </Link>
        )}
        {loggedIn && (
          <Link to="/logout" onClick={handleClick}>
            Logout
          </Link>
        )}
      </div>
      {mobileNav && (
        <div
          id="mobile-nav"
          className="flex flex-col justify-center items-center relative h-screen w-screen gap-20 sm:hidden"
        >
          <div className="w-full h-full flex flex-col justify-center items-center gap-8">
            <h1 onClick={handleClick} className="pb-4 top-5">
              <Link to="/">List-Maker</Link>
            </h1>

            {loggedIn && <h2 className="text-center top-20">{username}</h2>}

            <div onClick={handleClick}>
              {!loggedIn && <Link to="/login">Login</Link>}
            </div>
            <div onClick={handleClick}>
              {loggedIn && <Link to="/dashboard">Dashboard</Link>}
            </div>
            <div onClick={handleClick}>
              {!loggedIn && <Link to="/register">Register</Link>}
            </div>
            <div onClick={handleClick}>
              {loggedIn && <Link to="/logout">Logout</Link>}
            </div>
          </div>
        </div>
      )}

      <Hamburger />
    </nav>
  );
}
