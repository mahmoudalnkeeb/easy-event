import app from "./app"
import envConfig from "./config/env.config";

const port = envConfig.port
const server = app.listen(port, () => console.log('Server Running on port', port))


function gracefulshutdown() {
  console.log("Shutting down");
  server.close(() => {
    console.log("HTTP server closed.");

    // When server has stopped accepting 
    // connections exit the process with
    // exit status 0        
    process.exit(0);
  });
}

process.on("SIGTERM", gracefulshutdown);
process.on("SIGINT", gracefulshutdown);
