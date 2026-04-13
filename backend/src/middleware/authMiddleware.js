import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }
  
    try {
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
  };

  export const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin only" });
    }
    next();
  };