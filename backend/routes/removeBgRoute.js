import express from "express";
import { MulterUpload } from "../middlewares/multerUpload.js";
import { removeBgController } from "../controllers/removeBgController.js";


// Create a new router instance
const removeBgRoute = express.Router();

removeBgRoute.post("/remove_bg", MulterUpload.single("image"), removeBgController )


export default removeBgRoute