import { Box } from "@mui/system";
import React from "react";
import "./header.css";

const Header = () => {
  return (
    <Box sx={{ backgroundImage: { xs: "none" } }}>
      <div id="home_into">
        <div className="intro">
          <h3>Welcome to Everything Books</h3>
          <h2>DREAMING WITH OPEN EYES</h2>
          <p className="header-text">
            Alberto Manguel says that the reason why we read and turn to reading
            in moments of drakness is because we find words for what we already
            know
          </p>
          <p className="header-text">
            Find here the opportunity to live a 1000 lives...
          </p>
        </div>
      </div>
    </Box>
  );
};

export default Header;
