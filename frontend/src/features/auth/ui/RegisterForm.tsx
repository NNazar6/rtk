import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../models";
import useToast from "../../../shared/toast/hooks/useToast";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthAPI } from "../api/AuthAPI";
import Loader from "../../../shared/loader/Loader";
import { GlobalContext } from "../../../shared/context/GlobalContext";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const { setUser } = useContext(GlobalContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const onSubmit = async (clientData) => {
    setLoad(true);
    try {
      const {data} = await AuthAPI.register(clientData);
      console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        navigate('/')
      showToast("Вы зарегистрировались", "win");
    } catch (error) {
      showToast("Произошла ошибка", "error");
    } finally {
      setLoad(false);
    }
  };

  if (load) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="name"
        style={
          errors.name && {
            color: "red",
          }
        }
      >
        Имя
        <input
          placeholder="Ваше имя..."
          type="text"
          id="name"
          {...register("name")}
          style={
            errors.name && {
              border: "1px solid red",
            }
          }
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </label>
      <label
        htmlFor="email"
        style={
          errors.email && {
            color: "red",
          }
        }
      >
        Почта
        <input
          placeholder="Ваша почта..."
          type="text"
          id="email"
          {...register("email")}
          style={
            errors.email && {
              border: "1px solid red",
            }
          }
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </label>
      <label
        htmlFor="password"
        style={
          errors.password && {
            color: "red",
          }
        }
      >
        Пароль
        <input
          placeholder="Ваш пароль..."
          type="text"
          id="password"
          {...register("password")}
          style={
            errors.password && {
              border: "1px solid red",
            }
          }
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </label>
      <div className="role-fields">
        <p>Роль</p>
        <label
          htmlFor="role-student"
          style={
            errors.role && {
              color: "red",
            }
          }
        >
          Студент
          <input
            type="radio"
            value={"student"}
            id="role-student"
            {...register("role")}
            style={
              errors.role && {
                border: "1px solid red",
              }
            }
          />
        </label>
        <label
          htmlFor="role-teacher"
          style={
            errors.role && {
              color: "red",
            }
          }
        >
          Учитель
          <input
            type="radio"
            value={"teacher"}
            id="role-teacher"
            {...register("role")}
            style={
              errors.role && {
                border: "1px solid red",
              }
            }
          />
        </label>
        {errors.role && <p style={{ color: "red" }}>{errors.role.message}</p>}
      </div>

      <button>Создать аккаунт</button>
    </form>
  );
}
