import { Link } from "react-router-dom";
import backgroundImage from "../src/assets/banner.jpg";

export function VideoHome() {
    return (
        <div
            className=" container-fluid img flex flex-col justify-center items-center text-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div>
                <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                    <span style={{ color: "#facc15" }}>Welcome to </span>
                    <span style={{ color: "#1ae052ff" }}>Video Library</span>
                </h1>
                    <Link  className="btn btn-success border-white text-red me-3 " to="/admin-login">
                        Admin Login
                    </Link>
                    <Link className="btn btn-warning border-white text-red " to="/user-login">
                        User Login
                    </Link>
            </div>
        </div>
    );
}
