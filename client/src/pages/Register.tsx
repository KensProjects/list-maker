import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import {
  loadingAtom,
  loggedAtom,
  messageAtom,
  passwordAtom,
  usernameAtom,
} from "../context/Context";
import { useAtom } from "jotai";
import { FormEvent, useEffect } from "react";
import { API_BASE } from "../config/apiBase";
import axios from "axios";

export default function Register() {
  const [username] = useAtom(usernameAtom);
  const [password] = useAtom(passwordAtom);
  const [isLoggedin, setIsLoggedIn] = useAtom(loggedAtom);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [message, setMessage] = useAtom(messageAtom);

  const nav = useNavigate();

  async function checkLogout() {
    const controller = new AbortController();
    const signal = controller.signal;
    setMessage("")
    try {
      await axios.get(`${API_BASE}/auth`, {
        signal,
        withCredentials: true,
      });
      setMessage("Please log out previous user.");
      setTimeout(() => {
        nav("/");
      }, 2000);
      setMessage("")
    } catch (error) {
      return;
    }
  }

  async function handleRegistration(e: FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post(
        `${API_BASE}/register`,
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      setIsLoggedIn(true);
      nav("/dashboard");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setMessage("Error registering user!");
    }
  }

  useEffect(() => {
    checkLogout();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-3/4">
      <AuthForm type="Register" onSubmit={handleRegistration} error={message} />
    </div>
  );
}
