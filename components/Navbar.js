import React from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

const NavBar = Styled.div`
    width: 100%;
    position:sticky;
    top:0;
    display:flex;
    justify-items: center;
    background-color: #930C10;
    box-shadow:0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22);
    color:white;
    margin-bottom: 0;
    font-family: 'Roboto', cursive;
    
    h1 {
      margin-left:20px;
    }
    `;

const Nav = ({ title }) => {
  return (
    <NavBar>
      <h1>{title}</h1>
    </NavBar>
  );
};

Nav.PropTypes = {
  title: PropTypes.string
};

export default Nav;
