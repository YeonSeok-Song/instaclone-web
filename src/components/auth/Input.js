import React from 'react';
import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #FAFAFA;
  border: 0.5px solid ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus{
    border-color : rgb(38, 38, 38);
  }
`
export default Input;