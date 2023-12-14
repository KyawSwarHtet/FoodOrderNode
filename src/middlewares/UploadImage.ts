import multer from "multer";
import path from "path";

// const DIR = "../client/public/images/";
const uploadImg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
    filename: (req, file, cb) => {
      // console.log("file are",file)
    cb(
      null,file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Check File Type
const filefilter = (req:any, file:any, cb:any) => {
 //Allow ext
    const filetypes = /jpeg|jpg|png|gif/;
    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
    //Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null,true)
    } else {
        cb("Error: Image Only and Check File type!")
    }
};

const uploadImgs = multer({ storage: uploadImg, limits:{fileSize:5000000},fileFilter: filefilter }).array('images',10);

// const DIR = "../client/public/images/";
const uploadSingle = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "coverimages");
  },
    filename: (req, file, cb) => {
      // console.log("file are",file)
    cb(
      null,file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


const uploadSingleImg = multer({ storage: uploadSingle, limits:{fileSize:5000000},fileFilter: filefilter }).array('coverImages');

export { uploadImgs,uploadSingleImg };
