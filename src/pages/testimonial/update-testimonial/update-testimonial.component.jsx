import { useState } from 'react';

import Button from '../../../components/reusable/button/button.component';

import Client from '../../../tools/client';
import { api } from '../../../config';

import {
    ContactInfoContainer,
    DeleteTestimonialButton,
    UpdateTestimonialDataContainer,
    UpdateTestimonialContainer,
    ButtonContainer,
    MainTitle,
    TextSubtitle,
    UpdateTestimonialImage,
    UpdateTestimonialInput,
    UpdateTestimonialTextarea
} from './update-testimonial.styles';

const client = new Client();

const UpdateTestimonial = ({ testimonial, showTestimonial }) => {
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ fileInput, setFileInput ] = useState('');
    const [ title, setTitle ] = useState(testimonial.title ? testimonial.title : '');
    const [ firstName, setFirstName ] = useState(testimonial.firstName ? testimonial.firstName : '');
    const [ lastName, setLastName ] = useState(testimonial.lastName ? testimonial.lastName : '');
    const [ initials, setInitials ] = useState(testimonial.initials ? testimonial.initials : '');
    const [ company, setCompany ] = useState(testimonial.company ? testimonial.company : '');
    const [ url, setUrl ] = useState(testimonial.url ? testimonial.url : '');
    const [ date, setDate ] = useState(testimonial.testimonialDate ? testimonial.testimonialDate : '');
    const [ position, setPosition ] = useState(testimonial.position ? testimonial.position : '');
    const [ testimonialText, setTestimonialText ] = useState(testimonial.testimonial ? testimonial.testimonial : '');

    const handleFileChange = (e) => {
        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }
        
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const cancelAddImage = () => {
        setImage('');
        setImagePreview('');
        setFileInput('');
    }

    const positionHandler = (value) => {
        if(value < 0) {
            return
        }

        setPosition(value);
    }

    const submitTestimonialUpdate = async () => {
        let formData = new FormData();

        formData.append('id', testimonial.id);
        
        image && formData.append('files', image);
        formData.append('title', title);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('initials', initials);
        formData.append('company', company);
        formData.append('url', url);
        formData.append('testimonialDate', date);
        formData.append('position', position ? parseInt(position) : 0);
        formData.append('testimonial', testimonialText);

        await client.updateTestimonial(formData);
        await showTestimonial();
    }

    const deleteTestimonial = async () => {
        await client.deleteTestimonial({id: testimonial.id});
        window.location = '/testimonials';
    }

    return (
        <>
            <MainTitle>Update Testimonial</MainTitle>
                {testimonial.path ?
                    <>
                        <UpdateTestimonialImage src={api + testimonial.path} />
                        <Button onClick={() => console.log('HOOK THIS SHIT UP, DAWG')}>DELETE Image</Button>
                    </>
                :
                    <>
                        {imagePreview && <UpdateTestimonialImage src={imagePreview} />}
                        <UpdateTestimonialInput  type="file" accept='image/*' name="files" value={fileInput} onChange={(e) => handleFileChange(e)} />
                        {imagePreview && <Button onClick={() => cancelAddImage()}>Cancel</Button>}
                    </>
                }
            <UpdateTestimonialDataContainer>
                <ContactInfoContainer>
                    <UpdateTestimonialInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                    <UpdateTestimonialInput value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
                    <UpdateTestimonialInput value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
                    <UpdateTestimonialInput value={initials} onChange={(e) => setInitials(e.target.value)} placeholder='Initials' />
                    <UpdateTestimonialInput value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Company' />
                    <UpdateTestimonialInput value={url} onChange={(e) => setUrl(e.target.value)} placeholder='URL' />
                    <TextSubtitle>Please do not include 'https://' or 'http://' in the url</TextSubtitle>
                </ContactInfoContainer>
                <ContactInfoContainer>
                    <UpdateTestimonialInput value={date} onChange={(e) => setDate(e.target.value)} type='date' />
                    <UpdateTestimonialInput type='number' value={position} onChange={(e) => positionHandler(e.target.value)} placeholder='Position' />
                </ContactInfoContainer>
            </UpdateTestimonialDataContainer>
            <UpdateTestimonialContainer>
                <UpdateTestimonialTextarea rows="5" cols="50" value={testimonialText} onChange={(e) => setTestimonialText(e.target.value)} placeholder='testimonial' />
            </UpdateTestimonialContainer>
            <ButtonContainer>
                <Button onClick={async () => await showTestimonial()}>Cancel</Button>
                <Button onClick={() => submitTestimonialUpdate()}>Update</Button>
            </ButtonContainer>
            <DeleteTestimonialButton color='red' onClick={() => deleteTestimonial()}>DELETE</DeleteTestimonialButton>
        </>
    )
}

export default UpdateTestimonial;