import { useContext } from "react"
import { GlobalContext } from "../shared/context/GlobalContext"
import { Navigate } from "react-router"
import ProfileCard from "../entities/user/api/ui/profileCard"

export default function ProfilePage() {
    const {user} = useContext(GlobalContext)
    if (!user) return <Navigate to={'/register'} replace />
  return (
    <div className="page">
      <h1>Доброго времени суток, {user.name}</h1>
      <h2>Ваш профиль</h2>
      <ProfileCard />
    </div>
  )
}
