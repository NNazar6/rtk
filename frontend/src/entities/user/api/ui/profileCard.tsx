import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../../../shared/context/GlobalContext'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { UserAPI } from '../userAPI'
import useToast from '../../../../shared/toast/hooks/useToast'
import Loader from '../../../../shared/loader/Loader'

export default function ProfileCard() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        
    })
    const { user, setUser } = useContext(GlobalContext)
    const [show, setShow] = useState(false)
    const [load, setLoad] = useState(false)
    const {showToast} = useToast()
console.log(user);

    // const p = show ? 'input' : 'p'
    // const linkProp = show
    // ? {id: {}}

    const onSubmit = async (data) => {
        setLoad(true)
        try {
            const serverData = await UserAPI.editProfile(data)
            console.log(data);
            
            setUser(data)
            console.log(serverData);
            showToast('Вы успешно изменили профиль', 'win')
            setShow(false)
        } catch (error) {
            showToast('Не удалось изменить профиль' + error.message, 'error')
        } finally {
            setLoad(false)
        }
    }

    if (load) return <Loader />

    return (
        <div className='profile-card'>
            <div className="user-info">

                {show ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor={user.name}>
                            Имя
                            <input type="text" id={user.name} {...register('name')} />
                        </label>
                        <label htmlFor={user.email}>
                            Почта
                            <input type="text" id={user.email} {...register('email')} />
                        </label>
                        <label htmlFor={user.labelassword}>
                            Пароль
                            <input type="text" id={user.labelassword} {...register('labelassword')} />
                        </label>
                        {user.role === 'teacher' && (
                            <>
                                <label htmlFor={user.about}>
                                    О себе
                                    <input type="text" id={user.about} {...register('about')} />
                                </label>
                                <label htmlFor={user.rating}>
                                    Рейтинг
                                    <input type="text" id={user.rating} {...register('rating')} />
                                </label>
                                <label htmlFor={user.contacts}>
                                    Контакты
                                    <input type="text" id={user.contacts} {...register('contacts')} />
                                </label>
                                <label htmlFor={user.labelrise}>
                                    Стоимость за час
                                    <input type="text" id={user.labelrise} {...register('labelrise')} />
                                </label>
                                    Уровни студентов
                                    <label htmlFor="begginer">
                                    Начинающий
                                        <input type="checkbox" id='begginer' />
                                    </label>
                                    <label htmlFor="advanced">
                                    Продвинутый
                                        <input type="checkbox" id='advanced' />
                                    </label>
                                    <label htmlFor="professional">
                                    Профессиональный 
                                        <input type="checkbox" id='professional' />
                                    </label>
                                    <label htmlFor="online">
                                    Онлайн 
                                        <input type="checkbox" id='online' />
                                    </label>

                                <label htmlFor={user.labelhoto}>
                                    Ваше фото
                                    <input type="text" id={user.labelhoto} {...register('labelhoto')} />
                                </label>
                            </>
                        )}
                        <button>Готово</button>
                    </form>
                ) : (
                    <>

                        <p>
                            {user.name}
                        </p>
                        <p>
                            {user.email}
                        </p>
                        <p>
                            {user.password}
                        </p>
                        {user.role === 'teacher' && (
                            <>
                                <p>
                                    {user.about}
                                </p>
                                <p>
                                    {user.rating}
                                </p>
                                <p>
                                    {user.contacts}
                                </p>
                                <p>
                                    {user.prise}
                                </p>
                                <p>
                                    {user.studentLevels || 'Пока не определился'}
                                </p>
                                <p>
                                    {user.photo}
                                </p>
                            </>
                        )}
                    </>
                )}
                <button onClick={() => setShow(!show)}>{show ? 'x' : 'Изменить данные'}</button>

            </div>

            <Link to={'/lessons'}>Мои уроки</Link>
            {user.role === 'teacher' && (
                <Link to={'/instruments'}>Мои инструменты</Link>
            )}
        </div>
    )
}
