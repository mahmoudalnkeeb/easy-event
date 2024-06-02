import mongoose from "mongoose";
import envConfig from "./env.config";


export default async function initDB() {
  const connection = await mongoose.connect(envConfig.dbURI);
  console.info(connection.connection.name)
}
