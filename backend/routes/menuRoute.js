import express from "express";
import { listMenu,getMenuItem } from "../controllers/menuController.js";

const menuRouter = express.Router();

// GET all menu items
menuRouter.get("/listMenu", listMenu);
menuRouter.get("/getItem", getMenuItem);

export default menuRouter;