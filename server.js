const mongoose = require("mongoose");
const { MONGOURI } = require("./utility/key");
const Document = require("./model/Document");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const user = require("./route/UserRoute");
const socket = require("socket.io");
const { isAuth, isAuthSocket } = require("./utility/util");
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", user);
const io = socket(server);

try {
  mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  console.log("conected....to mongoose");
} catch (error) {
  console.log(error);
}
app.get("/doc/", isAuth, async (req, res) => {
  const dat = await Document.find({ userId: req.user.id }).populate("userId");
  res.json({ data: dat });
});
app.get("/docInvite/", isAuth, async (req, res) => {
  const dat = await Document.find({ guestId: req.user.name }).populate(
    "userId"
  );
  res.json({ data: dat });
});
io.on("connection", (socket) => {
  socket.on("get-documents", async ({ documentId, user, participant }) => {
    // console.log("connect socket ", req.user);
    console.log(user, " datauser");
    //  let userData;
    // userData = await isAuthSocket(user.token);
    // console.log(userData, " token user");
    // if (userData) {
    const document = await createOrGetDocuemnt(
      documentId,
      user.id,
      participant
    );
    socket.join(documentId);
    console.log(document.data, "ddd");
    socket.emit("load-documents", document.data);
    // }

    socket.on("save-documents", async (document) => {
      await Document.findByIdAndUpdate(documentId, { data: document });
    });
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
  });

  console.log("connected");
});

const createOrGetDocuemnt = async (documentId, userid, participant) => {
  console.log(documentId, " doc");
  if (documentId == null) return;

  const document = await Document.findOne({ _id: documentId, userId: userid });

  if (document) return document;

  return await Document.create({
    _id: documentId,
    data: "",
    userId: userid,
    guestId: participant,
  });
};

server.listen(4000, () => {
  console.log("connected to server");
});
