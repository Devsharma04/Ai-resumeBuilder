import Resume from "../Model/resume.model.js";
import { clerkClient } from "@clerk/express";
const createResume = async (req, res) => {
  try {
    const { title, resumeId, userEmail, userName } = req.body;
    const resume = await Resume.create({
      title,
      resumeId,
      userEmail,
      userName,
    });
    await resume.save();
    const ID = resume._id;
    res.status(201).json({ message: "Resume created successfully", ID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getResume = async (req, res) => {
  const userID = req.auth.userId;
  const user = await clerkClient.users.getUser(userID);
  const email = user.emailAddresses[0].emailAddress;
  const resumeDetail = await Resume.find({ userEmail: email });

  if (!resumeDetail) {
    return res.status(404).json({ message: "Resume details not found" });
  }

  res.send(resumeDetail);
};
const updateResume = async (req, res) => {
  const { resumeId } = req.params;
  const {
    firstName,
    lastName,
    address,
    jobTitle,
    phone,
    email,
    summery,
    experience,
    education,
    skills,
    themeColor,
  } = req.body;

  try {
    // Check if resume exists
    const resume = await Resume.findOne({ resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Update resume details & push experience in a single operation
    const updatedResume = await Resume.findOneAndUpdate(
      { resumeId },
      {
        $set: {
          firstName,
          lastName,
          address,
          jobTitle,
          phone,
          email,
          summery,
          experience, // Directly setting the new array
          education, // Directly setting the new array
          skills,
          themeColor,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Resume updated successfully", updatedResume });
  } catch (error) {
    console.error("Error updating resume:", error);
    res
      .status(500)
      .json({ message: "Error updating resume", error: error.message });
  }
};

const getResumeId = async (req, res) => {
  const { resumeId } = req.params;
  try {
    const resume = await Resume.findOne({ resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.send(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteResume = async (req, res) => {
  const { resumeId } = req.params;
  try {
    const resume = await Resume.findOneAndDelete({ resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createResume, getResume, updateResume, getResumeId, deleteResume };
