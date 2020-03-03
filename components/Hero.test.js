import React from "react";
import { render } from "@testing-library/react";
import Hero from "./Hero";

test("Should render component", () => {
  const HeroDiv = render(
    <Hero
      image={"/image"}
      title={"D&D Spellbook"}
      subtitle={"This is a subtitle."}
    />
  );
  expect(HeroDiv).toMatchSnapshot();
});
