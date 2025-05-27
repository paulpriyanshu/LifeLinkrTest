import z from "zod"

export const employeeSchema = z.object({
  f_Image: z.string().min(1,"Invalid image URL" ),
  f_Name: z.string().min(1, "Name is required"),
  f_Email: z.string().email("Invalid email address"),
  f_MobileNo: z.string().min(10,"Invalid email address"),
  f_Designation: z.string().min(1, "Designation is required"),
  f_Gender: z.enum(["Male", "Female", "Other"]), 
  f_Course: z.string().min(1, "Course is required"),
  f_CreateDate: z.coerce.date().optional(),
});

