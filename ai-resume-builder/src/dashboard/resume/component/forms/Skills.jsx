import React, { useEffect, useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { data, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import "@smastrom/react-rating/style.css";
function Skills() {
  const params = useParams();
  const [skillList, setSkillList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, SetResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo && setSkillList(resumeInfo?.skills);
  }, []);

  const handleChange = (index, name, value) => {
    const newEntry = skillList.slice();
    newEntry[index][name] = value;
    setSkillList(newEntry);
  };
  const addNewSkill = () => {
    setSkillList([...skillList, { name: "", rating: 0 }]);
  };

  const removeSkill = () => {
    setSkillList(skillList.slice(0, skillList.length - 1));
  };
  const OnSave = async () => {
    const data = { skills: skillList };

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
    SetResumeInfo({ ...resumeInfo, skills: skillList });
  }, [skillList]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-[#5417d7] border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your Skills</p>
      <div>
        {skillList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border rounded-lg p-3 mb-2"
          >
            <div>
              <label className="text-xs">Name</label>
              <Input
                defaultValue={item.name}
                className="w-full"
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              defaultValue={item.rating}
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            onClick={addNewSkill}
            className=" border-[#5417d7] text-[#5417d7]"
            variant="outline"
          >
            + Add More Skills
          </Button>
          <Button
            onClick={removeSkill}
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

export default Skills;
