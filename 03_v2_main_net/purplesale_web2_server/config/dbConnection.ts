import mongoose, { ConnectOptions } from "mongoose";
import colors from "colors";
import config from "./default.js";

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGO_URL || `mongodb://localhost:${config.port}/mydatabase`;

    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions;

    const con = await mongoose.connect(uri, options);

    // Log the connection status
    console.log(`MongoDB Connected: ` + `${con.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
