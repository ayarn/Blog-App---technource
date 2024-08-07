const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
const connectDatabase = require("./db")
const route = require("./routes/route");

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());

app.use("/api", route);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    connectDatabase(MONGODB_URL);
});