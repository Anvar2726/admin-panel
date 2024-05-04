import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicLayout from "./components/layout/public";
import AdminLayout from "./components/layout/admin";

import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import TeachersPage from "./pages/admin/TeachersPage";
import StudentsPage from "./pages/admin/StudentsPage";
import TeacherStudents from "./pages/admin/TeacherStudents";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
          <Route path="login" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/admin/" >
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="students/:teacherId" element={<StudentsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
