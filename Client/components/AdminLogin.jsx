import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

export function AdminLogin() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      UserId: '',
      Password: ''
    },
    onSubmit: async (admin) => {
      try {
        const response = await axios.post('https://video-library-backend-tar9.onrender.com/api/admin-login', admin);
        alert(response.data.message);
        navigate("/admin-dashboard");
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
        } else {
          alert("Server error");
        }
        console.error("Login error:", err);
      }
    }
  });

  return (
    <div className="bg-light p-4 m-4 rounded shadow" style={{ maxWidth: "400px", margin: "auto", color: "#ce0e0ef0" }}>
      <h3>Admin Login</h3>
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>Admin Id</dt>
          <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" /></dd>
          <dt>Password</dt>
          <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
        </dl>
        <button className="btn btn-danger w-100">Login</button>
        <Link to="/" className="mt-4 d-block text-center">Back to Home</Link>
      </form>
    </div>
  );
}
