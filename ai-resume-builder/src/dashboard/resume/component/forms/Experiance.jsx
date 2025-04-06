import React, { useEffect, useContext, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../RichTextEditor";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

function Experiance() {
  const [experiance, setExperiance] = useState([formField]);
  const { resumeInfo, SetResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    resumeInfo?.experience.length > 0 && setExperiance(resumeInfo?.experience);
  }, []);
  const handleChange = (index, e) => {
    const newEntry = [...experiance];
    const { name, value } = e.target;
    newEntry[index][name] = value;
    setExperiance(newEntry);
  };
  const addNewExperiance = () => {
    setExperiance([...experiance, { ...formField }]);
  };
  const removeExperiance = () => {
    if (experiance.length > 1) {
      setExperiance(experiance.slice(0, -1));
    }
  };
  const handleRichText = (e, name, index) => {
    const newEntry = experiance.slice();
    newEntry[index][name] = e.target.value;
    setExperiance(newEntry);
  };
  useEffect(() => {
    SetResumeInfo({
      ...resumeInfo,
      experience: experiance,
    });
  }, [experiance]);
  const onSave = async () => {
    const data = {
      experience: experiance.map(({ id, ...rest }) => rest),
    };
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
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-[#5417d7] border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experiance</h2>
      <p>Add your Professional Experiance</p>
      <div>
        {experiance.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs">Position Title</label>
                <Input
                  defaultValue={item.title}
                  name="title"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  defaultValue={item.companyName}
                  name="companyName"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input
                  defaultValue={item.city}
                  name="city"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input
                  defaultValue={item.state}
                  name="state"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  defaultValue={item.startDate}
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  defaultValue={item.endDate}
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  defaultValue={item?.workSummery}
                  onRichTextChange={(e) =>
                    handleRichText(e, "workSummery", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            onClick={addNewExperiance}
            className=" border-[#5417d7] text-[#5417d7]"
            variant="outline"
          >
            + Add More Exp
          </Button>
          <Button
            onClick={removeExperiance}
            className=" border-[#5417d7] text-[#5417d7]"
            variant="outline"
          >
            - Remove
          </Button>
        </div>
        <Button
          className=" bg-[#5417d7] hover:bg-[#3e0fb3]"
          disabled={loading}
          onClick={() => onSave()}
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Experiance;
