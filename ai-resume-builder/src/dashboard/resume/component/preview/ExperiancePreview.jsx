import React from "react";

function ExperiancePreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.experience.map((exp, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {exp?.title}
          </h2>

          <h2 className="text-xs flex justify-between">
            {exp?.companyName}, {exp.city},{exp.state}
            <span>
              {exp?.startDate} to
              {exp?.currentlyWorking ? "Present" : exp?.endDate}
            </span>
          </h2>
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: exp?.workSummery }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default ExperiancePreview;
