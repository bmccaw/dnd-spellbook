import React from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

const HeroDiv = Styled.div`
        background-image: ${props => `url(${props.image})`};
        background-attachment: fixed;
        background-position: center bottom;
        min-height:500px;
        display: flex;
        justify-content: center;
        flex-direction: column;
          
        h1, h3 {
            margin: 5;
            color: white;
            text-align:center;
            text-shadow: -1px 1px 5px rgba(100, 100, 100, 1);
            font-family: 'Roboto', cursive;            
        }`;

const Hero = ({ title, subtitle, image }) => (
  <HeroDiv image={image}>
    <h1>{title}</h1>
    <h3>{subtitle}</h3>
  </HeroDiv>
);

Hero.PropTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default Hero;
