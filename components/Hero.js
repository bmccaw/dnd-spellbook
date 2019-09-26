import React from 'react';
import Styled from 'styled-components';

const Hero = () => (
    <HeroDiv>
        <h1>D&D Spellbook</h1>
        <h3>The place for all your D&D 5th Edition spell needs!</h3>
    </HeroDiv>
);
export default Hero;

const HeroDiv = Styled.div`
        background-image: url(/static/images/hero.jpg);
        background-attachment: fixed;
        background-position: center bottom;
        min-height:400px;
        display: flex;
        justify-content: center;
        flex-direction: column;
          
        h1, h3 {
            margin: 5;
            color: white;
            text-align:center;
            text-shadow: -1px 1px 5px rgba(100, 100, 100, 1);
            
        }`;