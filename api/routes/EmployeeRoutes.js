import { Router } from "express";
import { AdminLogin } from "../controller/AdminController.js";
import { AddEmployee, EditEmployee, GetAllEmployees, GetEmployee } from "../controller/EmployeeController.js";
import multer from "multer";
import path from "path"
import express from "express"

const router = Router()

// Setup storage
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
router.post("/createEmployee",upload.single("f_Image"),AddEmployee)
router.get("/allEmployees",GetAllEmployees)
router.get("/employee/:id",GetEmployee)
router.post("/editEmployee/:id",upload.single("f_Image"),EditEmployee)
// router.post("/upload",AddEmployee)

export default router