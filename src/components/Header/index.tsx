import {  useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {  logOut } from "../../redux/authSlice";
import { HideHeader,  } from "../../redux/HideSlice";

const Header = () => {

  const { isAuth, user } = useAppSelector((state) => state.auth);
  const [toggleNavBar, setToggleNavBar] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setToggleNavBar((prevState) => !prevState);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink to={"/"} className="navbar-brand">
          Book store App
        </NavLink>
        <button
          onClick={handleToggle}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={
            toggleNavBar
              ? "collapse navbar-collapse justify-content-between show"
              : "collapse navbar-collapse justify-content-between"
          }
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return isActive ? "nav-link active" : "nav-link";
                }}
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
           
              <li className="nav-item">
                <NavLink
                  to="/Dashboard"
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  aria-current="page"
                >
                  Dashboard
                </NavLink>
              </li>
          
          </ul>
          {isAuth == false ? (
            <ul className="navbar-nav">
              <li onClick={()=>dispatch(HideHeader())} className="nav-item">
                <NavLink
                  to="/Login"
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  aria-current="page"
                >
                  Login
                </NavLink>
              </li>
              <li  onClick={()=>dispatch(HideHeader())} className="nav-item">
                <NavLink
                  to="/Register"
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  aria-current="page"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link">Welcome, {user?.firstname}</span>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => {
                    dispatch(logOut());
                    navigate("/", {
                      replace: true,
                    });
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
