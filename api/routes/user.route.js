import express from "express";
import { logOut } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/logout", logOut);

export default router;
