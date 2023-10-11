import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
`;

export const VideoTitle = styled.h2`
    text-align: center;
`;

export const BackText = styled.h4`
    text-align: start;
    cursor: pointer;
`;

export const DeleteVideoButton = styled.button`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    background-color: ${props => props.color};
    border: none;
    border-radius: 2px;
    margin-top: 10px;
    height: 50px;
    width: 100px;

    &:hover {
        color: ${props => props.color};
        background-color: #fff;
        border: ${props => props.color} solid 1px;
    }
`;