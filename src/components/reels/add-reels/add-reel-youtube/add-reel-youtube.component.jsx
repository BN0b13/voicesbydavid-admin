import { useState } from 'react';

import Button from '../../../reusable/button/button.component';
import Spinner from '../../../reusable/spinner/spinner.component';

import Client from '../../../../tools/client';

import {
    ReelInput,
    ReelSelect,
    ReelOption,
    ReelTextarea,
    MainContainer,
} from '../add-reels.styles';

const client = new Client();

const AddReelYoutube = ({ categories }) => {
    const [ loading, setLoading ] = useState(false);
    const [ reelDate, setReelDate ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ company, setCompany ] = useState('');
    const [ companyUrl, setCompanyUrl ] = useState('');
    const [ url, setUrl ] = useState('');
    const [ position, setPosition ] = useState('');
    const [ category, setCategory ] = useState('');

    const positionHandler = (value) => {
        if(value < 0) {
            return
        }

        setPosition(value);
    }

    const submitVideo = async () => {
        setLoading(true);
        if(category === '' ||
            url === ''||
            title === '') {
            
            return
        }

        const data = {
            categoryId: category,
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
                    <ReelSelect name='reelType' onChange={(e) => setCategory(e.target.value)} defaultValue={0}>
                        <ReelOption value={0} disabled> -- Reel Category -- </ReelOption>
                        {categories.map((item, index) => (
                            <ReelOption key={index} value={item.id}>{item.name}</ReelOption>
                        ))}
                    </ReelSelect>
                    <ReelInput type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='URL*' />
                    <ReelInput type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title*' />
                    <ReelTextarea col='50' rows='5' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    <ReelInput type='date' value={reelDate} onChange={(e) => setReelDate(e.target.value)} placeholder='Reel Date' />
                    <ReelInput type='text' value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Company' />
                    <ReelInput type='text' value={companyUrl} onChange={(e) => setCompanyUrl(e.target.value)} placeholder='Company URL' />
                    <ReelInput type='number' value={position} onChange={(e) => positionHandler(e.target.value)} placeholder='Position' />
                    <Button onClick={() => submitVideo()}>Submit</Button>
                </>
            }
        </MainContainer>
    )
}

export default AddReelYoutube;