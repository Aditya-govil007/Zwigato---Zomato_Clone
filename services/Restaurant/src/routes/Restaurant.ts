import express  from "express";
import { isSeller,isAuth } from "../middlewares/isauth.js";
import { addRestaurant, fetchMyRestaurant, updateRestaurant, updateStatusRestaurant } from "../controllers/Restaurant.js";
import uploadFile from "../middlewares/multer.js";
const router= express.Router()

router.post("/new", isAuth, isSeller,uploadFile,addRestaurant)
router.get("/my", isAuth, isSeller,fetchMyRestaurant)
router.put("/status", isAuth, isSeller,updateStatusRestaurant)
router.put("/edit", isAuth, isSeller,updateRestaurant)

export default router; 