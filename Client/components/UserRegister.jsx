import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function UserRegister() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      UserId: '',
      UserName: '',
      Password: '',
      Email: '',
      Mobile: ''
    },
    onSubmit: async (user) => {
      try {
        await axios.post(`https://video-library-backend-tar9.onrender.com/api/users/register`, user);
        alert("User Registered Successfully.");
        navigate("/user-login");
      } catch (err) {
        setError("Registration failed. Please try again.");
        console.error("Registration error:", err);
      }
    }
  });

  return (
    <div className="bg-light m-3 p-4 rounded shadow w-100" style={{ maxWidth: "400px", margin: "auto", color: "#01792dff" }}>
      <h3 className="mb-3 text-center">Register User</h3>
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>User Id</dt>
          <dd><input type="text" className="form-control" onChange={formik.handleChange} name="UserId" required /></dd>

          <dt>User Name</dt>
          <dd><input type="text" className="form-control" onChange={formik.handleChange} name="UserName" required /></dd>

          <dt>Password</dt>
          <dd><input type="password" className="form-control" onChange={formik.handleChange} name="Password" required /></dd>

          <dt>Email</dt>
          <dd><input type="email" className="form-control" onChange={formik.handleChange} name="Email" required /></dd>

          <dt>Mobile</dt>
          <dd><input type="text" className="form-control" onChange={formik.handleChange} name="Mobile" required /></dd>
        </dl>

        {error && <div className="text-danger mb-2">{error}</div>}

        <button type="submit" className="btn btn-success w-100">Register</button>

        <div className="my-3 text-center">
          <Link to="/user-login">Existing User Login</Link> | <Link to="/admin-login">Admin Login</Link>
        </div>
      </form>
    </div>
  );
}
