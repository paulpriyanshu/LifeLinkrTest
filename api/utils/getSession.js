import jwt from "jsonwebtoken"

export const getSession=(req,res)=>{
    console.log("entered the function")
     console.log("All cookies:", JSON.stringify(req.cookies));
    console.log("Headers:", JSON.stringify(req.headers));
    console.log("Origin:", req.headers.origin);
    const token=req.cookies["auth-token"]
      if (!token) return res.status(401).json({ user: null });
    try {
        const user=jwt.verify(token,process.env.JWT_SECRET)
        res.status(200).json({
            status:"authenticated",
            user
        })
    } catch (error) {
        res.status(403).json({ user: null });
    }


}   