import { useAtom } from "jotai";
import {
  loggedAtom,
  usernameAtom,
  passwordAtom,
  loadingAtom,
  messageAtom,
} from "../context/Context";
import { API_BASE } from "../config/apiBase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogoutForm() {
  const nav = useNavigate();

  const [loggedIn, setLoggedIn] = useAtom(loggedAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [message, setMessage] = useAtom(messageAtom);

  async function logoutUser() {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      setIsLoading(true);
      setMessage("");
      await axios.get(`${API_BASE}/logout`, {
        signal,
        withCredentials: true,
      });
      setUsername("");
      setPassword("");
      setLoggedIn(false);
      nav("/login");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => {
        controller.abort();
      };
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setMessage("Error while logging out!");
      setTimeout(() => {
        setMessage("");
      }, 1000);
    }
  }

  function handleCancel() {
    nav("/dashboard");
    setMessage("");
  }

  return (
    <div className="border border-black rounded-sm px-16 py-8 flex flex-col justify-center items-center gap-4">
      <h2>{message}</h2>
      <p>{username}, do you wish to logout?</p>
      <div className="flex justify-center items-center gap-4">
        <button
          type="button"
          className="bg-green-300 hover:bg-green-200 py-2 px-8"
          onClick={logoutUser}
        >
          Yes
        </button>
        <button
          type="button"
          className="bg-red-300 hover:bg-red-200 py-2 px-8"
          onClick={handleCancel}
        >
          No
        </button>
      </div>
    </div>
  );
}
