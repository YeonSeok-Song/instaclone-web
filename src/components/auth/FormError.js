import styled from "styled-components";
import React from 'react';

export const SFromError = styled.span`
    color : red;
    font-weight : 600;
    font-size : 12px;
    margin : 20px 0px 0px 0px;
`;

export const SFormError2 = styled(SFromError)`
  margin : 10px 0 10px 0;
`

export function FormError({message}) {
    return message === "" || !message ? null : <SFromError>{message}</SFromError>
}

export function FormError2({message}) {
    return message === "" || !message ? null : <SFormError2>{message}</SFormError2>
}