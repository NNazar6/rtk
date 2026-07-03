import { useState } from "react"
import { ToastContext } from "../context/ToastContext"

export default function ToastProvider({children}) {
    const [items, setItems] = useState([])

    const remove = (id: any) => {
        setItems(prev => prev.filter(el => el.id !== id))
    }
    const showToast = (mes: any, type='info') => {
        const id = Date.now()
        setItems(prev => [...prev, {mes, type, id}])
        setTimeout(() => {
            remove(id)
        }, 3000);
    }
  return (
    <ToastContext.Provider value={{showToast}}>
        {children}
        <div className="list">
            {items.map(toast => (
                <div className={`t-${toast.type}`} key={toast.id}>
                    <p className="t-mes">
                        {toast.mes}
                    </p>
                    <button onClick={() => remove(toast.id)}>x</button>
                </div>
            ))}
        </div>
    </ToastContext.Provider>
  )
}
