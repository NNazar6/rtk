import { useContext } from "react"
import { GlobalContext } from "../shared/context/GlobalContext"
import { Navigate } from "react-router"

export default function ProfilePage() {
    const {user} = useContext(GlobalContext)
    if (!user) return <Navigate to={'/register'} replace />
  return (
    <div className="page">ProfilePage</div>
  )
}
