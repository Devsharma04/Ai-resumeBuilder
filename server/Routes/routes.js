import express from "express";
import {
  createResume,
  getResume,
  updateResume,
  getResumeId,
  deleteResume,
} from "../Controller/controller.js";
import { requireAuth } from "@clerk/express";
export const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("server is running");
});

routes.post("/user-resumes", requireAuth(), createResume);
routes.post("/get-resumeData", requireAuth(), getResume);
routes.post("/update-resume/:resumeId", updateResume);
routes.get("/get-resume/:resumeId", getResumeId);
routes.get("/", (req, res) => {
  res.send("server is running");
});
routes.delete("/delete-resume/:resumeId", deleteResume);
