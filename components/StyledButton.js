import Styled from "styled-components";

const StyledButton = Styled.button`
color: ${({ active }) => (active ? "#ffffff" : "#494949")};
text-transform: uppercase;
text-decoration: none;
background: ${({ active }) => (active ? "#F07818" : "#ffffff")};
padding: 10px;
margin: 5px;
border: 2px solid;
border-color: ${({ active }) => (active ? "#F07818" : "#494949")} ;
display: inline-block;
cursor:pointer;
transition: all 0.4s ease 0s;
&:hover {
color: #ffffff;
background: #F07818;
border-color: #F07818;
transition: all 0.4s ease 0s;
}
&:focus {
outline: 1px solid #F07818;
border-color: #F07818;
}
`;

export default StyledButton;
