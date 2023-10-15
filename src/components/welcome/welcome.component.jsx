import { useState } from 'react';

import Button from '../reusable/button/button.component';
import Spinner from '../reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    ButtonContainer,
    CheckboxContainer,
    MainContainer,
    WelcomeCheckbox,
    WelcomeLabel,
    WelcomeInput,
    WelcomeParagraph,
    WelcomeSubtitle,
    WelcomeTextarea,
    WelcomeTitle,
    UpdateContainer
} from './welcome.styles';

const client = new Client();

const Welcome = ({ welcomeSection, getWelcomeSection }) => {
    const [ loading, setLoading ] = useState(false);
    const [ showUpdate, setShowUpdate ] = useState(false);
    const [ title, setTitle ] = useState(welcomeSection.title);
    const [ titleOn, setTitleOn ] = useState(welcomeSection.titleOn);
    const [ subtitle, setSubtitle] = useState(welcomeSection.subtitle);
    const [ subtitleOn, setSubtitleOn] = useState(welcomeSection.subtitleOn);
    const [ paragraph, setParagraph ] = useState(welcomeSection.paragraph);
    const [ paragraphOn, setParagraphOn ] = useState(welcomeSection.paragraphOn);
    const [ imagesOn, setImagesOn ] = useState(welcomeSection.imagesOn);
    
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            submitUpdate();
        }
    }

    const submitUpdate = async () => {
        setLoading(true);

        const data = {
            id: welcomeSection.id,
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
        getWelcomeSection();
    }

    const display = () => {
        if(showUpdate) {
            return (
                <UpdateContainer onKeyDown={(e) => handleKeyDown(e)}>
                    <WelcomeTitle>Update Content</WelcomeTitle>
                    <CheckboxContainer>
                        <WelcomeLabel>
                            <WelcomeCheckbox type='checkbox' checked={imagesOn} onChange={() => setImagesOn(!imagesOn)} />
                            Images
                        </WelcomeLabel>
                        <WelcomeLabel>
                            <WelcomeCheckbox type='checkbox' checked={titleOn} onChange={() => setTitleOn(!titleOn)} />
                            Title
                        </WelcomeLabel>
                        <WelcomeLabel>
                            <WelcomeCheckbox type='checkbox' checked={subtitleOn} onChange={() => setSubtitleOn(!subtitleOn)} />
                            Subtitle
                        </WelcomeLabel>
                        <WelcomeLabel>
                            <WelcomeCheckbox type='checkbox' checked={paragraphOn} onChange={() => setParagraphOn(!paragraphOn)} />
                            Paragraph
                        </WelcomeLabel>
                    </CheckboxContainer>
                    <WelcomeInput type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                    <WelcomeInput type='text' value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder='Subtitle' />
                    <WelcomeTextarea rows="5" cols="50" value={paragraph} onChange={(e) => setParagraph(e.target.value)} placeholder='Paragraph' />


                    <ButtonContainer>
                        <Button onClick={() => setShowUpdate(false)}>Cancel</Button>
                        <Button onClick={() => submitUpdate()}>Update</Button>
                    </ButtonContainer>
                </UpdateContainer>
            )
        }

        return (
            <>
                <WelcomeTitle>Title: </WelcomeTitle>
                <WelcomeTitle>{welcomeSection.titleOn ? title : 'OFF'}</WelcomeTitle>
                <WelcomeSubtitle>Subtitle: </WelcomeSubtitle>
                <WelcomeSubtitle>{welcomeSection.subtitleOn ? subtitle : 'OFF'}</WelcomeSubtitle>
                <WelcomeParagraph>Paragraph: </WelcomeParagraph>
                <WelcomeParagraph>{welcomeSection.paragraphOn ? paragraph : 'OFF'}</WelcomeParagraph>
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

export default Welcome;