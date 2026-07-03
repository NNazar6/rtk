import React, { useContext, useEffect, useState } from 'react'
import { LessonsAPI } from '../api';
import { GlobalContext } from '../../../shared/context/GlobalContext';
import useToast from '../../../shared/toast/hooks/useToast';
import LessonCard from './LessonCard';

export default function LessonsList() {
    const [load, setLoad] = useState(false);
    const { lessons, setLessons } = useContext(GlobalContext)
    const { showToast } = useToast()
    useEffect(() => {
        setLoad(true);
        LessonsAPI.getAllLessons()
            .then((res: any) => {
                setLessons(res.data);
                console.log(res.data);

            })
            .catch((): any => {
                setLessons(null)
                showToast("Ошибка загрузки данных", "error");
            })
            .finally(() => {
                setLoad(false);
            });
    }, [setLessons]);
    return (
        <>
        {
            lessons.length > 0 ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th >
                                    Преподаватель
                                </th>
                                <th>Дата и время</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                    {lessons.map(item => <LessonCard lesson={item} key={item.id} />)}
                    </table>
                </>
            ) : (
                <h2>Нет уроков</h2>
            )
        }
        </>
    )
}
