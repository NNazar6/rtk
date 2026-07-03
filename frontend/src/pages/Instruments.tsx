import { useContext } from "react";
import { GlobalContext } from "../shared/context/GlobalContext";
import { Navigate } from "react-router";

export default function Instruments() {
  const { user } = useContext(GlobalContext);

  if (user.role !== "teacher") {
    if (!user) {
      return <Navigate to={"/register"} replace />;
    } else {
      return <Navigate to={"/404"} replace />;
    }
  }
  return <div className="page">Instruments</div>;
}
