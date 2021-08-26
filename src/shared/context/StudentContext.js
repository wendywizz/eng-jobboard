import React, { useContext, useEffect, useState } from "react";
import { getStudentByUserId } from "Shared/states/student/StudentDatasource";
import { useAuth } from "./AuthContext";

const StudentContext = React.createContext();

export function useStudent() {
  return useContext(StudentContext);
}

export function StudentProvider({ children }) {
  const [loaded, setLoaded] = useState(false);
  const [studentId, setStudentId] = useState();
  const { authUser } = useAuth();

  async function getData(id) {
    const { data } = await getStudentByUserId(id);

    if (data) {
      setStudentId(data.id);
      setLoaded(true);
    }
  }

  useEffect(() => {
    if (!loaded && authUser) {
      const userId = authUser.id;
      getData(userId);
    }
  }, [authUser, loaded]);

  const value = {
    studentId
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
}
