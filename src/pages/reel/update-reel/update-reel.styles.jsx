import styled from "styled-components";

export const MainContainer = styled.div`

`;

export const UpdateReelDataContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const UpdateReelContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

export const ContactInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    margin: 0 40px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
`;

export const MainTitle = styled.h2`

`;

export const UpdateReelSelect = styled.select`
    margin: 20px 0;
    width: 150px;
    text-align: center;
`;

export const UpdateReelOption = styled.option`

`;

export const UpdateReelInput = styled.input`
    margin: 10px 0;
`;

export const UpdateReelTextarea = styled.textarea`
    margin: 10px 0;
`;

export const DeleteReelButton = styled.button`
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