const Video = require("../models/Video");

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving videos", error: err.message });
  }
};

// Get video by VideoId
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Error fetching video", error: err.message });
  }
};


// Add a new video
exports.addVideo = async (req, res) => {
  try {
    const newVideo = new Video({
      VideoId: req.body.VideoId,
      Title: req.body.Title,
      Url: req.body.Url,
      Description: req.body.Description,
      Likes: req.body.Likes || 0,
      Dislikes: req.body.Dislikes || 0,
      Views: req.body.Views || 0,
      Comments: req.body.Comments || [],
      CategoryId: req.body.CategoryId
    });

    await newVideo.save();
    res.status(201).json({ message: "Video added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding video", error: err.message });
  }
};

// Delete video
// Delete video by MongoDB _id
// videoController.js
exports.deleteVideo = async (req, res) => {
  try {
    const result = await Video.findByIdAndDelete(req.params.id); // ✅ Correct usage
    if (!result) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting video", error: err.message });
  }
};

// Update video (optional)
exports.updateVideo = async (req, res) => {
  try {
    const updated = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Video updated", video: updated });
  } catch (err) {
    res.status(500).json({ message: "Update error", error: err.message });
  }
};


