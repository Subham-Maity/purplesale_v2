import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  host: process.env.HOST || "localhost",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  db: process.env.MONGO_URL,
};
