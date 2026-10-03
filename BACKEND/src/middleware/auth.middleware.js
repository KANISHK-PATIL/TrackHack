const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "No token provided, access denied"
        });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = auth;