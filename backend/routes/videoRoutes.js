// routes/videoRoutes.js
const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

// RESTful API endpoints
router.get("/get-videos", videoController.getAllVideos);
router.get("/videos/:id", videoController.getVideoById);
router.post("/add-video", videoController.addVideo);
router.delete("/delete-video/:id", videoController.deleteVideo);
router.put("/videos/:id", videoController.updateVideo);         // PUT /api/videos/:id

module.exports = router;
