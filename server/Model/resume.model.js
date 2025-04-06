import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    resumeId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    summery: {
      type: String,
    },
    experience: [
      {
        title: {
          type: String,
        },
        companyName: {
          type: String,
        },
        city: { type: String },
        state: {
          type: String,
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        currentlyWorking: {
          type: Boolean,
        },

        workSummery: {
          type: String,
        },
      },
    ],
    education: [
      {
        universityName: {
          type: String,
        },
        degree: {
          type: String,
        },
        major: {
          type: String,
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    skills: [
      {
        name: {
          type: String,
        },
        rating: {
          type: Number,
        },
      },
    ],
    themeColor: {
      type: String,
      default: "#A52A2A",
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
