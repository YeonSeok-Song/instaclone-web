import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import styled from 'styled-components';
import { FatText } from "./components/shared";

export const lightTheme = {
  accent : "#0095f6",
  borderColor : "rgb(219, 219, 219)",
  bgColor : "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        
        background-color: ${(props) => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color : ${(props) => props.theme.fontColor};
    }
    a {
      text-decoration: none;
      color : inherit; //parent color
    }
`;

export const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

export const CommentCaption = styled.span`
line-height : 17px;
margin-left : 10px;
a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
}
`;

export const CommentContainer = styled.div`
    display : flex;
    width : 100%;
    margin-bottom : 7px;
    svg {
        margin-left : auto;
        justify-content : flex-end;
    }
`

export const DateContainer = styled.div`
  opacity : 0.7;
  font-size : 12px;
`

export const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;