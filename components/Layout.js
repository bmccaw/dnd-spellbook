import React from "react";
import Styled from "styled-components";
import Nav from "../components/Navbar";

const Layout = props => (
  <PageLayout>
    <Nav />
    {props.children}
  </PageLayout>
);

export default Layout;

const PageLayout = Styled.div`
	margin-top:0;
`;
