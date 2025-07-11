import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export function AdminDeleteVideo() {
  const [video, setVideo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://video-library-backend-tar9.onrender.com/api/videos/${id}`)
      .then(response => setVideo(response.data))
      .catch(error => {
        console.error("Error fetching video:", error);
        alert("Failed to fetch video details.");
      });
  }, [id]);

  async function handleDeleteClick() {
    try {
      await axios.delete(`https://video-library-backend-tar9.onrender.com/api/delete-video/${id}`);
      alert("Video deleted successfully.");
      navigate('/admin-dashboard');
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video.");
    }
  }

  if (!video) {
    return <div className="m-3 p-2">Loading video details...</div>;
  }

  return (
    <div className="bg-light m-3 p-3 rounded shadow w-100" style={{ maxWidth: "400px" }}>
      <h4>Are you sure you want to delete this video?</h4>
      <dl className="mt-3">
        <dt>Title</dt>
        <dd>{video.Title}</dd>
        <dt>Description</dt>
        <dd>{video.Description}</dd>
      </dl>
      <div className="d-flex">
        <button onClick={handleDeleteClick} className="btn btn-danger me-2">Yes, Delete</button>
        <Link to="/admin-dashboard" className="btn btn-secondary">Cancel</Link>
      </div>
    </div>
  );
}
