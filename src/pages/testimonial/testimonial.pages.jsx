import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Button from "../../components/reusable/button/button.component";
import Spinner from "../../components/reusable/spinner/spinner.component";
import UpdateTestimonial from "./update-testimonial/update-testimonial.component";

import Client from '../../tools/client';
import { formatInputDate } from '../../tools/tools';

import { api } from "../../config";

import {
    BackText,
    ButtonContainer,
    ContactInfoContainer,
    ContactInfoTestimonial,
    ContactInfoText,
    MainContainer,
    TestimonialContainer,
    TestimonialImage,
    TestimonialDataContainer,
    TestimonialTitle
} from './testimonial.styles';

const client = new Client();

const TestimonialPage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ testimonial, setTestimonial ] = useState('');
    const [ showUpdate, setShowUpdate ] = useState(false);

    useEffect(() => {
        getTestimonial();
        // eslint-disable-next-line
    }, [ ]);

    const getTestimonial = async () => {
        const res = await client.getTestimonialById(id);
        setTestimonial(res[0]);
        setLoading(false);
    }

    const showTestimonial = async () => {
        setLoading(true);
        await getTestimonial();

        setShowUpdate(false);
        setLoading(false);
    }

    const display = () => {
        if(showUpdate) {
            return (
                <UpdateTestimonial
                    testimonial={testimonial}
                    showTestimonial={showTestimonial}
                />
            )
        }

        return (
            <>
                        <TestimonialDataContainer>
                            {testimonial.path &&
                                <TestimonialImage src={`${api}${testimonial.path}`} />
                            }
                            <ContactInfoContainer>
                                <ContactInfoText>Name: {testimonial.title} {testimonial.firstName} {testimonial.lastName} {testimonial.initials}</ContactInfoText>
                                <ContactInfoText>Company: {testimonial.company}</ContactInfoText>
                                <ContactInfoText>URL: {testimonial.url}</ContactInfoText>
                            </ContactInfoContainer>
                            <ContactInfoContainer>
                                <ContactInfoText>Date: {testimonial.testimonialDate && formatInputDate(testimonial.testimonialDate)}</ContactInfoText>
                                <ContactInfoText>Position: {testimonial.position}</ContactInfoText>
                            </ContactInfoContainer>
                        </TestimonialDataContainer>
                        <TestimonialContainer>
                            <ContactInfoTestimonial>{testimonial.testimonial}</ContactInfoTestimonial>
                        </TestimonialContainer>
                        <ButtonContainer>
                            <Button onClick={() => setShowUpdate(true)}>Update</Button>
                        </ButtonContainer>
                    </>
        )
    }

    return (
        <>
            <BackText onClick={() => window.location = '/testimonials'}>Back</BackText>
            <MainContainer>
                <TestimonialTitle>Testimonial</TestimonialTitle>
                {loading ?
                    <Spinner />
                :
                    testimonial ?
                        display()
                    :
                        <TestimonialTitle>Testimonial Does Not Exist</TestimonialTitle>
                }
            </MainContainer>

        </>
    )
}

export default TestimonialPage;