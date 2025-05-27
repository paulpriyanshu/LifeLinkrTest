import { Router } from "express";
import EmployeeRoutes from "./EmployeeRoutes.js"

const router=Router()

router.use("/api/v1/admin",EmployeeRoutes)


export default router

