import mongoose from "mongoose";

const connect = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log("Failed to connect to database..... MONGO_URI is not set");
    process.exit(1);
  }

  try {
    console.log("Attempting to connect to database.....");
    await mongoose.connect(uri, {});
    console.log("Connected to database.....");
  } catch (error) {
    console.log("Failed to connect to database.....", error.message);
    process.exit(1);
  }
};

export default connect;
