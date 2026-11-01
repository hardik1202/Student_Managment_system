import { lazy, Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Spinner from "./components/Spinner";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Students = lazy(() => import("./pages/Students"));
const Contact = lazy(() => import("./pages/Contact"));
const Resources = lazy(() => import("./pages/Resources"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Protected({ children }) {
  const token = localStorage.getItem("sms_token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const [dark, setDark] = useState(document.documentElement.classList.contains("dark"));

  const onToggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <>
      <NavBar dark={dark} onToggleTheme={onToggleTheme} />
      <Suspense fallback={<Spinner label="Loading page..." />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/students"
            element={
              <Protected>
                <Students />
              </Protected>
            }
          />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
