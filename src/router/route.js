import { Router } from "express";
import controller from "../controller/controller";

const router = Router();

router.get("/", controller.index); // ALL NOTES

router.get("/add", controller.add); // NOTE CREATION'S VIEW

router.post("/add", controller.create); // CREATE THE NEW NOTE

router.get("/edit/:id", controller.viewEdit);


export default router;