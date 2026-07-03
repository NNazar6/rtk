import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TeacherAPI } from "../api";
import { GlobalContext } from "../../../shared/context/GlobalContext";

export default function TeacherFilter() {
  const { register, handleSubmit, watch } = useForm({});
  const [ filter ,setFilter ] = useState({})
  const [instruments, setIntruments] = useState([]);
  // /teachers?instrumentId=&studentLevels=&sortBy=rating&sortOrder=desc&limit=20&offset=0
  console.log(filter);
  
  useEffect(() => {
    TeacherAPI.getInstruments().then((res) => {
      setIntruments(res.data);
    });
  }, [setIntruments]);
  console.log(instruments);
  const onSubmit = (data) => {
    const inst =
      data.instrumentId.length >= 1 ? JSON.stringify(data.instrumentId) : "";
    const stud =
      data.studentLevels.length >= 1 ? JSON.stringify(data.studentLevels) : "";
    setFilter({instrumentId: inst, studentLevels: stud});
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {instruments.map((item: any) => (
        <label key={item.id} htmlFor={item.name}>
          {item.name}
          <input
            type="checkbox"
            id={item.name}
            value={item.id}
            {...register("instrumentId")}
          />
        </label>
      ))}
        <label htmlFor="studentLevels">
          beginner
          <input
            type="checkbox"
            id="studentLevels"
            value={"beginner"}
            {...register("studentLevels")}
          />
          advanced
          <input
            type="checkbox"
            id="studentLevels"
            value={"advanced"}
            {...register("studentLevels")}
          />
          professional
          <input
            type="checkbox"
            id="studentLevels"
            value={"professional"}
            {...register("studentLevels")}
          />
          online
          <input
            type="checkbox"
            id="studentLevels"
            value={"online"}
            {...register("studentLevels")}
          />
        </label>
      <button type="submit">go</button>
    </form>
  );
}
