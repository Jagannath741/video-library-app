import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import banner from "../src/assets/admindash.jpg"

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

  return( 
    <div
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
      <div className="d-flex justify-content-between container-fluid">
        <span className="mb-4 fs-3 text-white fw-bold">Admin Dashboard</span>
        <span className="justify-content-end">
          <button onClick={handleSignout} className="btn btn-danger my-2 mx-2">Signout</button>
        </span>
      </div>
      
      <div className="mb-3 container-fluid">
        <Link to="/add-video" className="btn btn-primary">
          <i className="bi bi-camera-video"></i> Add Video
        </Link>
      </div>

      <div className="table-responsive container-fluid">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Preview</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-info" >
            {videos.map((video) => (
              <tr key={video._id}>
                <td className="text-black fw-bold fs-5">{video.Title}</td>
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
