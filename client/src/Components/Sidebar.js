import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "20%",
        height: "100vh",
        position: "relative",
        boxShadow: "5px 0 5px -5px rgba(0,0,0,0.75)",
      }}
    >
      <Link to="/admin">
        <MenuItem>Dashboard</MenuItem>
      </Link>
      <Link to="/admin/users">
        <MenuItem>Users</MenuItem>
      </Link>
      <Link to="/admin/reviews">
        <MenuItem>Reviews</MenuItem>
      </Link>
      <Link to="/admin/books">
        <MenuItem>Books</MenuItem>
      </Link>
      <Link to="/admin/reports">
        <MenuItem>Reports</MenuItem>
      </Link>
      <Link to="/admin/orders">
        <MenuItem>Orders</MenuItem>
      </Link>
    </div>
  );
}
