import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, registerSchema } from "../models";
import useToast from "../../../shared/toast/hooks/useToast";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthAPI } from "../api/AuthAPI";
import Loader from "../../../shared/loader/Loader";
import { GlobalContext } from "../../../shared/context/GlobalContext";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { setUser }: any = useContext(GlobalContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const onSubmit = async (clientData: any) => {
    setLoad(true);
    try {
      const {data} = await AuthAPI.login(clientData);
      console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        navigate('/')
      showToast("Вы успешно вошли", "win");
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
        className={errors.password ? 'error' : 'field'}
          placeholder="Ваш пароль..."
          type="text"
          id="password"
          {...register("password")}
          
          
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </label>

      <button>Войти</button>
    </form>
  );
}
