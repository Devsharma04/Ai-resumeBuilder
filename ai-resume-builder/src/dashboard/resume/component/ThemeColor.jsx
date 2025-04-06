import { useContext, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import axios from "axios";

function ThemeColor() {
  const colors = [
    "#1A73E8", // Blue
    "#34A853", // Green
    "#FBBC05", // Yellow
    "#EA4335", // Red
    "#9C27B0", // Purple
    "#00BCD4", // Cyan
    "#F44336", // Coral Red
    "#FF9800", // Orange
    "#4CAF50", // Leaf Green
    "#3F51B5", // Indigo
    "#607D8B", // Blue Gray
    "#795548", // Brown
    "#2C3E50", // Midnight Blue
    "#6A1B9A", // Deep Purple
    "#009688", // Teal
    "#E91E63", // Pink
    "#FFC107", // Amber
    "#8BC34A", // Lime Green
    "#CDDC39", // Lime
    "#2196F3", //
  ];

  const { resumeInfo, SetResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState();

  const onColorChange = async (color) => {
    setSelectedColor(color);
    SetResumeInfo({ ...resumeInfo, themeColor: color });
    const data = {
      themeColor: color,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}update-resume/${
          resumeInfo.resumeId
        }`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color, i) => (
            <div
              key={i}
              onClick={() => onColorChange(color)}
              className="h-5 w-5 rounded-full cursor-pointer hover:border-black border"
              style={{ background: color }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
