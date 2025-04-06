import { useAuth } from "@clerk/clerk-react";
import AddResume from "./components/AddResume";
import axios from "axios";
import { useEffect, useState } from "react";
import ResumeItem from "./components/ResumeItem";
function Dashboard() {
  const { getToken } = useAuth();
  const [resumeList, setResumeList] = useState([]);
  useEffect(() => {
    getUserResumes();
  }, [getToken]);
  const getUserResumes = async () => {
    const token = await getToken();
    const URL = `${import.meta.env.VITE_SERVER_URL}get-resumeData`;

    try {
      const resp = await axios.post(
        URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResumeList(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating Your resume</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeItem
              resume={resume}
              key={index}
              refreshData={getUserResumes}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
