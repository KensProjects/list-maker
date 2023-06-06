import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import {
  loadingAtom,
  loggedAtom,
  usernameAtom,
  passwordAtom,
  messageAtom,
} from "../context/Context";
import { useAtom } from "jotai";
import { FormEvent, useEffect } from "react";
import { API_BASE } from "../config/apiBase";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useAtom(usernameAtom);
  const [password] = useAtom(passwordAtom);
  const [isLoggedin, setIsLoggedIn] = useAtom(loggedAtom);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [message, setMessage] = useAtom(messageAtom);

  const nav = useNavigate();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        `${API_BASE}/login`,
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      setIsLoggedIn(true);
      nav("/dashboard");
    } catch (error) {
      setMessage("Error logging in user!");
    } finally {
      setIsLoading(false);
    }
  }
  async function checkLogout() {
    const controller = new AbortController();
    const signal = controller.signal;
    setMessage("");
    try {
      const res = await axios.get(`${API_BASE}/auth`, {
        signal,
        withCredentials: true,
      });
      setUsername(res.data.message);
      setIsLoggedIn(true);
      setMessage("Please log out previous user.");

      setTimeout(() => {
        nav("/");
      }, 3000);
      setMessage("");
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    checkLogout();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-3/4">
      <AuthForm type="Login" onSubmit={handleLogin} error={message} />
    </div>
  );
}
