import React from 'react';
import styled from "styled-components";

export const SSeparator = styled.div`
  margin: 20px 0px 20px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: #FAFAFA;
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    color: #8e8e8e;
    font-size : 12px;
  }
`;

function Separator() {
    return (
        <SSeparator>
            <div></div>
            <span>Or</span>
            <div></div>
        </SSeparator>
    );
}

export default Separator;