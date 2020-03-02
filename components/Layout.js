import React from "react";
import Styled from "styled-components";

const Layout = props => <PageLayout>{props.children}</PageLayout>;

export default Layout;

const PageLayout = Styled.div`
	margin:0;
`;
