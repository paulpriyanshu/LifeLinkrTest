import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  const token = req.cookies['auth-token'];
  console.log("token",token)

  if (!token) {
    return res.status(401).json({ message: 'Access token missing or malformed' });
  }


  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = user; 
    next(); 
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

