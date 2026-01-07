import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await set(ref(db, "Users/" + user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: "",
        createdAt: new Date().toISOString(),
      });

      toast.success("User Registered Successfully!!", { position: "top-center" });

      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6fb",
      }}
    >
      <div className="container">
        <div className="heading">Sign Up</div>

        <form className="form" onSubmit={handleRegister}>
          <div className="input-field">
            <input
              type="text"
              required
              onChange={(e) => setFname(e.target.value)}
            />
            <label>First Name</label>
          </div>

          <div className="input-field">
            <input
              type="text"
              onChange={(e) => setLname(e.target.value)}
            />
            <label>Last Name</label>
          </div>

          <div className="input-field">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="input-field">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <div className="btn-container">
            <button className="btn" type="submit">
              SIGN UP
            </button>
          </div>
        </form>

        <p style={{ textAlign: "center", marginTop: 15 }}>
          Already registered? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
