import { useState } from 'react';

import Button from '../../../reusable/button/button.component';

import videoPath from '../../../../assets/video/test.mp4';

import Client from '../../../../tools/client';

import {
    AddVideoFileInput,
    AddVideoFileLabel,
    AddVideoInput,
    AddVideoOption,
    AddVideoSelect,
    AddVideoTextarea,
    MainContainer,
    MainTitle
} from './add-video.styles';

const client = new Client();

const AddVideo = ({ getVideos }) => {
    const [ video, setVideo ] = useState('');
    const [ videoPreview, setVideoPreview ] = useState('');
    const [ fileInput, setFileInput ] = useState('');
    const [ reelDate, setReelDate ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ company, setCompany ] = useState('');
    const [ url, setUrl ] = useState('');
    const [ position, setPosition ] = useState('');

    const clearFields = () => {
        setVideo('');
        setVideoPreview('');
        setFileInput('');
        setReelDate('');
        setTitle('');
        setDescription('');
        setCompany('');
        setUrl('');
        setPosition('');
    }

    const positionHandler = (value) => {
        if(value < 0) {
            return
        }

        setPosition(value);
    }

    const handleFileChange = (e) => {
        setVideo(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setVideoPreview('');
        }

        setVideoPreview(URL.createObjectURL(e.target.files[0]));
    }

    const cancelVideo = () => {
        setVideo('');
        setVideoPreview('');
        setFileInput('');
    }

    const submitVideo = async () => {
        if(video === ''||
        title === '') {
            
            return
        }

        let formData = new FormData();

        formData.append('files', video);
        formData.append('reelType', 'video');
        // reelType && formData.append('reelType', reelType);
        reelDate && formData.append('reelDate', reelDate);
        formData.append('title', title);
        description && formData.append('description', description);
        company && formData.append('company', company);
        url && formData.append('url', url);
        position && formData.append('position', position);

        await client.postVideo(formData);
        await getVideos();
        clearFields();
    }

    return (
        <MainContainer>
            <MainTitle>Video</MainTitle>
            {videoPreview &&
                <video height="100%" width="100%" controls autoPlay muted={true}>
                    <source src={videoPath} type="video/*" />
                </video>
            }
            {videoPreview ?
                <AddVideoFileLabel onClick={() => cancelVideo()}>Cancel</AddVideoFileLabel>
            :
                <>
                    <AddVideoFileInput type='file' accept='video/mp4,video/x-m4v,video/*' id='files' name="files" title="&nbsp;" value={fileInput} onChange={e => handleFileChange(e)} />
                    <AddVideoFileLabel htmlFor='files'>Add Video File</AddVideoFileLabel>
                </>
            }
            {/* <AddVideoInput type='text' value={reelType} onChange={(e) => setReelType(e.target.value)} placeholder='Reel Type' /> */}

            {/* <AddVideoSelect>
                <AddVideoOption>Audio</AddVideoOption>
                <AddVideoOption>Video</AddVideoOption>
                <AddVideoOption>Youtube</AddVideoOption>
            </AddVideoSelect> */}

            <AddVideoInput type='date' value={reelDate} onChange={(e) => setReelDate(e.target.value)} placeholder='Reel Date' />
            <AddVideoInput type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            <AddVideoTextarea col='50' rows='5' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            <AddVideoInput type='text' value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Company' />
            <AddVideoInput type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='URL' />
            <AddVideoInput type='number' value={position} onChange={(e) => positionHandler(e.target.value)} placeholder='Position' />
            <Button onClick={() => submitVideo()}>Submit</Button>
        </MainContainer>
    )
}

export default AddVideo;