import { Link } from "react-router-dom";

export function VideoHome() {
    return (
        <div className="container text-center">
            <h1 className="mb-4">Welcome to Video Library</h1>
            <Link className="btn btn-outline-dark me-3" to="/admin-login">Admin Login</Link>
            <Link className="btn btn-warning" to="/user-login">User Login</Link>
        </div>
    );
}