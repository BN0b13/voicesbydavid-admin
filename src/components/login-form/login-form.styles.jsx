import styled from 'styled-components';

export const LoginFormButtonContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 360px;
    margin-top: 2em;
    padding: 1em;
`;

export const LoginFormErrorContainer = styled.div`

`;

export const LoginFormForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
`;

export const LoginFormInput = styled.input`
    margin: 5px 0;
`;

export const LoginFormLogo = styled.img`
    height: 320px;
    width: 320px;
`;

export const LoginFormText = styled.h6`
    margin: 20px;
    cursor: pointer;
`;