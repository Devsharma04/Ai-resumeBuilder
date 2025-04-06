import React from "react";
import PersonalPreview from "./preview/PersonalPreview";
import SummeryPreview from "./preview/SummeryPreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import ExperiancePreview from "./preview/ExperiancePreview";
import EducationPreview from "./preview/EducationPreview";
import Skillpreview from "./preview/Skillpreview";
function ResumePreview() {
  const { resumeInfo, SetResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      <PersonalPreview resumeInfo={resumeInfo} />
      <SummeryPreview resumeInfo={resumeInfo} />
      <ExperiancePreview resumeInfo={resumeInfo} />
      <EducationPreview resumeInfo={resumeInfo} />
      <Skillpreview resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;
