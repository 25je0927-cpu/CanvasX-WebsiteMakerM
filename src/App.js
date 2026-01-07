// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./components/firebase"; // your firebase.js config
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/profile";
import Login from "./components/login";
import Register from "./components/register";
import Navbar from "./components/navbar";
import CanvasBuilder from "./CanvasBuilder"; // <-- your current builder code moved here

function App() {
  const [userDetails, setuserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setuserDetails(u || null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar userDetails={userDetails} onLogout={handleLogout} />
        <Routes>
          {/* Default route: if logged in → profile, else → login */}
          <Route path="/" element={userDetails ? <Navigate to="/profile" /> : <Login />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Profile dashboard */}
          <Route path="/profile" element={userDetails ? <Profile /> : <Navigate to="/login" />} />

          {/* Builder routes */}
          <Route path="/builder" element={userDetails ? <CanvasBuilder /> : <Navigate to="/login" />} />
          <Route path="/builder/:projectId" element={userDetails ? <CanvasBuilder /> : <Navigate to="/login" />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
