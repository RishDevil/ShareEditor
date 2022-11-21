const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  _id: {
    type: String,
  },
  data: {
    type: Object,
    require: true,
  },
  guestId: { type: String, require: true },
});

module.exports = mongoose.model("Document", Schema);
