import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Welcome from "./pages/Welcome";
import { loadingAtom } from "./context/Context";
import { useAtom } from "jotai";
import Spinner from "./components/Spinner";
import { useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useAtom(loadingAtom);

  function handleLoading() {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }
  
  useEffect(() => {
    handleLoading();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full h-full relative bg-white">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
