import mongoose from "mongoose";
import config from "./default.js";
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URL || `mongodb://localhost:${config.port}/mydatabase`;
        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        };
        const con = await mongoose.connect(uri, options);
        // Log the connection status
        console.log(`MongoDB Connected: ` + `${con.connection.host}`);
    }
    catch (error) {
        console.log(`Error: ${error.message}`.red.bold);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=dbConnection.js.map