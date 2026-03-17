
const { DecodeToken } = require("../utility/tokenHelper");

module.exports = (req, res, next) => {
    // 1. Skip check for OPTIONS (CORS Preflight)
    if (req.method === "OPTIONS") return next();

    let authHeader = req.headers.authorization || "";
    let token = authHeader.replace("Bearer ", "").trim() || req.cookies['token'];

    if (!token || token === "null" || token === "undefined") {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    let decoded = DecodeToken(token);
    if (!decoded) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.headers.email = decoded.email;
    req.headers._id = decoded._id;
    next();
};