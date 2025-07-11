import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export function AdminEditVideo() {
  const [categories, setCategories] = useState([]);
  const [video, setVideo] = useState(null); // single video object
  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      VideoId: video?.VideoId || 0,
      Title: video?.Title || "",
      Url: video?.Url || "",
      Description: video?.Description || "",
      Likes: video?.Likes || 0,
      Dislikes: video?.Dislikes || 0,
      Views: video?.Views || 0,
      CategoryId: video?.CategoryId || -1
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await axios.put(`https://video-library-backend-tar9.onrender.com/api/videos/${id}`, values);
        alert("Video Edited Successfully.");
        navigate("/admin-dashboard");
      } catch (error) {
        console.error("Update Error:", error);
        alert("Failed to update video.");
      }
    }
  });

  // Load categories
  function loadCategories() {
    axios.get("https://video-library-backend-tar9.onrender.com/api/get-categories")
      .then(response => {
        response.data.unshift({ CategoryId: -1, CategoryName: "Select a Category" });
        setCategories(response.data);
      })
      .catch(err => console.error("Error loading categories:", err));
  }

  // Load video by ID
  useEffect(() => {
    loadCategories();
    axios.get(`https://video-library-backend-tar9.onrender.com/api/videos/${id}`)
      .then(response => {
        setVideo(response.data);
      })
      .catch(err => {
        console.error("Error loading video:", err);
        alert("Failed to load video.");
      });
  }, [id]);

  return (
    <div className="bg-light p-3 m-3 w-100" style={{ maxWidth: "450px" }}>
      <h3>Edit Video</h3>
      <form onSubmit={formik.handleSubmit} className="overflow-auto" style={{ maxHeight: "450px" }}>
        <dl>
          <dt>Video ID</dt>
          <dd><input type="number" name="VideoId" className="form-control" onChange={formik.handleChange} value={formik.values.VideoId} /></dd>

          <dt>Title</dt>
          <dd><input type="text" name="Title" className="form-control" onChange={formik.handleChange} value={formik.values.Title} /></dd>

          <dt>URL</dt>
          <dd><input type="text" name="Url" className="form-control" onChange={formik.handleChange} value={formik.values.Url} /></dd>

          <dt>Description</dt>
          <dd><textarea name="Description" rows="2" className="form-control" onChange={formik.handleChange} value={formik.values.Description}></textarea></dd>

          <dt>Likes</dt>
          <dd><input type="number" name="Likes" className="form-control" onChange={formik.handleChange} value={formik.values.Likes} /></dd>

          <dt>Dislikes</dt>
          <dd><input type="number" name="Dislikes" className="form-control" onChange={formik.handleChange} value={formik.values.Dislikes} /></dd>

          <dt>Views</dt>
          <dd><input type="number" name="Views" className="form-control" onChange={formik.handleChange} value={formik.values.Views} /></dd>

          <dt>Category</dt>
          <dd>
            <select name="CategoryId" className="form-select" onChange={formik.handleChange} value={formik.values.CategoryId}>
              {categories.map(cat => (
                <option key={cat.CategoryId} value={cat.CategoryId}>{cat.CategoryName}</option>
              ))}
            </select>
          </dd>
        </dl>
        <button type="submit" className="btn btn-success">Save Video</button>
        <Link to="/admin-dashboard" className="btn btn-danger ms-2">Cancel</Link>
      </form>
    </div>
  );
}
