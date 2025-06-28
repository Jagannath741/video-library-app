const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const videoRoutes = require("./routes/videoRoutes");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected..."))
.catch((err) => console.log(err));


app.use("/api/users", userRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use("/api", videoRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/videos", require("./routes/videoRoutes"));



app.listen(PORT, () => console.log(`Listening at ${PORT}...`));