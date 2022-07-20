const multer = require("multer");
const path = require("path");

let fileName = "";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, `../../public/assets/images/${fileName}`));
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".");
    if (req.query.file === "users" && req.userId) {
      cb(
        null,
        `${Date.now()}-${req.userFirstname}-${req.userLastname}.${extension[1]}`
      );
    } else {
      cb(
        null,
        `${Date.now()}-${Math.floor(Math.random() * (9999 - 0 + 1)) + 0}-${
          file.originalname
        }`
      );
    }
  },
});

const uploadSingle = multer({ storage }).single("file");

class FileController {
  static uploadUser = (req, res, next) => {
    fileName = "users";
    if (req.query.file === "users") {
      return uploadSingle(req, res, (err) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        req.pictureData = {
          imgLink: req.file.filename,
        };
        req.body = { ...req.pictureData, ...req.body };
        return next();
      });
    }
    return next();
  };
}
module.exports = FileController;
