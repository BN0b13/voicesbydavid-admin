import styled from 'styled-components';

export const MainContainer = styled.div`

`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

export const AboutImage = styled.img`
    height: 300px;
    width: 300px;
`;

export const AboutImageDeleteButton = styled.button`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    font-size: 1.5em;
    background-color: red;
    border: none;
    border-radius: 3px;
    margin-top: 10px;
    height: 50px;
    width: 100%;

    &:hover {
        color: red;
        background-color: #fff;
        border: red solid 1px;
    }
`;

