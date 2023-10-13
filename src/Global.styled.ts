import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  body{
    background-color: #FEAF00;
  }
  :root {
    --orange:  #FEAF00;
    --card-color: #F8D442;
    --white: #fff;
  }
`;

export default GlobalStyle;