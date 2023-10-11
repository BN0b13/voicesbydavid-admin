import { useState } from 'react';

import Button from '../../reusable/button/button.component';

import Client from '../../../tools/client';

import {
    MainContainer,
    TestimonialImage,
    TestimonialInput,
    TestimonialTextarea,
    TextSubtitle
} from './add-testimonial.styles';

const client = new Client();

const AddTestimonial = ({ getTestimonials }) => {
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ fileInput, setFileInput ] = useState('');
    const [ position, setPosition ] = useState('');
    const [ date, setDate ] = useState('');
    const [ testimonialDate, setTestimonialDate ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ initials, setInitials ] = useState('');
    const [ company, setCompany ] = useState('');
    const [ url, setUrl ] = useState('');
    const [ testimonial, setTestimonial ] = useState('');

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

    const checkRequiredFields = () => {
        if(firstName === '' ||
            lastName === '' ||
            testimonial === '') {
                return false;
            }
        return true;
    }

    const submitTestimonial = async () => {
        if(!checkRequiredFields()) {
            return
        }

        let formData = new FormData();

        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('testimonial', testimonial);
        
        image && formData.append('files', image);
        title && formData.append('title', title);
        initials && formData.append('initials', initials);
        company && formData.append('company', company);
        url && formData.append('url', url);
        date && formData.append('testimonialDate', testimonialDate);
        position && formData.append('position', position ? parseInt(position) : 0);
        

        await client.postTestimonial(formData);
        await getTestimonials();
    }

    return (
        <MainContainer>
            <>
                {imagePreview && <TestimonialImage src={imagePreview} />}
                    <TestimonialInput  type="file" accept='image/*' name="files" value={fileInput} onChange={(e) => handleFileChange(e)} />
                {imagePreview && <Button onClick={() => cancelAddImage()}>Cancel</Button>}
            </>
            <TestimonialInput type='number' value={position} onChange={(e) => positionHandler(e.target.value)} placeholder='Position' />
            <TestimonialInput type='date' value={date} onChange={(e) => setDate(e.target.value)} />
            <TestimonialInput type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            <TestimonialInput type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
            <TestimonialInput type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
            <TestimonialInput type='text' value={initials} onChange={(e) => setInitials(e.target.value)} placeholder='Initials' />
            <TestimonialInput type='text' value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Company' />
            <TestimonialInput type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='URL' />
            <TextSubtitle>Please do not include 'https://' or 'http://' in the url</TextSubtitle>
            <TestimonialTextarea rows="5" cols="50" value={testimonial} onChange={(e) => setTestimonial(e.target.value)} placeholder='Testimonial' />
            <Button onClick={() => submitTestimonial()}>Submit</Button>
        </MainContainer>
    )
}

export default AddTestimonial;