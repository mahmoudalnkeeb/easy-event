import { config } from "dotenv";
config();

export default {
  dbURI: process.env.DB_URI as string,
  port: parseInt(process.env.PORT as string)
};
