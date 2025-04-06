import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useState, useContext, useEffect } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "react-toastify";
import { GoogleGenAI } from "@google/genai";

function RichTextEditor({ onRichTextChange, index, defaultValue }) {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue]);
  const [loading, setLoading] = useState(false);
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
  });
  const GenerateSummeryAi = async () => {
    setLoading(true);

    if (!resumeInfo.experience[index].title) {
      toast.error("Please Add Position Title");
      return;
    }
    const PROMPT = `position titile: ${resumeInfo.experience[index].title} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags`;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: PROMPT,
      });
      const generatedHtml = response?.text
        .replace("```", "")
        .replace("html", "")
        .replace("```", "")
        .replace("<ul>", "")
        .replace("</ul>", "");
      setValue(generatedHtml);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <label className="text-xs">Summery</label>
        <Button
          onClick={GenerateSummeryAi}
          type="button"
          variant="outline"
          size="sm"
          className="relative border-[#5417d7] text-[#5417d7] px-4 py-2 rounded-md overflow-hidden 
             before:absolute before:inset-0 before:bg-[#5417d7] before:scale-x-0 before:origin-left 
             before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 
             hover:text-white transition-all duration-300 shadow-md shadow-[#5417d7]/50 cursor-pointer"
        >
          <span className="relative z-10 flex gap-2 items-center">
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>
                <Brain className="h-4 w-4" />
                Generate From AI
              </>
            )}
          </span>
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />

            <BtnBulletList />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
