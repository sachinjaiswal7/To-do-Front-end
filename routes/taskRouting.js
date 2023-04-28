import express from "express"
import { addTaskHandler, removeTaskHandler } from "../controllers/regAndLogAndLogoutAndTask.js";


const router = express.Router();
router.post("/addTask",addTaskHandler);
router.get("/removeTask",removeTaskHandler);


export default router