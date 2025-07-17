import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import banner from "../src/assets/dashboard.jpg";

export function UserDashBoard() {
  const [cookies, , removeCookie] = useCookies(["username"]);
  const [videos, setVideos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  const handleSignout = () => {
    removeCookie("username");
    navigate("/user-login");
  };

  useEffect(() => {
    axios
      .get("https://video-library-backend-tar9.onrender.com/api/get-videos") // ✅ Updated for Mongoose API
      .then((response) => {
        setVideos(response.data);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
      });
  }, []);

  const filteredVideos = videos.filter((video) => {
    const matchTitle = video.Title.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = category === "All" || video.Category === category;
    return matchTitle && matchCategory;
  });

  // New function to handle video download
  const handleDownload = (videoUrl, videoTitle) => {
    // Create an anchor element and trigger download
    const link = document.createElement("a");
    link.href = videoUrl;
    // Use video title as filename with fallback to 'video'
    link.download = videoTitle ? `${videoTitle}.mp4` : "video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handler to update video counts (views, likes, dislikes)
  const updateVideoCount = async (videoId, field) => {
    try {
      const video = videos.find((v) => v._id === videoId);
      if (!video) return;

      // Increment the field count locally
      const updatedCount = (video[field] || 0) + 1;

      // Prepare updated video data
      const updatedVideo = { ...video, [field]: updatedCount };

      // Send PUT request to update video on backend
      await axios.put(`https://video-library-backend-tar9.onrender.com/api/videos/${videoId}`, updatedVideo);

      // Update local state
      setVideos((prevVideos) =>
        prevVideos.map((v) =>
          v._id === videoId ? { ...v, [field]: updatedCount } : v
        )
      );
    } catch (error) {
      console.error(`Error updating ${field} count:`, error);
    }
  };

  return (
    <div
      className="bg-light"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <h3 className="d-flex container-fluid justify-content-between align-items-center text-black">
        <div>
          <span className="me-2">{cookies["username"]}</span>
          <span>Dashboard</span>
        </div>
        <button onClick={handleSignout} className="btn btn-danger m-2">Sign out</button>
      </h3>

      <div className="row container-fluid">
        <div className="col-md-3">
          <div className="mb-3">
            <label className="form-label text-black fw-bold">Search Videos</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by title"
              />
              <button className="btn btn-warning">
                <i className="bi bi-search" />
              </button>
            </div>
          </div>

          <div>
            <label className="form-label fw-bold">Filter by Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Java">Java</option>
              <option value="React">React</option>
              <option value="Cloud">Cloud</option>
            </select>
          </div>
        </div>

        <div className="col-md-9 container-fluid">
          <section className="mt-3 d-flex" style={{ overflowX: "auto", flexWrap: "nowrap" }}>
            {filteredVideos.map((video) => (
              <div
                key={video._id}
                className="card m-2"
                style={{ width: "250px", flexShrink: 0 }}
              >
                <div className="card-header">
                  <h5 className="card-title">{video.Title}</h5>
                </div>
                <div className="card-body">
                  <iframe
                    src={video.Url}
                    title={video.Title}
                    className="w-100"
                    height="200"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => updateVideoCount(video._id, "Views")}
                    title="View"
                  >
                    <i className="bi bi-eye-fill"></i> {video.Views}
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => updateVideoCount(video._id, "Likes")}
                    title="Like"
                  >
                    <i className="bi bi-hand-thumbs-up"></i> {video.Likes}
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => updateVideoCount(video._id, "Dislikes")}
                    title="Dislike"
                  >
                    <i className="bi bi-hand-thumbs-down"></i> {video.Dislikes}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => handleDownload(video.Url, video.Title)}
                  >
                    <i className="bi bi-download"></i>
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
