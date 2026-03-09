import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { User } from "./types";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import WhiteboardEditor from "./components/WhiteboardEditor";
import Layout from "./components/Layout";

export default function App() {

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>

      <Routes>

        {/* Login Route */}
        <Route
          path="/login"
          element={
            user
              ? <Navigate to="/" />
              : <Login onLogin={handleLogin} />
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            user
              ? <Layout user={user} onLogout={handleLogout} />
              : <Navigate to="/login" />
          }
        >

          {/* Dashboard */}
          <Route
            path="/"
            element={<Dashboard user={user!} />}
          />

          {/* Projects */}
          <Route
            path="/projects"
            element={<Projects user={user!} />}
          />

          {/* Project Details */}
          <Route
            path="/projects/:id"
            element={<ProjectDetail user={user!} />}
          />

          {/* Whiteboard Editor */}
          <Route
            path="/whiteboards/:id"
            element={<WhiteboardEditor user={user!} />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}