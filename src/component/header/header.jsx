import { Link } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <>
      <nav>
        <ul className="nav-list">
          <Link to="/" className="link-ele">
            <li>
              <img
                className="logo"
                src="/public/logo.png"
                alt="home-logo"
              />
            </li>
          </Link>
          <li>
            <div>
              <Link to="/" className="link-ele">
                <a href="">Home</a>
              </Link>
              <Link to="/jobs" className="link-ele">
                <a href="">Job</a>
              </Link>
            </div>
          </li>
          <li>
            <div>
              <Link to="/login">
                <button className="btn btn-info mt-2">Log Out</button>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
