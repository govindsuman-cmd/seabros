// AutoLogout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutAfter = 2 * 60 * 60 * 1000; // 2 hours
    const loginTime = localStorage.getItem("loginTime");

    if (!loginTime) return; // no user logged in

    const now = Date.now();
    const elapsed = now - parseInt(loginTime, 10);

    if (elapsed >= logoutAfter) {
      localStorage.clear();
      navigate("/login");
    } else {
      const timeout = setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, logoutAfter - elapsed);

      return () => clearTimeout(timeout);
    }
  }, [navigate]);

  return null;
};

export default AutoLogout;
