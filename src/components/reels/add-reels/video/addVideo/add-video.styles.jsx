import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
`;

export const MainTitle = styled.h2`
    margin: 20px 0;
`;

export const AddVideoInput = styled.input`
    margin: 20px 0;
`;

export const AddVideoSelect = styled.select`
    margin: 20px 0;
`;

export const AddVideoOption = styled.option`

`;

export const AddVideoFileInput = styled.input`
    display: none;
`;

export const AddVideoFileLabel = styled.label`
    border: 1px black solid;
    border-radius: 5px;
    color: #fff;
    background-color: #000;
    padding: 10px;
    margin: 5px 0;
`;

export const AddVideoTextarea = styled.textarea`
    margin: 20px 0;
`;