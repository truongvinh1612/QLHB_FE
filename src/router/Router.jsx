import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App.jsx";
import AddStudent from "../component/Student/AddStudent.jsx";
import StudentDetail from "../component/Student/StudentDetail.jsx";
import StudentEdit from "../component/Student/StudentEdit.jsx";
import TeacherManager from "../component/Teacher/TeacherManager.jsx";
import Dashboard from "../component/Home/Dashboard.jsx";
import StudentManager from "../component/Student/StudentManager.jsx";
import TeacherDetail from "../component/Teacher/TeacherDetail.jsx";
import TeacherEdit from "../component/Teacher/TeacherEdit.jsx";
import AddTeacher from "../component/Teacher/AddTeacher.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/student-manager",
        element: <StudentManager />,
      },
      {
        path: "/addStudent",
        element: <AddStudent />,
      },
      {
        path: "/student-detail/:id",
        element: <StudentDetail />,
      },
      {
        path: "/student-edit/:id",
        element: <StudentEdit />,
      },
      {
        path: "/teacher-manager",
        element: <TeacherManager />,
      },
      {
        path: "/teacher-detail/:id",
        element: <TeacherDetail />,
      },
      {
        path: "/teacher-edit/:id",
        element: <TeacherEdit />,
      },
      {
        path: "/addTeacher",
        element: <AddTeacher />,
      },
    ],
  },
]);

export default router;
