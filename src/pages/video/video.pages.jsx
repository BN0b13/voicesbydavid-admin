import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/reusable/button/button.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from "../../tools/client";
import { formatDate } from "../../tools/tools";

import {
    ButtonContainer,
    BackText,
    DeleteVideoButton,
    MainContainer,
    VideoTitle
} from './video.styles';

const client = new Client();

const VideoPage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ video, setVideo ] = useState('');

    useEffect(() => {
        getVideo();
    }, []);

    const getVideo = async () => {
        setLoading(true);
        const res = await client.getReelById(id);
        setVideo(res);
        setLoading(false);
    }

    const updateVideo = async () => {
        setLoading(true);
        const data = {

        };
        await client.updateVideo(data);
        await getVideo();
    }

    const deleteVideo = async () => {
        setLoading(true);
        const data = {
            id
        }
        await client.deleteVideo(data);
        window.location.href = '/reels';
    }
    

    return (
        <>
            <BackText onClick={() => window.location.href = '/reels'}>Back</BackText>
            <MainContainer>
                {loading ?
                    <Spinner />
                :
                    video ?
                        <>
                            <h4>Position: {video.position}</h4>
                            <h4>Reel Date: {video.reelDate && formatDate(video.reelDate)}</h4>
                            <h4>Title: {video.title}</h4>
                            <h4>Description: {video.description}</h4>
                            <h4>Company: {video.company}</h4>
                            <h4>URL: {video.url}</h4>
                            <h4>Active: {video.active}</h4>
                            <ButtonContainer>
                                <Button onClick={() => console.log('CLICK')}>Update</Button>
                            </ButtonContainer>
                            <DeleteVideoButton color='red' onClick={() => deleteVideo()}>DELETE</DeleteVideoButton>
                        </>
                    :
                        <VideoTitle>No Video To Display</VideoTitle>
                }
            </MainContainer>

        </>
    )
}

export default VideoPage;