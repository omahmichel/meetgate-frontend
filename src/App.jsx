import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateMeetingPage from "./pages/CreateMeetingPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MeetingDetailsPage from "./pages/MeetingDetailsPage";
import EditMeetingPage from "./pages/EditMeetingPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyMobilePage from "./pages/VerifyMobilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/verify-mobile"
        element={
          <ProtectedRoute>
            <VerifyMobilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />


     <Route
  path="/meetings/create"
  element={
    <ProtectedRoute>
      <CreateMeetingPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/meetings/:id"
  element={
    <ProtectedRoute>
      <MeetingDetailsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/meetings/:id/edit"
  element={
    <ProtectedRoute>
      <EditMeetingPage />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}

export default App;
