import { Router } from "express";
import { AdminLogin } from "../controller/AdminController.js";
import { AddEmployee, deleteEmployee, EditEmployee, GetAllEmployees, GetEmployee } from "../controller/EmployeeController.js";
import multer from "multer";
import path from "path"
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = Router()

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "employee-" + unique + ext);
  },
});

const upload = multer({ storage });

router.post(
  "/login",
  AdminLogin
);
router.post("/createEmployee",authMiddleware,upload.single("f_Image"),AddEmployee)
router.get("/allEmployees",authMiddleware,GetAllEmployees)
router.get("/employee/:id",authMiddleware,GetEmployee)
router.post("/deleteEmployee/:id",authMiddleware,deleteEmployee)
router.post("/editEmployee/:id",authMiddleware,upload.single("f_Image"),EditEmployee)
// router.post("/upload",AddEmployee)

export default router