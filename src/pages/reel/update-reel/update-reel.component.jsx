import { useState } from 'react';

import Button from '../../../components/reusable/button/button.component';

import Client from '../../../tools/client';
import { formatYoutubeUrl } from '../../../tools/tools';

import {
    ContactInfoContainer,
    DeleteReelButton,
    UpdateReelDataContainer,
    UpdateReelContainer,
    ButtonContainer,
    MainTitle,
    UpdateReelInput,
    UpdateReelTextarea
} from './update-reel.styles';

const client = new Client();

const UpdateReel = ({ reel, completeUpdate }) => {
    const [ title, setTitle ] = useState(reel.title ? reel.title : '');
    const [ url, setUrl ] = useState(reel.url ? formatYoutubeUrl(reel.url) : '');
    const [ position, setPosition ] = useState(reel.position ? reel.position : '');
    const [ company, setCompany ] = useState(reel.company ? reel.company : '');
    const [ companyUrl, setCompanyUrl ] = useState(reel.companyUrl ? reel.companyUrl : '');
    const [ reelDate, setReelDate ] = useState(reel.reelDate ? reel.reelDate : '');
    const [ description, setDescription ] = useState(reel.description ? reel.description : '');

    const positionHandler = (value) => {
        if(value < 0) {
            return
        }

        setPosition(value);
    }

    const submitReelUpdate = async () => {
        if(url === '' ||
        title === '') {
            return
        }
        
        const data = {
            id: reel.id,
            title,
            description,
            company,
            companyUrl,
            url,
            reelDate,
            position: position ? parseInt(position) : 0
        }

        await client.updateYoutubeReel(data);
        await completeUpdate();
    }

    const deleteReel = async () => {
        await client.deleteReel({ id: reel.id });
        window.location.href = '/reels';
    }

    return (
        <>
            <MainTitle>Update Reel</MainTitle>
            <UpdateReelDataContainer>
                <ContactInfoContainer>
                    <UpdateReelInput type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                    <UpdateReelInput type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Reel URL' />
                    <UpdateReelInput type='number' value={position} onChange={(e) => positionHandler(e.target.value)} placeholder='Position' />
                </ContactInfoContainer>
                <ContactInfoContainer>
                    <UpdateReelInput type='date' value={reelDate} onChange={(e) => setReelDate(e.target.value)} />
                    <UpdateReelInput type='text' value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Company' />
                    <UpdateReelInput type='text' value={companyUrl} onChange={(e) => setCompanyUrl(e.target.value)} placeholder='Company URL' />
                </ContactInfoContainer>
            </UpdateReelDataContainer>
            <UpdateReelContainer>
                <UpdateReelTextarea rows="5" cols="50" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            </UpdateReelContainer>
            <ButtonContainer>
                <Button onClick={async () => await completeUpdate()}>Cancel</Button>
                <Button onClick={() => submitReelUpdate()}>Update</Button>
            </ButtonContainer>
            <DeleteReelButton color='red' onClick={() => deleteReel()}>DELETE</DeleteReelButton>
        </>
    )
}

export default UpdateReel;