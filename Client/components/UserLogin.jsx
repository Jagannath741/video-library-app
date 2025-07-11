import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function UserLogin() {
  const [cookies, setCookie] = useCookies(["username"]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      UserId: "",
      Password: "",
    },
    onSubmit: async (user) => {
      try {
        const response = await axios.get("https://video-library-backend-tar9.onrender.com/api/users"); // Updated endpoint

        const match = response.data.find(
          (u) => u.UserId === user.UserId
        );

        if (!match) {
          setError("Invalid User ID");
        } else if (match.Password !== user.Password) {
          setError("Invalid Password");
        } else {
          setCookie("username", match.UserName, { path: "/" });
          navigate("/user-dashboard");
        }
      } catch (err) {
        setError("Login failed. Please try again later.");
        console.error("Login error:", err);
      }
    },
  });

  return (
    <div className="bg-light p-4 m-4 rounded shadow" style={{ maxWidth: "400px", margin: "auto" }}>
      <h3 className="text-center mb-3">User Login</h3>

      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>User Id</dt>
          <dd>
            <input
              type="text"
              name="UserId"
              onChange={formik.handleChange}
              className="form-control"
              required
            />
          </dd>

          <dt>Password</dt>
          <dd>
            <input
              type="password"
              name="Password"
              onChange={formik.handleChange}
              className="form-control"
              required
            />
          </dd>
        </dl>

        {error && <div className="text-danger mb-3">{error}</div>}

        <button type="submit" className="btn btn-warning w-100">Login</button>

        <div className="my-3 text-center">
          <Link to="/user-register">New User? Register here</Link>
        <Link to="/" className="mt-4 d-block text-center">Back to Home</Link>
        </div>
      </form>
    </div>
  );
}
