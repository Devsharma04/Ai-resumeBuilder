import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Download,
  Eye,
  Loader2Icon,
  MoreVertical,
  Pen,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function ResumeItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}delete-resume/${resume.resumeId}`
      );
      toast.success("Resume Deleted");
      await refreshData();
      setOpenAlert(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="group relative rounded-lg shadow hover:shadow-lg transition-all duration-300">
        {/* Resume Preview */}
        <Link
          to={`/dashboard/resume/${resume.resumeId}/edit`}
          className="block"
        >
          <div
            className="relative h-[280px] rounded-t-lg overflow-hidden border-t-4 hover:scale-[1.02] transition-all duration-300"
            style={{ borderColor: resume?.themeColor }}
          >
            <img
              src="./5052521.jpg"
              alt="Resume Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ffffff80] opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </div>
        </Link>

        {/* Resume Title and Options */}
        <div className="flex items-center justify-between px-3 py-2 bg-white rounded-b-lg">
          <h2 className="text-base font-semibold text-gray-800 truncate max-w-[85%] transition-all duration-300">
            {resume.title}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:bg-gray-100 rounded transition">
                <MoreVertical className="h-4 w-4 text-gray-700" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 text-sm shadow-lg rounded"
            >
              <DropdownMenuItem
                onClick={() =>
                  navigation(`/dashboard/resume/${resume.resumeId}/edit`)
                }
                className="flex items-center gap-2"
              >
                <Pen className="w-4 h-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigation(`/my-resume/${resume.resumeId}/view`)}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigation(`/my-resume/${resume.resumeId}/view`)}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpenAlert(true)}
                className="flex items-center gap-2 text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Alert Dialog for Delete */}
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-[#5417d7] hover:bg-[#3e0fb3]"
                onClick={onDelete}
                disabled={loading}
              >
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

export default ResumeItem;
