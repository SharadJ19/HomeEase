import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("🔍 Received Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access Denied: No Token Provided" });
    }

    const token = authHeader.split(" ")[1]; // ✅ Extract token correctly
    console.log("🛠 Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);
        req.user = decoded; // ✅ Store decoded user data
        next();
    } catch (error) {
        console.error("❌ JWT Verification Error:", error);
        return res.status(403).json({ error: "Invalid Token" });
    }
};
