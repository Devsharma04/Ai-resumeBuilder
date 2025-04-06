import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleGenAI } from "@google/genai";

function Summary({ enableNext }) {
  const { resumeInfo, SetResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [summery, setSummery] = useState();
  const [aiGenerated, setAiGenerated] = useState();
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
  });
  const prompt = `You are an expert resume writer. Given the job title below, generate a concise and professional resume summary (4-5 lines) for three experience levels: Fresher, Mid-Level, and Experienced. Job Title: ${resumeInfo.jobTitle}`;
  const params = useParams();

  useEffect(() => {
    summery && SetResumeInfo({ ...resumeInfo, summery: summery });
  }, [summery]);

  const generateSummary = async () => {
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    await setAiGenerated(JSON.parse(response.text));

    setLoading(false);
  };
  const onSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}update-resume/${params.resumeId}`,
        { summery }
      );

      toast("Details Updated");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    enableNext(true);
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-[#5417d7] border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary For Your Resume</p>
        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label htmlFor="">Add Summary</label>
            <Button
              onClick={generateSummary}
              type="button"
              variant="outline"
              size="sm"
              className="relative border-[#5417d7] text-[#5417d7] px-4 py-2 rounded-md overflow-hidden 
             before:absolute before:inset-0 before:bg-[#5417d7] before:scale-x-0 before:origin-left 
             before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 
             hover:text-white transition-all duration-300 shadow-md shadow-[#5417d7]/50 cursor-pointer"
            >
              <span className="relative z-10 flex gap-2 items-center">
                Generate From AI <Brain className="h-4" />
              </span>
            </Button>
          </div>
          <Textarea
            defaultValue={resumeInfo?.summery}
            required
            onChange={(e) => setSummery(e.target.value)}
            className="mt-5"
          />
          <div className="mt-2 flex justify-end">
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

      {aiGenerated && (
        <div>
          {" "}
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGenerated?.map((item, index) => (
            <div key={index}>
              <h2 className="font-bold my-1">Level: {item.experience_level}</h2>
              <p>{item.summary || item.resume_summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
