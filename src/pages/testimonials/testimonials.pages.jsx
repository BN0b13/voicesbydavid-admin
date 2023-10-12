import { useEffect, useState } from 'react';

import AddTestimonial from '../../components/testimonials/add-testimonial/add-testimonial.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import Testimonials from '../../components/testimonials/testimonials.component';

import Client from '../../tools/client';

import {
    MainContainer,
    MainTitle,
    TabContainer,
    TabSelector
} from './testimonials.styles';

const client = new Client();

const TestimonialsPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
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

    const activateTabOne = () => {
        setCurrentTab(1);
        setTabOneActive(true);
        setTabTwoActive(false);
    }

    const activateTabTwo = () => {
        setCurrentTab(2);
        setTabOneActive(false);
        setTabTwoActive(true);
    }

    const showCurrentTab = () => {

        if(currentTab === 2) {
            return (<AddTestimonial getTestimonials={getTestimonials} />);
        }

        return (
            <>
                <MainTitle>Testimonials</MainTitle>
                <Testimonials testimonials={testimonials} />
            </>
        )
    }

    return (
        <MainContainer>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Testimonials</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Add Testimonial</TabSelector>
            </TabContainer>
            
            {loading ?
                <Spinner />
            :
                showCurrentTab()
            }
        </MainContainer>
    )
}

export default TestimonialsPage;