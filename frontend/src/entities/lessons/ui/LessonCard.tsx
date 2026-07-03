import { useState } from "react";
import { Link } from "react-router";
import { LessonsAPI } from "../api";

export default function LessonCard({ lesson }) {
    const [load, setLoad] = useState(false)
    const onCancelled = async (id) => {
        setLoad(false)
        try {
            await LessonsAPI.patchLessons(id)
        } catch (error) {
            
        }
    }
    return (
            <tbody>
                <tr>
                    <td >
                        <Link to={`/teachers/${lesson.teacher.id}`}>
                            {lesson.teacher.name}
                        </Link>
                    </td>

                    <td>
                        {lesson.date} <br />
                        {lesson.time}
                    </td>
                    <td style={
                        lesson.status === 'pending' && {
                            backgroundColor: '#fcc550ff'
                        } ||
                        lesson.status === 'cancelled' && {
                            backgroundColor: '#fc5050ff'
                        } ||
                        lesson.status === 'rejected' && {
                            backgroundColor: '#fc5050ff'
                        } ||
                        lesson.status === 'success' && {
                            backgroundColor: '#78fc50ff'
                        }
                    }>
                        {lesson.status === 'rejected' && 'Отклонено'
                            || lesson.status === 'cancelled' && 'Отменено'
                            || lesson.status === 'pending' && (
                                <>
                                    <p>Ожидание</p>
                                    <button>Отменить</button>
                                </>
                            )
                        }
                    </td>
                </tr>

            </tbody>
    )
}
