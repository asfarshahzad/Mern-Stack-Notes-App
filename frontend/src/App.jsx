import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import CreateNote from "./components/CreateNote";
import PageNotFound from "./components/PageNotFound";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userContext from "./context/userContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

// ✅ React-Toastify function
export const showToast = (message, type = "info") => {
  toast(message, {
    type,
    position: "top-center",
    autoClose: 1300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      backgroundColor: "#ffffff",
      color: "#000000",
      fontWeight: "500",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    },
  });
};

function App() {
  const { user, loading } = useContext(userContext); // ✅ loading state use ki
  const [notes, setNotes] = useState([]);

  // ✅ Agar abhi verify ho raha hai, loading message dikhao
  if (loading) {
    return <Loader />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Routes>
          {/* Public Routes */}
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={!user ? <Login /> : <Navigate to={"/myNotes"} replace />} />
          <Route path="/auth/signup" element={!user ? <Signup /> : <Navigate to={"/myNotes"} replace />} />

          {/* Protected Dashboard */}
          <Route
            path="/myNotes"
            element={
              <ProtectedRoute>
                <Dashboard notes={notes} setNotes={setNotes} />
              </ProtectedRoute>
            }
          />

          {/* Protected Create Note */}
          <Route
            path="/createNote"
            element={
              <ProtectedRoute>
                <CreateNote notes={notes} setNotes={setNotes} />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;