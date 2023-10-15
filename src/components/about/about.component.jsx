import { useState } from 'react';

import Button from '../reusable/button/button.component';
import Spinner from '../reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    ButtonContainer,
    CheckboxContainer,
    MainContainer,
    AboutCheckbox,
    AboutLabel,
    AboutInput,
    AboutParagraph,
    AboutSubtitle,
    AboutTextarea,
    AboutTitle,
    UpdateContainer
} from './about.styles';

const client = new Client();

const About = ({ aboutSection, getAboutSection }) => {
    const [ loading, setLoading ] = useState(false);
    const [ showUpdate, setShowUpdate ] = useState(false);
    const [ title, setTitle ] = useState(aboutSection.title);
    const [ titleOn, setTitleOn ] = useState(aboutSection.titleOn);
    const [ subtitle, setSubtitle] = useState(aboutSection.subtitle);
    const [ subtitleOn, setSubtitleOn] = useState(aboutSection.subtitleOn);
    const [ paragraph, setParagraph ] = useState(aboutSection.paragraph);
    const [ paragraphOn, setParagraphOn ] = useState(aboutSection.paragraphOn);
    const [ imagesOn, setImagesOn ] = useState(aboutSection.imagesOn);
    
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            submitUpdate();
        }
    }

    const submitUpdate = async () => {
        setLoading(true);

        const data = {
            id: aboutSection.id,
            title,
            titleOn,
            subtitle,
            subtitleOn,
            paragraph,
            paragraphOn,
            imagesOn
        }

        await client.updateSection(data);

        setLoading(false);
        getAboutSection();
    }

    const display = () => {
        if(showUpdate) {
            return (
                <UpdateContainer onKeyDown={(e) => handleKeyDown(e)}>
                    <AboutTitle>Update Content</AboutTitle>
                    <CheckboxContainer>
                        <AboutLabel>
                            <AboutCheckbox type='checkbox' checked={imagesOn} onChange={() => setImagesOn(!imagesOn)} />
                            Images
                        </AboutLabel>
                        <AboutLabel>
                            <AboutCheckbox type='checkbox' checked={titleOn} onChange={() => setTitleOn(!titleOn)} />
                            Title
                        </AboutLabel>
                        <AboutLabel>
                            <AboutCheckbox type='checkbox' checked={subtitleOn} onChange={() => setSubtitleOn(!subtitleOn)} />
                            Subtitle
                        </AboutLabel>
                        <AboutLabel>
                            <AboutCheckbox type='checkbox' checked={paragraphOn} onChange={() => setParagraphOn(!paragraphOn)} />
                            Paragraph
                        </AboutLabel>
                    </CheckboxContainer>
                    <AboutInput type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                    <AboutInput type='text' value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder='Subtitle' />
                    <AboutTextarea rows="5" cols="50" value={paragraph} onChange={(e) => setParagraph(e.target.value)} placeholder='Paragraph' />


                    <ButtonContainer>
                        <Button onClick={() => setShowUpdate(false)}>Cancel</Button>
                        <Button onClick={() => submitUpdate()}>Update</Button>
                    </ButtonContainer>
                </UpdateContainer>
            )
        }

        return (
            <>
                <AboutTitle>About Section</AboutTitle>
                <AboutSubtitle>Title: {aboutSection.titleOn ? title : 'OFF'} </AboutSubtitle>
                <AboutSubtitle>Subtitle: {aboutSection.subtitleOn ? subtitle : 'OFF'}</AboutSubtitle>
                <AboutParagraph>Paragraph: {aboutSection.paragraphOn ? paragraph : 'OFF'}</AboutParagraph>
                <Button onClick={() => setShowUpdate(true)}>Update</Button>
            </>
        )
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                display()
            }
        </MainContainer>
    )
}

export default About;