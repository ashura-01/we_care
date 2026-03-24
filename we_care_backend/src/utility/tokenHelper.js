const jwt = require("jsonwebtoken");

exports.EncodeToken = (email, _id) => {
  let key = process.env.JWT_KEY || "your-secret-key";
  let expire = process.env.JWT_Expire_Time || "7d";
  let payload = { email, _id };

  return jwt.sign(payload, key, { expiresIn: expire });
};

exports.DecodeToken = (token) => {
  try {
    let key = process.env.JWT_KEY || "your-secret-key";
    let decode = jwt.verify(token, key);
    return decode;
  } catch (error) {
    return null;
  }
};