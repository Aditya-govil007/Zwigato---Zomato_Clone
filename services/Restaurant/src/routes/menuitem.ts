import express  from "express";
import { isAuth, isSeller } from "../middlewares/isauth.js";
import { addMenuItem, deleteMenuItem, toggleMenuItemAvailavility } from "../controllers/menuitems.js";

const router= express.Router()

router.post('/new',isAuth,isSeller,addMenuItem)
router.get('/all/:id',isAuth,addMenuItem)
router.delete('/:id',isAuth,isSeller,deleteMenuItem)
router.delete('/status/:id',isAuth,isSeller,toggleMenuItemAvailavility)

export default router;