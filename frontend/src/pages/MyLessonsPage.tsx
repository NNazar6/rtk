import { useContext } from "react"
import { GlobalContext } from "../shared/context/GlobalContext"
import { Navigate } from "react-router"
import LessonsList from "../entities/lessons/ui/LessonsList"

export default function MyLessonsPage() {

  const { user } = useContext(GlobalContext)
  if (!user) return <Navigate to={'/register'} replace />

  return (
    <div className="page">
      <h1>
        Мои уроки
      </h1>
      <LessonsList />
    </div>
  )
}
