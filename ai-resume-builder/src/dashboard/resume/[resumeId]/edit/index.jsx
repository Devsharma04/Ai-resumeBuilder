import React, { useEffect, useState } from "react";
import FormSection from "../../component/FormSection";
import ResumePreview from "../../component/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

import { useParams } from "react-router-dom";
import axios from "axios";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, SetResumeInfo] = useState();
  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}get-resume/${resumeId}`
      );
      SetResumeInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, SetResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
