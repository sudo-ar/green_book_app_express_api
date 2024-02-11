const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

const checkAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "not authorized i.e. token is missing" });
    }
    token = token.split(" ")[1];
    

    jwt.verify(token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        return res
          .status(500)
          .json({ error: err.message, message: "token is not valid" });
      }

            req.body.id = authData.id;
            next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { checkAuth };
