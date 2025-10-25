// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET || "change_this_in_prod";

// module.exports = function (req, res, next) {
//   const token = req.cookies.authToken;
//   if (!token) return res.status(401).json({ error: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = { id: decoded.id, email: decoded.email };
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Token invalid or expired" });
//   }
// };
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "change_this_in_prod";

module.exports = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalid or expired" });
  }
};
