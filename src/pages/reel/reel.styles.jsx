import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ReelContainerColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    margin: 40px;
`;

export const ReelContainerRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
`;

export const MainTitle = styled.h2`

`;

export const BackText = styled.h4`
    text-align: start;
    cursor: pointer;
`;

export const ReelText = styled.h4`
    margin: 1px;
    padding: 2px;
`;

export const ActivationButton = styled.button`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    background-color: ${props => props.color};
    border: none;
    border-radius: 2px;
    margin: 20px 0;
    height: 50px;
    width: 100px;

    &:hover {
        color: ${props => props.color};
        background-color: #fff;
        border: ${props => props.color} solid 1px;
    }
`;