import { useContext, useState } from "react"
import { LessonsAPI } from "../api"
import useToast from "../../../shared/toast/hooks/useToast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { lessonSchema } from "../models"
import { GlobalContext } from "../../../shared/context/GlobalContext"
import Loader from "../../../shared/loader/Loader"

export default function LessonForm({ teacher }) {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(lessonSchema)
    })
    const {user} = useContext(GlobalContext)
    const { showToast } = useToast()
    const [load, setLoad] = useState(false)
    const onCreateLesson = async (data) => {
        setLoad(true)
        try {
            await LessonsAPI.createLesson({ teacherId: teacher.id, ...data  })

            showToast(`Ваша заявка успешно отправлена ${teacher.name} на рассмотрение!`, 'win')
        } catch (error) {
            showToast(`Ваша заявка, к сожалению, не отправлена`, 'error')
            
        } finally {
            setLoad(false)
        }
    }
    if (load) return <Loader />
    return (
        <form onSubmit={handleSubmit(onCreateLesson)}>
            <label htmlFor="date">
                Дата
                <input type="date" id="date" {...register('date')} />
                {errors.date && <p>{errors.date.message}</p>}
            </label> <br />
            <label htmlFor="time">
                Время
                <input type="time" id="time" {...register('time')} />
                {errors.time && <p>{errors.time.message}</p>}
            </label> <br />
            <label htmlFor="comment">
                Комментарий
                <input type="text" id="comment" {...register('comment')} />
                {errors.comment && <p>{errors.comment.message}</p>}
            </label> <br />

            <button className="create">Отправить заявку</button>
        </form>
    )
}   
