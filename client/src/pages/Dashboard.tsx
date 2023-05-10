import ListArray from "../components/ListArray";
import ListSubmit from "../components/ListSubmit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loggedAtom, messageAtom, usernameAtom } from "../context/Context";
import { useAtom } from "jotai";
import axios from "axios";
import { API_BASE } from "../config/apiBase";

export default function Dashboard() {
  
  const nav = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useAtom(loggedAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [message, setMessage] = useAtom(messageAtom);

  async function checkLogin() {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const res = await axios.get(`${API_BASE}/auth`, {
        signal,
        withCredentials: true,
      });
      setIsLoggedIn(true);
      setUsername(res.data.message);
      return () => {
        controller.abort();
      };
    } catch (error) {
      setIsLoggedIn(false);
      setMessage("Error! User not logged in!");
      nav("/login");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-screen h-screen  gap-20 bg-gray-100">
      <ListSubmit />
      <ListArray />
    </div>
  );
}
