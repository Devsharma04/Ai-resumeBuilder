import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import SummeryPreview from "./forms/Summary";
import Experiance from "./forms/Experiance";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to="/dashboard">
            <Button className=" bg-[#5417d7] hover:bg-[#3e0fb3]">
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              className=" bg-[#5417d7] hover:bg-[#3e0fb3]"
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
              Previous
            </Button>
          )}
          <Button
            disabled={!enableNext}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            className="flex gap-2 bg-[#5417d7] hover:bg-[#3e0fb3] "
            size="sm"
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {activeFormIndex == 1 ? (
        <PersonalDetail enableNext={(v) => setEnableNext(v)} />
      ) : null}
      {activeFormIndex == 2 ? (
        <SummeryPreview enableNext={(v) => setEnableNext(v)} />
      ) : null}
      {activeFormIndex == 3 ? <Experiance /> : null}
      {activeFormIndex == 4 ? <Education /> : null}
      {activeFormIndex == 5 ? <Skills /> : null}
      {activeFormIndex == 6 ? (
        <Navigate to={`/my-resume/${resumeId}/view`} />
      ) : null}
    </div>
  );
}

export default FormSection;
