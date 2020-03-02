import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";

test("Should render component", () => {
  const Nav = render(<Navbar position="sticky" color="primary" />);
  expect(Nav).toMatchSnapshot();
});
