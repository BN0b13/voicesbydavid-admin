import { useEffect, useState } from 'react';

import Button from '../reusable/button/button.component';
import Spinner from '../reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    MainContainer,
    MainContent,
    SocialMediaCheckbox,
    SocialMediaInput,
    SocialMediaLabel,
    SocialMediaRowContainer,
    SocialMediaText,
    SocialMediaTitle
} from './social-media.styles';

const client = new Client();

const SocialMedia = () => {
    const [ loading, setLoading ] = useState(true);
    const [ showUpdate, setShowUpdate ] = useState(false);
    const [ facebookActive, setFacebookActive ] = useState('');
    const [ facebookUrl, setFacebookUrl ] = useState('');
    const [ instagramActive, setInstagramActive ] = useState('');
    const [ instagramUrl, setInstagramUrl ] = useState('');
    const [ twitterActive, setTwitterActive ] = useState('');
    const [ twitterUrl, setTwitterUrl ] = useState('');
    const [ youtubeActive, setYoutubeActive ] = useState('');
    const [ youtubeUrl, setYoutubeUrl ] = useState('');

    useEffect(() => {
        getSocialMedia();
    }, []);

    const getSocialMedia = async () => {
        const res = await client.getPublicConfiguration();

        const socials = res.rows[0].options.socialMedia;

        setFacebookActive(socials.facebook.active);
        setFacebookUrl(socials.facebook.url);
        setInstagramActive(socials.instagram.active);
        setInstagramUrl(socials.instagram.url);
        setTwitterActive(socials.twitter.active);
        setTwitterUrl(socials.twitter.url);
        setYoutubeActive(socials.youtube.active);
        setYoutubeUrl(socials.youtube.url);

        setShowUpdate(false);
        setLoading(false);
    }

    const submitUpdate = async () => {
        setLoading(true);
        if(facebookActive === '' ||
            facebookUrl === '' ||
            instagramActive === '' ||
            instagramUrl === '' ||
            twitterActive === '' ||
            twitterUrl === '' ||
            youtubeActive === '' ||
            youtubeUrl === ''){
                setLoading(false);
                return
            }

        const data = {
            facebookActive,
            facebookUrl,
            instagramActive,
            instagramUrl,
            twitterActive,
            twitterUrl,
            youtubeActive,
            youtubeUrl
        }

        await client.updatePublicSocialMedia(data);
        await getSocialMedia();
    }

    const display = () => {
        if(showUpdate) {
            return (
                <MainContent>
                <SocialMediaTitle>Update Social Media</SocialMediaTitle>
                <SocialMediaRowContainer>
                    <SocialMediaText>Facebook</SocialMediaText>
                    <SocialMediaLabel>
                        <SocialMediaCheckbox type='checkbox' checked={facebookActive} onChange={() => setFacebookActive(!facebookActive)} />
                        Active
                    </SocialMediaLabel>
                    <SocialMediaInput type='text' value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} placeholder='Facebook URL' />
                </SocialMediaRowContainer>
                <SocialMediaRowContainer>
                    <SocialMediaText>Instagram</SocialMediaText>
                    <SocialMediaLabel>
                        <SocialMediaCheckbox type='checkbox' checked={instagramActive} onChange={() => setInstagramActive(!instagramActive)} />
                        Active
                    </SocialMediaLabel>
                    <SocialMediaInput type='text' value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder='Instagram URL' />
                </SocialMediaRowContainer>
                <SocialMediaRowContainer>
                    <SocialMediaText>Twitter</SocialMediaText>
                    <SocialMediaLabel>
                        <SocialMediaCheckbox type='checkbox' checked={twitterActive} onChange={() => setTwitterActive(!twitterActive)} />
                        Active
                    </SocialMediaLabel>
                    <SocialMediaInput type='text' value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} placeholder='Twitter URL' />
                </SocialMediaRowContainer>
                <SocialMediaRowContainer>
                    <SocialMediaText>Youtube</SocialMediaText>
                    <SocialMediaLabel>
                        <SocialMediaCheckbox type='checkbox' checked={youtubeActive} onChange={() => setYoutubeActive(!youtubeActive)} />
                        Active
                    </SocialMediaLabel>
                    <SocialMediaInput type='text' value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder='Youtube URL' />
                </SocialMediaRowContainer>
                <SocialMediaRowContainer>
                <Button onClick={() => setShowUpdate(false)}>Cancel</Button>
                <Button onClick={() => submitUpdate()}>Submit</Button>

                </SocialMediaRowContainer>
            </MainContent>
            )
        }

        return (
            <MainContent>
                <SocialMediaTitle>Social Media</SocialMediaTitle>
                <SocialMediaRowContainer>
                    <SocialMediaText>Facebook</SocialMediaText>
                    <SocialMediaText>Active: { facebookActive ? 'Yes' : 'No' }</SocialMediaText>
                    <SocialMediaText>URL: { facebookUrl }</SocialMediaText>
                </SocialMediaRowContainer>
                <SocialMediaRowContainer>
                    <SocialMediaText>Instagram</SocialMediaText>
                    <SocialMediaText>Active: { instagramActive ? 'Yes' : 'No' }</SocialMediaText>
                    <SocialMediaText>URL: { instagramUrl }</SocialMediaText>
                </SocialMediaRowContainer>
                <SocialMediaRowContainer>
                    <SocialMediaText>Twitter</SocialMediaText>
                    <SocialMediaText>Active: { twitterActive ? 'Yes' : 'No' }</SocialMediaText>
                    <SocialMediaText>URL: { twitterUrl }</SocialMediaText>
                </SocialMediaRowContainer>
                <SocialMediaRowContainer>
                    <SocialMediaText>Youtube</SocialMediaText>
                    <SocialMediaText>Active: { youtubeActive ? 'Yes' : 'No' }</SocialMediaText>
                    <SocialMediaText>URL: { youtubeUrl }</SocialMediaText>
                </SocialMediaRowContainer>
                <Button onClick={() => setShowUpdate(true)}>Update</Button>
            </MainContent>
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

export default SocialMedia;