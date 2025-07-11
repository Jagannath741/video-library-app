import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function AdminDashboard() {
  const [videos, setVideos] = useState([]);
  const [cookies, , removeCookie] = useCookies(["username"]);
const navigate = useNavigate();

const handleSignout = () => {
    removeCookie("username");
    navigate("/admin-login");
  };

  useEffect(() => {
    axios
      .get("https://video-library-backend-tar9.onrender.com/api/get-videos") // ✅ Updated API endpoint
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  return (
    <div className="bg-light p-3 m-3 w-100">
      <div className="d-flex justify-content-between">
        <span className="mb-4 fs-3 fw-bold">Admin Dashboard</span>
        <span className="justify-content-end">
          <button onClick={handleSignout} className="btn btn-danger">Signout</button>
        </span>
      </div>
      

      <div className="mb-3">
        <Link to="/add-video" className="btn btn-primary">
          <i className="bi bi-camera-video me-2"></i> Add Video
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Preview</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video._id}>
                <td>{video.Title}</td>
                <td>
                  <iframe
                    src={video.Url}
                    title={video.Title}
                    width="200"
                    height="100"
                    allowFullScreen
                  ></iframe>
                </td>
                <td>
                  <Link
                    to={`/edit-video/${video._id}`}
                    className="btn btn-warning btn-sm me-2"
                  >Edit &nbsp;
                    <i className="bi bi-pen-fill"></i>
                  </Link>
                  <Link
                    to={`/delete-video/${video._id}`}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
