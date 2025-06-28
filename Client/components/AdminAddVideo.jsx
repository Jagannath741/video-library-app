import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function AdminAddVideo() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      VideoId: Date.now(), // Unique ID for now
      Title: '',
      Url: '',
      Description: '',
      Likes: 0,
      Dislikes: 0,
      Views: 0,
      Comments: [],
      CategoryId: 0
    },
    onSubmit: async (values) => {
      try {
        await axios.post("http://127.0.0.1:5000/api/videos/add-video", values);
        alert("✅ Video added successfully");
        navigate("/admin-dashboard");
      } catch (err) {
        console.error("Error adding video:", err);
        alert("❌ Failed to add video");
      }
    }
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/get-categories")
      .then(response => {
        const categoryList = response.data;
        categoryList.unshift({ CategoryId: 0, CategoryName: "Select a Category" });
        setCategories(categoryList);
      })
      .catch(err => {
        console.error("Error loading categories:", err);
      });
  }, []);

  return (
    <div className="m-3 p-3 bg-light w-25">
      <h3 className="mb-3">Add New Video</h3>
      <form onSubmit={formik.handleSubmit} className="overflow-auto" style={{ maxHeight: '500px' }}>
        <dl>
          <dt>Video ID</dt>
          <dd><input type="number" onChange={formik.handleChange} className="form-control" name="VideoId" value={formik.values.VideoId} required /></dd>

          <dt>Title</dt>
          <dd><input type="text" onChange={formik.handleChange} className="form-control" name="Title" required /></dd>

          <dt>URL</dt>
          <dd><input type="text" onChange={formik.handleChange} className="form-control" name="Url" required /></dd>

          <dt>Description</dt>
          <dd><textarea rows="2" onChange={formik.handleChange} className="form-control" name="Description"></textarea></dd>

          <dt>Likes</dt>
          <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Likes" /></dd>

          <dt>Dislikes</dt>
          <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Dislikes" /></dd>

          <dt>Views</dt>
          <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Views" /></dd>

          <dt>Comments</dt>
          <dd><input type="text" onChange={(e) => formik.setFieldValue("Comments", [e.target.value])} className="form-control" name="Comments" /></dd>

          <dt>Category</dt>
          <dd>
            <select className="form-select" name="CategoryId" onChange={formik.handleChange} required>
              {categories.map(category => (
                <option key={category.CategoryId} value={category.CategoryId}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </dd>
        </dl>

        <div className="mt-3 d-flex justify-content-between">
          <button type="submit" className="btn btn-success">Add Video</button>
          <Link to="/admin-dashboard" className="btn btn-danger">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
