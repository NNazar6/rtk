import { useContext } from "react";
import RegisterForm from "../features/auth/ui/RegisterForm";
import { GlobalContext } from "../shared/context/GlobalContext";
import { Navigate } from "react-router";


export default function RegisterPage() {
    const {user} = useContext(GlobalContext)
    if (user) return <Navigate to='/' replace />
  return (
    <div className="page">
        <h1>Регистрация</h1>
        <RegisterForm />
    </div>
  )
}
