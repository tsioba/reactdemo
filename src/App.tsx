import React from 'react';
import './style.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import { Main } from "./pages/see-post/main";
import { Login } from "./pages/login";
import { NavBar } from "./components/navbar";
import { AddPost } from "./pages/create-post/addpost";

function App() {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    // Εμφάνισε ένα spinner ή κάτι άλλο ενώ φορτώνει η κατάσταση του χρήστη
    return <div>Loading...</div>;
  }

  return (
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            {!user ? (
                <Route path="*" element={<Navigate to="/login" />} />
            ) : (
                <>
                  <Route path="/" element={<Main />} />
                  <Route path="/addpost" element={<AddPost />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
            )}
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
