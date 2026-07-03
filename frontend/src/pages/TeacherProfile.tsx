import { useParams } from "react-router";
import TeacherCard from "../entities/teachers/ui/TeacherCard";
import { useContext, useEffect, useState } from "react";
import { TeacherAPI } from "../entities/teachers/api";
import useToast from "../shared/toast/hooks/useToast";
import Loader from "../shared/loader/Loader";
import LessonForm from "../entities/lessons/ui/LessonForm";
import { GlobalContext } from "../shared/context/GlobalContext";

export default function TeacherProfile() {
  const { id } = useParams();
  const [teacher, setTeacher]: any = useState([])
  const { user } = useContext(GlobalContext)
  const { showToast } = useToast()
  const [load, setLoad] = useState(false)
  const [show, setShow] = useState(false)
  useEffect(() => {
    TeacherAPI.getOneTeacher(id).then(res => {
      setTeacher(res.data)
    })

  }, [])

  const callTeacher = () => {
    setLoad(true)
    try {
      if (confirm('Вы уверены что хотите совершить звонок ?')) {
        showToast('Звонок отправлен', 'win')
      } else {
        showToast('Звонок не отправлен', 'win')
      }
    } catch (error) {
      showToast('При звонке прозошла ошибка', 'error')
    }
    setLoad(false)
  }



  if (load) return <Loader />

  return (
    <div className="page">
      <h1>Страница преподавателя </h1>
      <TeacherCard item={teacher} isInteractive={false} />
      <p className="teacher-about">
        {teacher.about}
      </p>
      <a href='#' onClick={() => callTeacher()}>
        {teacher.contacts}
      </a> <br />
      {user && (
        <>
        <button className="create"
          onClick={() => setShow(!show)}>
          {show ? ('x') : ('Записаться на урок')}
        </button>
        {show && (
            <LessonForm teacher={teacher} />
          )}
        </>
          

        )}
    </div>
  );
}
