import { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import { GlobalContext } from "../../shared/context/GlobalContext";
import { AuthAPI } from "../../features/auth/api/AuthAPI";
import useToast from "../../shared/toast/hooks/useToast";

export default function Layout() {
  const { user, setUser } = useContext(GlobalContext);
  const {showToast} = useToast()
  const logout = () => {
    try {
      AuthAPI.logout()
      setUser(undefined)
      showToast('Вы вышли из аккаунта', 'win')
      localStorage.clear()
    } catch (error) {
      showToast('Ошибка выхода из аккаунта', 'error') 
    }
  }
  return (
    <>
      <header>
        <nav className="navbar">
          <ul className="list">
            <li className="list-item">
              <NavLink to={""}>Найти преподавателя</NavLink>
            </li>
            {user ? (
              <>
                <li className="list-item">
                  <NavLink to={"profile"}>Профиль</NavLink>
                </li>
                <button onClick={() => logout()}>Выйти</button>

                <li className="list-item">
                  <NavLink to={"lessons"}>Мои уроки</NavLink>
                </li>
                {user?.role === "teacher" && (
                  <li className="list-item">
                    <NavLink to={"instruments"}>Выбор инструментов</NavLink>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="list-item">
                  <NavLink to={"login"}>Войти</NavLink>
                </li>
                <li className="list-item">
                  <NavLink to={"register"}>Регистрация</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>@2026. DemoExam</footer>
    </>
  );
}
