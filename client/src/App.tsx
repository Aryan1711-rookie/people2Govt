import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage.tsx"
import Login from "./pages/Login.tsx"
import Dashboard from "./Dashboard_User/Dashboard.tsx"
import AdminDashboard from "./Dashboard_Admin/AdminDashboard.tsx"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard_user" element={<Dashboard />} />
        <Route
          path="/dashboard/issues"
          element={<Dashboard defaultTab="issues" />}
        />
        <Route path="/dashboard_admin" element={<AdminDashboard />} />
      </Routes>
      
    </>
  )
}

export default App