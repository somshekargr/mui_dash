const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

app.use(authRoutes);
app.use("/users", usersRoutes);

//Multiple files
app.post("/upload/multiple", uploadStorage.array("file", 10), (req, res) => {
  console.log(req.files);
  return res.status(200).json({ message: "Files successfully uploaded!" });
});

app.listen(8080 || process.env.PORT, () => {
  console.log("Server on...");
});
