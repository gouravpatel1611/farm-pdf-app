import { Router } from "express";
import { generateReportController } from "../controller/makepdf.controller.js";

const router = Router();

router.post("/make-pdf", generateReportController);

export default router;
