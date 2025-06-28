import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

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
      .get("http://127.0.0.1:5000/api/get-videos") // ✅ Updated for Mongoose API
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

  return (
    <div className="bg-light p-3 m-3">
      <h3 className="d-flex justify-content-between align-items-center">
        <div>
          <span className="me-2">{cookies["username"]}</span>
          <span>Dashboard</span>
        </div>
        <button onClick={handleSignout} className="btn btn-outline-secondary">Sign out</button>
      </h3>

      <div className="row">
        <div className="col-md-3">
          <div className="mb-3">
            <label className="form-label fw-bold">Search Videos</label>
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

        <div className="col-md-9">
          <section className="mt-3 d-flex flex-wrap">
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
                  <span><i className="bi bi-eye-fill"></i> {video.Views}</span>
                  <span><i className="bi bi-hand-thumbs-up"></i> {video.Likes}</span>
                  <span><i className="bi bi-hand-thumbs-down"></i> {video.Dislikes}</span>
                  <button className="btn btn-sm btn-outline-dark">
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
