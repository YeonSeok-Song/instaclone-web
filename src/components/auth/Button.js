import React from 'react';
import styled from "styled-components";

export const Button = styled.button`
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width : 100%;
  border-radius: 3px;
  opacity : ${props => props.disabled ? "0.2" : "1"};
`
export default Button;