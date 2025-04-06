import { useAuth } from "@clerk/clerk-react";
import AddResume from "./components/AddResume";
import axios from "axios";
import { useEffect, useState } from "react";
import ResumeItem from "./components/ResumeItem";
import { PropagateLoader } from "react-spinners";

function Dashboard() {
  const { getToken } = useAuth();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserResumes();
  }, [getToken]);

  const getUserResumes = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating Your resume</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {loading ? (
          <div className="col-span-full flex justify-center items-center mt-10">
            <PropagateLoader color="#5417d7" speedMultiplier={2} />
          </div>
        ) : (
          resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeItem
              resume={resume}
              key={index}
              refreshData={getUserResumes}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
