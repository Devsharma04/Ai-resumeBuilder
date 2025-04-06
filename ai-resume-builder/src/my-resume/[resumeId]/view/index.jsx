import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/component/ResumePreview";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  XIcon,
} from "react-share";

function ViewResume() {
  const [resumeInfo, SetResumeInfo] = useState();
  const { resumeId } = useParams();
  const [showShareOptions, setShowShareOptions] = useState(false);
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
  const HandleDownload = () => {
    window.print();
  };

  const URL =
    import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view";
  const title = "Check Out my Resume";
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, SetResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            {" "}
            Your Resume is Ready
            <p className="text-center text-gray-400">
              {" "}
              You can Download and share it
            </p>
          </h2>
          <div className="flex justify-between px-44 my-10">
            <Button
              onClick={HandleDownload}
              className=" bg-[#5417d7] hover:bg-[#3e0fb3]"
            >
              Download
            </Button>
            <Button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className=" bg-[#5417d7] hover:bg-[#3e0fb3]"
            >
              Share
            </Button>
          </div>
          <div
            className={`flex justify-center gap-4 mt-4 transition-all duration-300 ease-in-out
    ${
      showShareOptions
        ? "opacity-100 scale-100"
        : "opacity-0 scale-95 pointer-events-none"
    }
  `}
          >
            <FacebookShareButton url={URL}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <WhatsappShareButton url={URL} title={title} separator=":: ">
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <TwitterShareButton url={URL} title={title}>
              <XIcon size={40} round />
            </TwitterShareButton>
            <LinkedinShareButton url={URL}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
