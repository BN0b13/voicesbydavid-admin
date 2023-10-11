import { useState } from 'react';

import Button from '../../../reusable/button/button.component';
import Spinner from '../../../reusable/spinner/spinner.component';

import Client from '../../../../tools/client';

import {
    YoutubeInput,
    YoutubeTextarea,
    MainContainer,
} from './youtube.styles';

const client = new Client();

const Youtube = () => {
    const [ loading, setLoading ] = useState(false);
    const [ reelDate, setReelDate ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ company, setCompany ] = useState('');
    const [ companyUrl, setCompanyUrl ] = useState('');
    const [ url, setUrl ] = useState('');
    const [ position, setPosition ] = useState('');

    const clearFields = () => {
        setReelDate('');
        setTitle('');
        setDescription('');
        setCompany('');
        setCompanyUrl('');
        setUrl('');
        setPosition('');
    }

    const positionHandler = (value) => {
        if(value < 0) {
            return
        }

        setPosition(value);
    }

    const submitVideo = async () => {
        setLoading(true);
        if(url === ''||
        title === '') {
            
            return
        }

        const data = {
            url,
            title
        };

        description && (data.description = description);
        reelDate && (data.reelDate = reelDate);
        company && (data.company = company);
        companyUrl && (data.companyUrl = companyUrl);
        position && (data.position = position);

        await client.postYoutubeReel(data);
        
        window.location.href = '/reels';
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <YoutubeInput type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='URL*' />
                    <YoutubeInput type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title*' />
                    <YoutubeTextarea col='50' rows='5' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    <YoutubeInput type='date' value={reelDate} onChange={(e) => setReelDate(e.target.value)} placeholder='Reel Date' />
                    <YoutubeInput type='text' value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Company' />
                    <YoutubeInput type='text' value={companyUrl} onChange={(e) => setCompanyUrl(e.target.value)} placeholder='Company URL' />
                    <YoutubeInput type='number' value={position} onChange={(e) => positionHandler(e.target.value)} placeholder='Position' />
                    <Button onClick={() => submitVideo()}>Submit</Button>
                </>
            }
        </MainContainer>
    )
}

export default Youtube;