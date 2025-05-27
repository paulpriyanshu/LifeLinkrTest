import prisma from "../db/db.config.js";
import { employeeSchema } from "../utils/validations.js";


export const AddEmployee = async (req, res) => {
  // req.file contains image file
  // req.body contains other fields (like f_Name, f_Email, etc.)

  if (!req.file) {
    return res.status(400).json({ error: "Employee image is required." });
  }

  // Combine image path with the rest of the data
  const payload = {
    ...req.body,
    f_Image: `/uploads/${req.file.filename}`, // or full path depending on your setup
  };
  console.log("payload",payload)
  // Zod validation
  const userData = employeeSchema.safeParse(payload);

  if (!userData.success) {
    return res.status(400).json({ errors: userData.error.errors });
  }
  const newUser=await prisma.employee.create({
    data:{
        f_Image:userData.data.f_Image,
        f_Name:userData.data.f_Name,
        f_MobileNo:userData.data.f_MobileNo,
        f_Email:userData.data.f_Email,
        f_Designation:userData.data.f_Designation,
        f_Gender:userData.data.f_Gender,
        f_Course:userData.data.f_Course
        
    }
  })

  // If valid, send or save the data
  return res.status(200).json({
    status: "success",
    data: newUser,
  });
};


export const GetAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    return res.status(200).json({
      status: "success",
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch employees.",
    });
  }
};
export const GetEmployee = async (req, res) => {
  try {
    const {id}=req.params
    const emp_id=parseInt(id)

    const employee = await prisma.employee.findUnique({
        where:{
            f_id:emp_id
        }
    });
    return res.status(200).json({
      status: "success",
      data: employee,
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch employee.",
    });
  }
};

export const EditEmployee = async (req, res) => {
  try {
    console.log("editing")
    const { id } = req.params;
    const emp_id = parseInt(id);

    // 1. Check if the employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { f_id:emp_id },
    });

    if (!existingEmployee) {
      return res.status(404).json({ status: "error", message: "Employee not found." });
    }

    // 2. Handle image update
    let newImage = existingEmployee.f_Image;
    if (req.file) {
      newImage = `/uploads/${req.file.filename}`;
    }

    // 3. Combine incoming body and image
    const payload = {
      ...req.body,
      f_Image: newImage,
    };

    // 4. Validate with Zod schema
    const result = employeeSchema.safeParse(payload);
    if (!result.success) {
      return res.status(400).json({ status: "error", errors: result.error.errors });
    }

    // 5. Perform update
    const updatedEmployee = await prisma.employee.update({
      where: { f_id:emp_id }, // FIX: previously used "id" which doesn't match column name
      data: {
        f_Name: result.data.f_Name,
        f_Email: result.data.f_Email,
        f_MobileNo: result.data.f_MobileNo,
        f_Designation: result.data.f_Designation,
        f_Gender: result.data.f_Gender,
        f_Course: result.data.f_Course,
        f_Image: result.data.f_Image,
      },
    });

    return res.status(200).json({
      status: "success",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error editing employee:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to edit employee.",
    });
  }
};