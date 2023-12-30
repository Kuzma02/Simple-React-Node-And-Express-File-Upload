const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Up And Running");
});

app.post("/", (req, res) => {
  if (!req.files) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.image;
  const filename = Date.now() + "_" + req.files.image.name;

  if (!file.mimetype.startsWith("image")) {
    return res.status(400).json({ msg: "Please upload image" });
  }

  const maxSize = 1024 * 1024;

  if (file.size > maxSize) {
    return res
      .status(400)
      .json({ msg: "Please upload image smaller than 1KB" });
  }

  let uploadPath = __dirname + "/uploads/" + filename;
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }
  });
  res.status(200).send({ msg: "success" });
});

app.listen(4000, () => {
  console.log("Server is listening on port 3000");
});
