import { createGlobalStyle } from "styled-components";
import SegoeUi from "./fonts/Segoe UI.woff";

const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    font-family: 'Segoe UI', sans-serif;
}

   input[type="number"]::-webkit-inner-spin-button,
   input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }

@font-face {
        font-family: 'Segoe Ui';
        src: local('Segoe Ui'), local('SegoeUi'),
        url(${SegoeUi}) format('woff2');
        font-weight: 400;
        font-style: normal;
    }


    .save-cta-main{
        display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 48px;
    button{
        background: #60269e;
    filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.141));
    border-radius: 16px;
    padding: 12px 34px;
    font-weight: 400;
    font-size: 13px;
    line-height: 17px;
    color: #ffffff;
    }
    }
    

`;

export default GlobalStyles;
