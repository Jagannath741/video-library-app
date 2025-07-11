import { Link } from "react-router-dom";
import backgroundImage from "../src/assets/video-library-img.jpg";

export function VideoHome() {
    return (
        <div
            className="w-screen img bg-cover bg-center flex flex-col justify-center items-center text-white"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="img1">
                <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.5rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                    <span style={{ color: "#facc15" }}>Welcome to </span>
                    <span style={{ color: "#1ae052ff" }}>Video Library</span>
                </h1>

                <div className="m-5 border-4 border-white p-6 rounded-lg">
                    <Link  className="btn btn-success border-white text-red  me-5 mx-4" to="/admin-login">
                        Admin Login
                    </Link>
                    <Link className="btn btn-warning border-white text-red mx-4" to="/user-login">
                        User Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
