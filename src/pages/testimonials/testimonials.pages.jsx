import { useEffect, useState } from 'react';

import AddTestimonial from '../../components/testimonials/add-testimonial/add-testimonial.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import Testimonials from '../../components/testimonials/testimonials.component';

import Client from '../../tools/client';

import {
    MainContainer,
    MainTitle
} from './testimonials.styles';

const client = new Client();

const TestimonialsPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ testimonials, setTestimonials ] = useState('');

    useEffect(() => {
        getTestimonials();
    }, []);

    const getTestimonials = async () => {
        setLoading(true);
        const res = await client.getTestimonials();
        setTestimonials(res.rows);
        setLoading(false);
    }

    return (
        <MainContainer>
            <MainTitle>Testimonials</MainTitle>
            {loading ?
                <Spinner />
            :
                <>
                    <AddTestimonial getTestimonials={getTestimonials} />
                    <Testimonials testimonials={testimonials} />
                </>
            }
        </MainContainer>
    )
}

export default TestimonialsPage;