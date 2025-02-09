import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/sonrisys`;

    await mongoose.connect(mongoURI); 

    console.log("Database connected");
  } catch (error) {
    console.error("Database conection error:", error);
    process.exit(1); 
  }
};

export default connectDB;