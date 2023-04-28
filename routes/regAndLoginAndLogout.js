import express from "express"
import { loginHandler, logoutHandler, registerHandler, renderLogin, renderLogout } from "../controllers/regAndLogAndLogoutAndTask.js";

const router = express.Router();


router.post("/" , registerHandler)
router.get("/login",renderLogin)
router.post("/login",loginHandler)
router.get("/logout",renderLogout)
router.post("/logout",logoutHandler)

export default router;