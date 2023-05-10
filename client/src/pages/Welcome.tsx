import { useAtom } from "jotai";
import { loggedAtom, messageAtom, usernameAtom } from "../context/Context";
import axios from "axios";
import { API_BASE } from "../config/apiBase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Error() {
  const nav = useNavigate();
  const [loggedIn, setLoggedIn] = useAtom(loggedAtom);
  const [username, setUsername] = useAtom(usernameAtom);

  async function checkLogin() {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const res = await axios.get(`${API_BASE}/auth`, {
        signal,
        withCredentials: true,
      });
      setLoggedIn(true);
      setUsername(res.data.message);
      return () => {
        controller.abort();
      };
    } catch (error) {
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className=" flex justify-center items-center w-screen h-screen text-center">
      {loggedIn ? (
        <h1 className="font-medium text-pink-700 text-2xl">
          Please start posting by navigating to the dashboard!
        </h1>
      ) : (
        <h1 className="font-medium text-orange-700 text-2xl">
          Welcome! This site can be used to make simple notes! Please login or
          register to get started!
        </h1>
      )}
    </div>
  );
}
