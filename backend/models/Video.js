const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  VideoId: { type: Number, required: true, unique: true },
  Title: { type: String, required: true },
  Url: { type: String, required: true },
  Description: { type: String, required: true },
  Likes: { type: Number, default: 0 },
  Dislikes: { type: Number, default: 0 },
  Views: { type: Number, default: 0 },
  Comments: { type: [String], default: [] },
  CategoryId: { type: Number, required: true }
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
