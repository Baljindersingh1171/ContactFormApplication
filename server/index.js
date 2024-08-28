require("dotenv").config();
const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const contactroutes = require("./routes/contactroutes");
app.use(cors());
app.use(express.json());
app.use("/api/v1", contactroutes);
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`server is listening on port${port}`);
    });
  } catch (error) {
    console.log("error in starting the server", error.message);
    process.exit(1);
  }
};
startServer();
