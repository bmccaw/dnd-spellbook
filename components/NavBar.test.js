import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./NavBar";

test("Should render component", () => {
  const Nav = render(<Navbar title={"Dungeons and Dragons Spellbook"} />);
  expect(Nav).toMatchSnapshot();
});
