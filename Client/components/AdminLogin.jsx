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
        const response = await axios.post('http://127.0.0.1:5000/api/admin-login', admin);
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
    <div className="bg-light p-4 m-4 w-25">
      <h3>Admin Login</h3>
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>Admin Id</dt>
          <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" /></dd>
          <dt>Password</dt>
          <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
        </dl>
        <button className="btn btn-warning w-100">Login</button>
        <Link to="/" className="mt-4 d-block text-center">Back to Home</Link>
      </form>
    </div>
  );
}
