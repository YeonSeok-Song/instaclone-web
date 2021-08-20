import { useReactiveVar } from '@apollo/client';
import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { darkModeVar, disableDarkMode, enableDarkMode } from '../../apollo';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;


const Footer = styled.footer`
  margin-top : 20px;
  cursor : pointer;
`;

const DarkModeBtn = styled.span`
  margin-top : 20px;
`;

function AuthLayout({children}) {
  const darkMode = useReactiveVar(darkModeVar);
    return (
        <Container>
            <Wrapper>{children}</Wrapper>
            <Footer>
              <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
              </DarkModeBtn>
            </Footer>
        </Container>
    );
}

export default AuthLayout;