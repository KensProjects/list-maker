import { useEffect } from "react";
import LogoutForm from "../components/LogoutForm";
import axios from "axios";
import { API_BASE } from "../config/apiBase";
import { useAtom } from "jotai";
import {
  loadingAtom,
  loggedAtom,
  messageAtom,
  usernameAtom,
} from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function Logout() {
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
      setMessage("Error!");
      nav("/");
      setMessage("");
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-white">
      <LogoutForm />
    </div>
  );
}
