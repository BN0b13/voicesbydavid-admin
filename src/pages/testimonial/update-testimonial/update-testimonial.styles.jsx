import styled from "styled-components";

export const MainContainer = styled.div`

`;

export const UpdateTestimonialDataContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const UpdateTestimonialContainer = styled.div`
    margin: 40px 0;
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

export const UpdateTestimonialInput = styled.input`
    margin: 10px 0;
`;

export const UpdateTestimonialTextarea = styled.textarea`
    margin: 10px 0;
`;

export const UpdateTestimonialImage = styled.img`
    height: 200px;
    width: 200px;
    border-radius: 50%;
    margin: 20px 0;
`;

export const DeleteTestimonialButton = styled.button`
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

export const TextSubtitle = styled.h6`

`;