import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Typography from '@material-ui/core/Typography'
import Styled from 'styled-components';

const Nav = () => (
    <div>
        <AppBar position="fixed" color="secondary">
            <ToolBar>
                <Typography variant="h4" color="inherit">
                    Dungeons & Dragons Spellbook
                </Typography>
            </ToolBar>
        </AppBar>
    </div>
);

export default Nav;

// const NavBar = Styled.div`
//     width: 100%;
//     position:sticky;
//     top:0;
//     display:grid;
//     grid-template-columns: 1fr 1fr 1fr;
//     justify-items: center;
//     background-color: white;
//     box-shadow:0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22);
//     color:black;
//     margin-bottom: 0;
//     font-family: 'Uncial Antiqua', cursive;
// `