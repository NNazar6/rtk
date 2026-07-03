import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { LessonsAPI } from "../api";
import { GlobalContext } from "../../../shared/context/GlobalContext";
import useToast from "../../../shared/toast/hooks/useToast";
import Loader from "../../../shared/loader/Loader";

export default function LessonCard({ lesson }: any) {
  const { user }: any = useContext(GlobalContext);
  const [load, setLoad] = useState(false);
  const { showToast } = useToast();
  const onSubmit = async (status: string) => {
    setLoad(false);
    
    try {
        lesson.status = status
        await LessonsAPI.patchLessons(status, lesson.id);
        showToast(
            status === "cancelled"
            ? "Заявка успешно отменена"
            : status === "rejected"
            ? "Заявка успешно отклонена"
            : "Заявка успешно принята",
        );
        window.location.reload()
    } catch (error) {
        showToast("Не удалось отменить заявку", "error");
    } finally {
        setLoad(false)
    }
  };
  if (load) return <Loader />
  return (
      <tr>
        <td>
          {user?.role === "student" ? (
            <Link to={`/teachers/${lesson.teacher.id}`}>
              {lesson.teacher.name}
            </Link>
          ) : (
            <>{lesson.student.name}</>
          )}
        </td>

        <td>
          {lesson.date} <br />
          {lesson.time}
        </td>
        <td
          style={
            (lesson.status === "pending" && {
              backgroundColor: "#fcc550ff",
            }) ||
            (lesson.status === "cancelled" && {
              backgroundColor: "#fc5050ff",
            }) ||
            (lesson.status === "rejected" && {
              backgroundColor: "#fc5050ff",
            }) ||
            (lesson.status === "accepted" && {
              backgroundColor: "#78fc50ff",
            })
          }
        >
          {(lesson.status === "rejected" && "Отклонено") ||
            (lesson.status === "cancelled" && "Отменено") ||
            (lesson.status === "accepted" && "Согласовано") ||
            (lesson.status === "pending" && (
              <>
                <p>Ожидание</p>
                {user?.role === "student" ? (
                  <button onClick={() => onSubmit("cancelled")}>
                    Отменить
                  </button>
                ) : (
                  <>
                    <button onClick={() => onSubmit("accepted")}>
                      Принять
                    </button>
                    <button onClick={() => onSubmit("rejected")}>
                      Отклонить
                    </button>
                  </>
                )}
              </>
            ))}
        </td>
      </tr>
  );
}
