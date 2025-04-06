import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
