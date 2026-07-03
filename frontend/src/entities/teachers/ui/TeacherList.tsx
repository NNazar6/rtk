import { useContext, useEffect, useState } from "react";
import useToast from "../../../shared/toast/hooks/useToast";
import { TeacherAPI } from "../api";
import Loader from "../../../shared/loader/Loader";
import { Link } from "react-router";
import TeacherCard from "./TeacherCard";
import { GlobalContext } from "../../../shared/context/GlobalContext";

export default function TeacherList() {
  const [load, setLoad] = useState(false);
  const { showToast } = useToast();
  const {teachers, setTeachers} = useContext(GlobalContext);
  const [filter, setFilter] = useState({})

  useEffect(() => {
    setLoad(true);
    TeacherAPI.getAllTeachers()
      .then((res: any) => {
        setTeachers(res.data.items);
      })
      .catch((): any => {
        showToast("Ошибка загрузки данных", "error");
      })
      .finally(() => {
        setLoad(false);
      });
  }, [setTeachers]);
  if (load) return <Loader />;
  return (
    <div>
      {teachers.map((item): any => (
        <TeacherCard key={item.id} item={item} isInteractive={true} />
      ))}
    </div>
  );
}
