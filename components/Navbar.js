import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Nav = ({ title }) => {
  return (
    <div>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h4" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
