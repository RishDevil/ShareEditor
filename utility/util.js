const jwt = require("jsonwebtoken");

const getToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    "abcdefghijk"
  );
};
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token.slice(7, token.length), "abcdefghijk", (err, decode) => {
      if (err) {
        return res.json({ err: true, msg: { token: "invalid token" } });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.json({ err: true, msg: { token: "login first" } });
  }
};
const isAuthSocket = (token) => {
  let user = null;
  console.log(token, " token");
  if (token) {
    jwt.verify(token, "abcdefghijk", (err, decode) => {
      if (err) {
        return false;
      }
      user = decode;
      console.log(user, " decode");
      return user;
    });
  } else {
    return user;
  }
};

module.exports = { getToken, isAuth, isAuthSocket };
