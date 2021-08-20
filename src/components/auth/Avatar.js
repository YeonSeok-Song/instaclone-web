import React from 'react';
import styled from 'styled-components';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SAvatar = styled.div`
    display : flex;
    width : ${props => props.lg ? "30px" : "25px"};
    height :${props => props.lg ? "30px" : "25px"};
    border-radius : 50%;
    background-color: #80808042;
    align-items : center;
    justify-content : center;
    overflow : hidden;
    margin-right: 5px;
    svg {
        max-width : 100%;
    }
    img {
        min-height : 100%;
        min-width : 100%;
    }
`;

const LAvatar = styled.div`
    display : flex;
    height: 160px;
    width: 160px;
    border-radius: 50%;
    margin-right: 110px;
    background-color: #80808042;
    align-items : center;
    justify-content : center;
    overflow : hidden;
    svg {
        max-width : 100%;
    }
    img {
        min-height : 100%;
        min-width : 100%;
    }
`;


function Avatar({url = "", lg = false, size = false}) {
    return size === false ? 
        <SAvatar lg={lg}>
            {url !== null ? <img src={url} /> : <FontAwesomeIcon icon={faUser} color="white"/>}
        </SAvatar> : <LAvatar lg={lg}>
            {url !== null ? <img src={url} /> : <FontAwesomeIcon icon={faUser} size="8x" color="white"/>}
        </LAvatar>
}

export default Avatar;