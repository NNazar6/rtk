import { createBrowserRouter, Navigate } from "react-router";
import Layout from "../layouts/Layout";
import NotFoundPage from "../../pages/NotFoundPage";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProfilePage from "../../pages/ProfilePage";
import MyLessonsPage from "../../pages/MyLessonsPage";
import Instruments from "../../pages/Instruments";
import TeacherProfile from "../../pages/TeacherProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <Navigate to={'/404'} />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "lessons",
        element: <MyLessonsPage />,
      },
      {
        path: "instruments",
        element: <Instruments />,
      },
      {
        path: "teachers/:id",
        element: <TeacherProfile />,
      },
      {
        path: "404",
        element: <NotFoundPage />,
      },
    ],
  },
]);
