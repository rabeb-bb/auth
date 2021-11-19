import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div
      style={{
        width: "20%",
        height: "100vh",
        position: "relative",
        boxShadow: "5px 0 5px -5px rgba(0,0,0,0.75)",
      }}
    >
      {/* <Link to="/admin">
        <MenuItem>Dashboard</MenuItem>
      </Link>
      <Link to="/admin/users">
        <MenuItem>Users</MenuItem>
      </Link> */}
      {/* <Link to="/admin/reviews">
        <MenuItem>Reviews</MenuItem>
      </Link> */}
      {/* <Link to="/admin/books">
        <MenuItem>Books</MenuItem>
      </Link> */}
      {/* <Link to="/admin/tickets">
        <MenuItem>Reports</MenuItem>
      </Link> */}
      {/* <Link to="/admin/orders">
        <MenuItem>Orders</MenuItem>
      </Link> */}
      <div className="page-wrapper default-theme sidebar-bg bg1 toggled">
        <nav id="sidebar" className="sidebar-wrapper">
          <div className="sidebar-content">
            {/* sidebar-brand  */}
            <div className="sidebar-item sidebar-brand">
              <a href="#">EverythingBooks</a>
            </div>
            {/* sidebar-header  */}
            <div className="sidebar-item sidebar-header d-flex flex-nowrap">
              <div className="user-pic">
                <img
                  src={
                    user.profile_picture
                      ? user.profile_picture
                      : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                  }
                  alt="user photo"
                  width={130}
                  className="rounded mb-2 img-thumbnail"
                />
              </div>
              <div className="user-info">
                <span className="user-name">
                  {user.first_name}
                  <strong>{user.last_name}</strong>
                </span>
                <span className="user-role">{user.role}</span>
                {/* <span className="user-status">
                  <i className="fa fa-circle" />
                  <span>Online</span>
                </span> */}
              </div>
            </div>
            {/* sidebar-search  */}
            <div className="sidebar-item sidebar-search">
              <div>
                {/* <div className="input-group">
                  <input
                    type="text"
                    className="form-control search-menu"
                    placeholder="Search..."
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fa fa-search" aria-hidden="true" />
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
            {/* sidebar-menu  */}
            <div
              className=" sidebar-item sidebar-menu "
              style={{ textAlign: "left" }}
            >
              <ul>
                <li className="header-menu">
                  <span>General</span>
                </li>
                <li className="sidebar-dropdown">
                  <Link to="/admin">
                    <i class="bi bi-house"></i>
                    <span className="menu-text">Dashboard</span>
                  </Link>
                </li>
                <li className="sidebar-dropdown">
                  <Link to="/admin/users">
                    <i class="bi bi-people"></i>
                    <span className="menu-text">Users</span>
                    {/* <span className="badge badge-pill badge-danger">3</span> */}
                  </Link>
                </li>
                <li className="sidebar-dropdown">
                  <Link to="/admin/tickets">
                    <i class="bi bi-flag"></i>
                    <span className="menu-text">Support tickets</span>
                  </Link>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-book" />
                    <span className="menu-text">Documentation</span>
                    <span className="badge badge-pill badge-primary">Beta</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-calendar" />
                    <span className="menu-text">Calendar</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-folder" />
                    <span className="menu-text">Examples</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* sidebar-menu  */}
          </div>
        </nav>
      </div>
    </div>
  );
}
