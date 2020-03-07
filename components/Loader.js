//TODO Make a D20 SVG loader
import React from "react";
import Styled from "styled-components";

const StyledLoader = Styled("div")`
	width:100%;
	background-color: black;
	height:auto;
	opacity:.5;
	z-index:9999;
	display:hidden;
`;

const Loader = ({ children }) => {
  return <StyledLoader>{children}</StyledLoader>;
};

export default Loader;
