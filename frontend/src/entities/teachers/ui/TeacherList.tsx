import { useContext, useEffect, useState } from "react";
import useToast from "../../../shared/toast/hooks/useToast";
import { TeacherAPI } from "../api";
import Loader from "../../../shared/loader/Loader";
import TeacherCard from "./TeacherCard";
import { GlobalContext } from "../../../shared/context/GlobalContext";
import { useForm } from "react-hook-form";

export default function TeacherList() {
  const [load, setLoad] = useState(false);
  const { showToast } = useToast();
  const { teachers, setTeachers, filter, setFilter }: any = useContext(GlobalContext);
  const { register, handleSubmit, watch } = useForm({});
  const {instruments, setIntruments} = useContext(GlobalContext)
  const [selectedInstruments, setSelectedInstruments] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
  const [currentSort, setCurrentSort] = useState([])
  // /teachers?instrumentId=&studentLevels=&sortBy=rating&sortOrder=desc&limit=20&offset=0

  
  useEffect(() => {
    TeacherAPI.getInstruments().then((res) => {
      setIntruments(res.data);
    });
  }, [setIntruments]);
  
  const onSubmit = (data) => {
    const newFilter = {
      ...filter,
      instrumentId: selectedInstruments,
      studentLevels: selectedLevels, 
    }
    
    setFilter(newFilter)
  };


  useEffect(() => {
    setLoad(true);
    TeacherAPI.getAllTeachers(filter)
      .then((res: any) => setTeachers(res.data.items))
      .catch((): any => showToast("Ошибка загрузки данных", "error"))
      .finally(() => setLoad(false));
  }, [setTeachers, filter]);

  if (load) return <Loader />;
  console.log('----------------------------------------------');

  return (
    <div >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="instruments-filter">
          <h3>Инструменты</h3>
          {instruments.map(item => (
            <label htmlFor={item.name}>
              <input type="checkbox" id={item.name}
              checked={selectedInstruments.includes(item.id)}
              onChange={(e) => {
                if(e.target.checked) {
                  setSelectedInstruments(prev => [...prev, item.id])
                } else {
                  setSelectedInstruments(prev => prev.filter(id => id !== item.id))
                }
              } } />
              {item.name}
            </label>
          ))}
        </div>

        <div className="levels-filter">
          <h3>Уровни учеников</h3>
          {["beginner", "advanced", "professional", "online"].map(level => (
            <label htmlFor={level}>
              <input type="checkbox" id={level} 
              checked={selectedLevels.includes(level)} 
              onChange={e => {
                if (e.target.checked) {
                  setSelectedLevels(prev => [...prev, level])
                } else {
                  setSelectedLevels(prev => prev.filter(l => l !== level))
                }
              }}/>         
              {level}     
            </label>
          ))}
        </div>
        <button>Применить фильтр</button>
        <button onClick={() => {
          setSelectedInstruments([])
          setSelectedLevels([])
          setFilter(prev => ({
            ...prev,
            instrumentId: [],
            studentLevels: []
          }))
        }}>Сбросить фильтр</button>
        
      </form>
      <div className="teacher-list">
        {teachers.map((item): any => (
          <TeacherCard key={item.id} item={item} isInteractive={true} />
        ))}
      </div>
    </div>
  );
}
