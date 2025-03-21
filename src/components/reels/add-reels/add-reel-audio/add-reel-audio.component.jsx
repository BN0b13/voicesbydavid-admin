import { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';

import Button from '../../../reusable/button/button.component';
import Spinner from '../../../reusable/spinner/spinner.component';

import Client from '../../../../tools/client';

import {
    ReelInput,
    ReelLabel,
    ReelSelect,
    ReelOption,
    ReelTextarea,
    MainContainer,
    ContentContainer,
    ButtonContainer
} from '../add-reels.styles';

import 'react-h5-audio-player/lib/styles.css';

const client = new Client();

const AddReelAudio = ({ categories }) => {
    const [ loading, setLoading ] = useState(false);
    const [ audio, setAudio ] = useState('');
    const [ audioPreview, setAudioPreview ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ company, setCompany ] = useState('');
    const [ companyUrl, setCompanyUrl ] = useState('');
    const [ position, setPosition ] = useState('');
    const [ reelDate, setReelDate ] = useState('');

    const handleFileChange = (e) => {
        setAudio(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return clearAudio();
        }
        const file = e.target.files[0];
        const blob = new Blob([file]);
        const url = URL.createObjectURL(blob);

        setAudioPreview(url);
    }

    const clearAudio = () => {
        setAudioPreview('');
        setAudio('');
    }

    const positionHandler = (value) => {
        if(value < 0) {
            return
        }

        setPosition(value);
    }

    const saveAudioClip = async () => {
        if(audio === '' ||
            title === '' ||
            category === ''
        ) {
            return
        }
        setLoading(true);
        let formData = new FormData();

        formData.append('files', audio);
        formData.append('title', title);
        formData.append('categoryId', category);

        if(description !== '') {
            formData.append('description', description);
        }

        if(company !== '') {
            formData.append('company', company);
        }

        if(companyUrl !== '') {
            formData.append('companyUrl', companyUrl);
        }

        if(company !== '') {
            formData.append('position', position);
        }

        if(company !== '') {
            formData.append('reelDate', reelDate);
        }

        await client.postAudioReel(formData);

        window.location.href = '/reels';
    }

    return (
        <MainContainer>
            {loading ?
             <Spinner />
            :
                <ContentContainer>
                    {audio ?
                        <>
                            <AudioPlayer
                                src={audioPreview}
                                showJumpControls={false} // Hides fast forward & rewind buttons
                                customAdditionalControls={[]} // Removes extra controls
                                customVolumeControls={[]} // Optionally remove volume controls
                                layout="stacked" // Optional: Adjusts layout
                            />
                            <ButtonContainer>
                                <Button onClick={() => clearAudio()}>Cancel</Button>
                            </ButtonContainer>
                        </>
                    :
                    <ReelLabel>
                        Select Audio
                        <ReelInput display='none' type='file' accept='audio/*' value={audio}  onChange={e => handleFileChange(e)} />
                    </ReelLabel>
                    }

                    <ReelSelect name='reelType' onChange={(e) => setCategory(e.target.value)} defaultValue={0}>
                        <ReelOption value={0} disabled> -- Reel Category -- </ReelOption>
                        {categories.map((item, index) => (
                            <ReelOption key={index} value={item.id}>{item.name}</ReelOption>
                        ))}
                    </ReelSelect>
                    <ReelInput type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title*' />
                    <ReelTextarea col='50' rows='5' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    <ReelInput type='date' value={reelDate} onChange={(e) => setReelDate(e.target.value)} placeholder='Reel Date' />
                    <ReelInput type='text' value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Company' />
                    <ReelInput type='text' value={companyUrl} onChange={(e) => setCompanyUrl(e.target.value)} placeholder='Company URL' />
                    <ReelInput type='number' value={position} onChange={(e) => positionHandler(e.target.value)} placeholder='Position' />

                    <ButtonContainer>
                        <Button onClick={() => saveAudioClip()}>Submit</Button>
                    </ButtonContainer>
                </ContentContainer>
            }
        </MainContainer>
    )
}

export default AddReelAudio;