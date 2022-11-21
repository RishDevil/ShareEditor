const User = require("../model/User");
const { validateReg, validateSign } = require("../utility/validator");
const bcrypt = require("bcrypt");
const { isEmpty, get } = require("lodash");
const { getToken } = require("../utility/util");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { user_EMAIL, pass_PASS } = require("../utility/key");

exports.signin = (req, res) => {
  let err = {};
  
  validateSign(err, req).then((err) => {
    if (!isEmpty(err)) {
      res.json({ err: true, msg: err });
    } else {
      User.findOne({
        email: req.body.email,
      }).then(async (user) => {
        const log = await bcrypt.compare(req.body.password, user.password);

        if (log) {
          res.json({
            err: false,
            msg: {
              id: user.id,
              name: user.name,
              email: user.email,
              token: getToken(user),
            },
          });
        } else {
          err["password"] = "invalide password";
          res.json({ err: true, msg: err });
        }
      });
    }
  });
};
exports.check = (req, res) => {
  res.json({ msg: "dhddjdj" });
};
exports.register = async (req, res) => {
  console.log(req.body, "userrr");
  let err = {};
  const salt = await bcrypt.genSalt(10);
  const newpass = await bcrypt.hash(req.body.password, salt);

  validateReg(err, req).then((errr) => {
    if (!isEmpty(err)) {
      res.json({ err: true, msg: err });
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: newpass,
      });

      user.save().then((newuser) => {
        if (newuser) {
          res.json({
            err: false,
            msg: {
              id: newuser.id,
              name: newuser.name,
              email: newuser.email,
              token: getToken(user),
            },
          });
        } else {
          err["password"] = "invalide password";
          res.json({ err: true, msg: err });
        }
      });
    }
  });
};

exports.forget = async (req, res) => {
  User.findOne({ email: req.body.email }).then(async (user) => {
    console.log(user, "forget.............. in err");
    if (!user) {
      res.json({ err: true, msg: "invalide email" });
    } else {
      console.log(user, "forget..............in no err");

      const token = crypto.randomBytes(20).toString("hex");

      user.update({
        resetToken: token,
        resetDate: Date.now() + 36000,
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: user_EMAIL,
          pass: pass_PASS,
        },
      });
      console.log("gamil after.........................");
      const mailOption = {
        from: user_EMAIL,
        to: `${req.body.email}`,
        subject: "Passward reset link",
        text: `Link\n\n` + `http://localhost:3000/reset/${token}`,
      };
      console.log("send mail.........................");
      transporter.sendMail(mailOption, (err, response) => {
        if (err) {
          console.log("send mail error.........................", err);
          res.json({ err: true, msg: "Try later" });
        } else {
          res.json({ err: false, msg: "mail send" });
        }
      });
    }
  });
};

exports.verifyToken = async (req, res) => {
  User.findOne({
    resetToken: req.params.token,
    resetDate: {
      $gt: Date.now(),
    },
  }).then((user) => {
    console.log(user, "verify.............");
  });
};
