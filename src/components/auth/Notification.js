import React from 'react';
import styled from "styled-components";
import {
    faHandPointDown,
    faRobot,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SNotification = styled.span`
    color: #0095f6;
    margin-top : 20px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, .2);
    padding : 10px 10px 10px 10px;
    text-align : center;
    align-content : center;
    justify-content: center;
    font-weight: 600;

`

function Notification({message}) {
    return message === "" || !message ? null : <SNotification>
        <FontAwesomeIcon icon={faRobot} size="lg" />&nbsp;
        {message}
        </SNotification>;
}

export default Notification;