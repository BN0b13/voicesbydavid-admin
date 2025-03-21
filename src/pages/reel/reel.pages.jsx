import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ReelsDisplayAudio from '../../components/reels/reels-display-audio.component';
import ReelsDisplayVideo from '../../components/reels/reels-display-video.component';
import ReelsDisplayYoutube from '../../components/reels/reels-display-youtube.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import UpdateReel from './update-reel/update-reel.component';

import Client from '../../tools/client';

import {
    BackText,
    MainContainer,
    MainTitle,
} from './reel.styles';

const client = new Client();

const ReelPage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ reel, setReel ] = useState(true);
    const [ showUpdate, setShowUpdate ] = useState(false);

    useEffect(() => {
        getReel();
    }, []);

    const getReel = async () => {
        setLoading(true);
        const res = await client.getReelById(id);
        console.log('Reel by id res: ', res);
        setReel(res);
        setLoading(false);
    }

    const completeUpdate = async () => {
        await getReel();
        setShowUpdate(false);
    }

    const display = () => {
        if(showUpdate) {
            return (<UpdateReel reel={reel} completeUpdate={completeUpdate} />)
        }

        if(reel.reelType === 'audio') {
            return (<ReelsDisplayAudio reel={reel} getReel={getReel} setShowUpdate={setShowUpdate} setLoading={setLoading} />);
        }
        if(reel.reelType === 'video') {
            return (<ReelsDisplayVideo reel={reel} getReel={getReel} setShowUpdate={setShowUpdate} setLoading={setLoading} />);
        }

        return (<ReelsDisplayYoutube reel={reel} getReel={getReel} setShowUpdate={setShowUpdate} setLoading={setLoading} />);
    }

    return (
        <>
            <BackText onClick={() => window.location = '/reels'}>Back</BackText>
            <MainContainer>
                {loading ?
                    <Spinner />
                :
                    reel ?
                        display() 
                    :
                        <MainTitle>No Reel To Display</MainTitle>
                }
            </MainContainer>
        </>
    )
}

export default ReelPage;