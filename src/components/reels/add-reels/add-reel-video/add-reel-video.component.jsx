import { useState } from 'react';
import ReactPlayer from 'react-player';

import Button from '../../../reusable/button/button.component';
import Spinner from '../../../reusable/spinner/spinner.component';

import { setMobileView } from '../../../../tools/mobileView';
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

const client = new Client();

const AddReelVideo = ({ categories }) => {
    const [ loading, setLoading ] = useState(false);
    const [ video, setVideo ] = useState('');
    const [ videoPreview, setVideoPreview ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ company, setCompany ] = useState('');
    const [ companyUrl, setCompanyUrl ] = useState('');
    const [ position, setPosition ] = useState('');
    const [ reelDate, setReelDate ] = useState('');

    const positionHandler = (value) => {
        if(value < 0) {
            return
        }

        setPosition(value);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        if (!file) {
            return setVideoPreview('');
        }
    
        setVideo(file);

        const url = URL.createObjectURL(file);
        setVideoPreview(url);
    };

    const cancelVideo = () => {
        setVideo('');
        setVideoPreview('');
    }

    const submitVideo = async () => {
        if(video === '' ||
            title === '' ||
            category === ''
        ) {
            return
        }
        setLoading(true);
        let formData = new FormData();

        formData.append('files', video);
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

        await client.postVideo(formData);

        window.location.href = '/reels';
    }

    return (
        <MainContainer>
            {loading ?
             <Spinner />
            :
                <ContentContainer>
                    {video ?
                        <>
                            <ReactPlayer 
                                url={videoPreview} 
                                controls 
                                playing={false} 
                                width="300px" 
                                height="550px" 
                                config={{ file: { attributes: { controls: true } } }} 
                            />
                            <ButtonContainer>
                                <Button onClick={() => cancelVideo()}>Cancel</Button>
                            </ButtonContainer>
                        </>
                    :
                        <ReelLabel>
                            Select Video
                            <ReelInput display='none' type='file' accept='video/mp4,video/x-m4v,video/*' value={video} onChange={(e) => handleFileChange(e)} />
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
                        <Button onClick={() => submitVideo()}>Submit</Button>
                    </ButtonContainer>
                </ContentContainer>
            }
        </MainContainer>
    )
}

export default AddReelVideo;