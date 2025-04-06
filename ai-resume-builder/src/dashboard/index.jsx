import { useContext, useEffect, useState } from "react";
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
    "#1A73E8",
    "#34A853",
    "#FBBC05",
    "#EA4335",
    "#9C27B0",
    "#00BCD4",
    "#F44336",
    "#FF9800",
    "#4CAF50",
    "#3F51B5",
    "#607D8B",
    "#795548",
    "#2C3E50",
    "#6A1B9A",
    "#009688",
    "#E91E63",
    "#FFC107",
    "#8BC34A",
    "#CDDC39",
    "#2196F3",
  ];

  const defaultColor = "#1A73E8"; // Set your preferred default color here

  const { resumeInfo, SetResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState(
    resumeInfo.themeColor || defaultColor
  );

  const onColorChange = async (color) => {
    setSelectedColor(color);
    SetResumeInfo({ ...resumeInfo, themeColor: color });

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}update-resume/${
          resumeInfo.resumeId
        }`,
        { themeColor: color }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Apply default only if no color is set
    if (!resumeInfo.themeColor) {
      onColorChange(defaultColor);
    }
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
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
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${
                selectedColor === color ? "ring-2 ring-offset-1 ring-black" : ""
              }`}
              style={{ background: color }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
