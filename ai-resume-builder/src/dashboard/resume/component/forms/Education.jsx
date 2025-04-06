import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
function Education() {
  const { resumeInfo, SetResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  useEffect(() => {
    resumeInfo?.education.length > 0 && setEducationList(resumeInfo?.education);
  }, []);
  const [educationList, setEducationList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const addNewEducation = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeEducation = () => {
    setEducationList(educationList.slice(0, -1));
  };

  const handleChange = (e, index) => {
    const newEntry = [...educationList];
    const { name, value } = e.target;
    newEntry[index][name] = value;
    setEducationList(newEntry);
  };
  const OnSave = async () => {
    const data = { education: educationList };
    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}update-resume/${params.resumeId}`,
        data
      );

      toast("Details Updated");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    SetResumeInfo({ ...resumeInfo, education: educationList });
  }, [educationList]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-[#5417d7] border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your Education Details</p>
      <div>
        {educationList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  defaultValue={item.universityName}
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  defaultValue={item.degree}
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  defaultValue={item.major}
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  defaultValue={item.startDate}
                  type={"date"}
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  defaultValue={item.endDate}
                  type={"date"}
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  defaultValue={item.description}
                  type={"date"}
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            onClick={addNewEducation}
            className=" border-[#5417d7] text-[#5417d7]"
            variant="outline"
          >
            + Add More Education
          </Button>
          <Button
            onClick={removeEducation}
            className=" border-[#5417d7] text-[#5417d7]"
            variant="outline"
          >
            - Remove
          </Button>
        </div>
        <Button
          className=" bg-[#5417d7] hover:bg-[#3e0fb3]"
          disabled={loading}
          onClick={() => OnSave()}
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
