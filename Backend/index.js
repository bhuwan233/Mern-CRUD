const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const connectDB = require('./config/ConfigDB');
const errorHandler = require('./middlewares/errorHandler');
const trackerRoutes = require("./routes/trackerRoutes");

connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use("/api/users", userRoutes);
app.use("/api/trackers", trackerRoutes);

app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
});