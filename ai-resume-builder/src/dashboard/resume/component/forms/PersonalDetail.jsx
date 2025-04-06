import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";

import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
function PersonalDetail({ enableNext }) {
  const { resumeInfo, SetResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const handelInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    SetResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };
  const onSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}update-resume/${params.resumeId}`,
        formData
      );
      toast("Details Updated");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    enableNext(true);
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-[#5417d7] border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              defaultValue={resumeInfo?.firstName}
              name="firstName"
              required
              onChange={handelInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              defaultValue={resumeInfo?.lastName}
              name="lastName"
              required
              onChange={handelInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              defaultValue={resumeInfo?.jobTitle}
              name="jobTitle"
              required
              onChange={handelInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              defaultValue={resumeInfo?.address}
              name="address"
              onChange={handelInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Phone</label>
            <Input
              defaultValue={resumeInfo?.phone}
              name="phone"
              required
              onChange={handelInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Email</label>
            <Input
              defaultValue={resumeInfo?.email}
              name="email"
              required
              onChange={handelInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button
            disabled={loading}
            type="submit"
            className=" bg-[#5417d7] hover:bg-[#3e0fb3]"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
