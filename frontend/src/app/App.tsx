import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routers/router";
import { GlobalContext } from "../shared/context/GlobalContext";
import ToastProvider from "../shared/toast/provider/ToastProvider";

function App() {
  const [user, setUser] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [lessons, setLessons] = useState([])
  const [filter, setFilter] = useState([])
  const locUser = localStorage.getItem('user')
  useEffect(() => {
    if (locUser) {
      setUser(JSON.parse(locUser))
    }
  }, [])
  return (
    <ToastProvider>
      <GlobalContext value={{ filter, setFilter, teachers, setTeachers, user, setUser, lessons, setLessons }}>
        <RouterProvider router={router} />
      </GlobalContext>
    </ToastProvider>
  );
}

export default App;
