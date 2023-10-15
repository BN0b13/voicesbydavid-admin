import { useEffect, useState } from 'react';

import Spinner from '../../reusable/spinner/spinner.component';
import Youtube from './youtube/youtube.component';

import Client from '../../../tools/client';

import {
    MainContainer,
    MainTitle,
    ReelOption,
    ReelSelect
} from './add-reels.styles';

const client = new Client();

const Reels = () => {
    const [ loading, setLoading ] = useState(true);
    const [ categories, setCategories ] = useState('');
    const [ reelType, setReelType ] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const res = await client.getCategories();
            setCategories(res.rows);
            setLoading(false);
        }

        getCategories();
    }, []);
    
    const display = () => {
        if(reelType === 'audio') {
            return (
                <>
                    <MainTitle>Audio Coming Soon</MainTitle>
                </>
            )
        }

        if(reelType === 'video') {
            return (
                <>
                    <MainTitle>Video Coming Soon</MainTitle>
                </>
            )
        }

        if(reelType === 'youtube') {
            return (<Youtube categories={categories} />)
        }
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <MainTitle>Add Reel</MainTitle>

                    <ReelSelect name='reelType' onChange={(e) => setReelType(e.target.value)} defaultValue={0}>
                        <ReelOption value={0} disabled> -- Reel Type -- </ReelOption>
                        <ReelOption value={'audio'}>Audio</ReelOption>
                        <ReelOption value={'video'}>Video</ReelOption>
                        <ReelOption value={'youtube'}>Youtube</ReelOption>
                    </ReelSelect>

                    { display() }
                </>
            }
        </MainContainer>
    )
}

export default Reels;